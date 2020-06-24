/* eslint-disable no-await-in-loop */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser } from 'protractor';
import { createItemButton, isLoaded } from '@console/internal-integration-tests/views/crud.view';
import { click, fillInput, asyncForEach } from '@console/shared/src/test-utils/utils';
import { VirtualMachineModel } from '@console/kubevirt-plugin/src/models';
import { NetworkInterfaceDialog } from '../dialogs/networkInterfaceDialog';
import { DiskDialog } from '../dialogs/diskDialog';
import { tableRows, saveButton } from '../../views/kubevirtUIResource.view';
import { selectOptionByText, setCheckboxState } from '../utils/utils';
import {
  IMPORT_WIZARD_CONN_TO_NEW_INSTANCE,
  networkTabCol,
  RHV_PROVIDER,
  STORAGE_CLASS,
  VIRTUALIZATION_TITLE,
  VMWARE_PROVIDER,
} from '../utils/consts';
import * as view from '../../views/importWizard.view';
import { waitForNoLoaders, clickKebabAction } from '../../views/wizard.view';
import {
  InstanceConfig,
  rhvConfig,
  vmwareConfig,
  VirtualMachineTemplateModel,
  VMImportConfig,
  NetworkResource,
  StorageResource,
} from '../utils/types';
import { Wizard } from './wizard';
import { virtualizationTitle } from '../../views/vms.list.view';
import { K8sKind } from '@console/internal/module/k8s';
import { clickNavLink } from '@console/internal-integration-tests/views/sidenav.view';
import { resourceHorizontalTab } from '../../views/uiResource.view';
import { VirtualMachine } from './virtualMachine';
import { testName } from '@console/internal-integration-tests/protractor.conf';

export class ImportWizard extends Wizard {
  async openWizard(model: K8sKind) {
    if (
      !(await virtualizationTitle.isPresent()) ||
      (await virtualizationTitle.getText()) !== VIRTUALIZATION_TITLE
    ) {
      await clickNavLink(['Workloads', 'Virtualization']);
      await isLoaded();
      if (model === VirtualMachineTemplateModel) {
        await click(resourceHorizontalTab(VirtualMachineTemplateModel));
        await isLoaded();
      }
    }
    await click(createItemButton);
    await click(view.importWithWizardButton);
    await waitForNoLoaders();
  }

  async selectProvider(provider: string) {
    await selectOptionByText(view.providerSelect, provider);
  }

  async selectInstance(instance: string) {
    await selectOptionByText(view.vcenterInstanceSelect, instance);
  }

  async vmwareFillHostname(hostname: string) {
    await fillInput(view.vcenterHostnameInput, hostname);
  }

  async vmwareFillUsername(username: string) {
    await fillInput(view.usernameInput, username);
  }

  async vmwareFillPassword(password: string) {
    await fillInput(view.vcenterPasswordInput, password);
  }

  async rhvFillApi(apiUrl: string) {
    await fillInput(view.ovirtApiInput, apiUrl);
  }

  async rhvFillUsername(username: string) {
    await fillInput(view.ovirtUsernameInput, username);
  }

  async rhvFillPassword(password: string) {
    await fillInput(view.ovirtPasswordInput, password);
  }

  async rhvFillCertificate(certificate: string) {
    // eslint-disable-next-line no-console
    console.log(`Certificate for this env is:\n${certificate}`);
    await fillInput(view.ovirtCertInput, certificate);
  }

  async rhvSelectCluster(instanceConfig: rhvConfig) {
    await selectOptionByText(view.ovirtClusterSelect, instanceConfig.cluster);
  }

  async rhvVmSelect(vmname: string) {
    await selectOptionByText(view.ovirtVmSelect, vmname);
  }

  async saveInstance(saveInstance: boolean) {
    await setCheckboxState(view.vcenterSaveInstanceCheckbox, saveInstance);
  }

  async saveRhvInstance(saveInstance: boolean) {
    await setCheckboxState(view.connectRhvInstanceButton, saveInstance);
  }

  async configureVMwareProvider(instanceConfig: vmwareConfig) {
    await this.vmwareFillHostname(instanceConfig.hostname);
    await this.vmwareFillUsername(instanceConfig.username);
    await this.vmwareFillPassword(instanceConfig.password);
    await this.saveInstance(instanceConfig.saveInstance);
  }

  async configureRHVProvider(instanceConfig: rhvConfig) {
    await this.rhvFillApi(instanceConfig.apiUrl);
    await this.rhvFillCertificate(instanceConfig.certificate);
    await this.rhvFillUsername(instanceConfig.username);
    await this.rhvFillPassword(instanceConfig.password);
    await this.saveRhvInstance(instanceConfig.saveInstance);
  }

  async configureInstance(instanceConfig: InstanceConfig, provider: string) {
    if (provider === VMWARE_PROVIDER) {
      await selectOptionByText(view.vcenterInstanceSelect, instanceConfig.instance);
    } else if (provider === RHV_PROVIDER) {
      await selectOptionByText(view.ovirtInstanceSelect, instanceConfig.instance);
    }
    if (instanceConfig.instance === IMPORT_WIZARD_CONN_TO_NEW_INSTANCE) {
      if (provider === VMWARE_PROVIDER) {
        await this.configureVMwareProvider(instanceConfig);
      } else if (provider === RHV_PROVIDER) {
        await this.configureRHVProvider(instanceConfig);
      }
    } else {
      throw Error('Saved provider instances are not implemented');
    }
  }

  async connectToVmwareInstance() {
    await click(view.connectVmwareInstanceButton);
  }

  async connectToRhvInstance() {
    await click(view.connectRhvInstanceButton);
  }

  async selectSourceVirtualMachine(sourceVirtualMachine: string) {
    await selectOptionByText(view.virtualMachineSelect, sourceVirtualMachine);
  }

  async confirmAndCreate() {
    await click(view.importButon);
  }

  /**
   * Edits attributes of a NICs that are being imported from source VM.
   */
  async updateImportedNICs() {
    const rows = await tableRows();
    let importedNICs = rows.map((line) => {
      const cols = line.split(/\t/);
      return {
        name: cols[networkTabCol.name],
      };
    });
    // TODO: This is horrible, but unfortunately no better way to dynamically extract only device names
    // without using ElementArrayFinder, which on the other hand may cause NoStaleElement Exceptions
    importedNICs = importedNICs.filter((_, i) => i % 3 === 0);

    const NICDialog = new NetworkInterfaceDialog();
    await asyncForEach(importedNICs, async (NIC) => {
      await clickKebabAction(NIC.name, 'Edit');
      await waitForNoLoaders();
      const networks = await NICDialog.getNetworks();
      // Change name to comply with k8s
      await NICDialog.fillName(NIC.name.replace(/\s/g, '').toLowerCase());
      if (networks.length > 0) {
        await NICDialog.selectNetwork(networks[networks.length - 1]);
      } else {
        throw Error('No available networks to assign imported NICs');
      }
      await click(saveButton);
      await waitForNoLoaders();
    });
  }

  /**
   * Edits attributes of Disks that are being imported from source VM.
   */
  async updateImportedDisks() {
    const rows = await tableRows();
    let importedDisks = rows.map((line) => {
      const cols = line.split(/\t/);
      return {
        name: cols[networkTabCol.name],
        storageClass: STORAGE_CLASS,
      };
    });
    importedDisks = importedDisks.filter((_, i) => i % 3 === 0);

    const diskDialog = new DiskDialog();
    await asyncForEach(importedDisks, async (disk) => {
      await clickKebabAction(disk.name, 'Edit');
      await waitForNoLoaders();
      // Change name to comply with k8s
      await diskDialog.fillName(disk.name.replace(/\s/g, '').toLowerCase());
      // This if is required to workaround bug 1814611.
      // NFS is not supported for conversion PV and HPP should be used instead.
      if (disk.name === 'v2v-conversion-temp' && STORAGE_CLASS === 'nfs') {
        await diskDialog.selectStorageClass('hostpath-provisioner');
      } else {
        await diskDialog.selectStorageClass(disk.storageClass);
      }
      await click(saveButton);
      await waitForNoLoaders();
    });
  }

  async navigateToDetail() {
    await click(view.seeDetailPageButton);
    await isLoaded();
  }

  /**
   * Waits for loading icon on Import tab to disappear.
   * As the icon disappears and re-appears several times when loading VM details
   * we need to sample it's presence multiple times to make sure all data is loaded.
   */
  async waitForSpinner() {
    // TODO: In a followup, we should use this implementation of waitFor and
    // deprecate the one we have in kubevirt-plugin/integration-tests/utils/utils.ts
    // because this is more general
    const waitFor = async (
      func: () => Promise<boolean>,
      interval = 1500,
      count = 4,
      attempts = 30,
    ) => {
      let sequenceNumber = 0;
      let attemptNumber = 0;
      let res;
      while (sequenceNumber !== count) {
        if (attemptNumber > attempts) {
          throw Error('Exceeded number of attempts');
        }
        res = await func();
        if (res) {
          sequenceNumber += 1;
        } else {
          sequenceNumber = 0;
        }
        attemptNumber += 1;
        await browser.sleep(interval);
      }
    };

    await waitFor(async () => {
      return !(await view.spinnerIcon.isPresent());
    });
  }

  async addVmNetworks(networkResources: NetworkResource[]) {
    // Networking
    // First update imported network interfaces to comply with k8s
    await this.updateImportedNICs();
    // Optionally add new interfaces, if any
    if (networkResources) {
      for (const NIC of networkResources) {
        await this.addNIC(NIC);
      }
    }
  }

  async addVmStorage(storageResources: StorageResource[]) {
    // Storage
    // First update disks that come from the source VM
    await this.updateImportedDisks();
    // Optionally add new disks
    if (storageResources) {
      for (const disk of storageResources) {
        await this.addDisk(disk);
      }
    }
  }

  async vmwareImport(config: VMImportConfig) {
    const {
      // provider,
      // instanceConfig,
      // sourceVMName,
      name,
      description,
      operatingSystem,
      flavorConfig,
      workloadProfile,
      storageResources,
      networkResources,
      cloudInit,
    } = config;
    await this.connectToVmwareInstance();
    await this.waitForSpinner();

    if (operatingSystem) {
      await this.selectOperatingSystem(operatingSystem as string);
    }

    if (operatingSystem) {
      await this.selectOperatingSystem(operatingSystem as string);
    }
    if (flavorConfig) {
      await this.selectFlavor(flavorConfig);
    }
    if (workloadProfile) {
      await this.selectWorkloadProfile(workloadProfile);
    }
    if (name) {
      await this.fillName(name);
    }
    if (description) {
      await this.fillDescription(description);
    }
    await this.next();
    await this.addVmNetworks(networkResources);
    await this.next();
    await this.addVmStorage(storageResources);
    await this.next();

    // Advanced - Cloud Init
    if (cloudInit) {
      await this.configureCloudInit(cloudInit);
    }
    await this.next();

    // Advanced - Virtual HW
    await this.next();
  }

  async rhvImport(config: VMImportConfig) {
    const { instanceConfig, sourceVMName, storageResources, networkResources } = config;
    // Selecting RHV cluster, this flow differs from VMWare
    await this.connectToRhvInstance();
    await this.waitForSpinner();

    await this.rhvSelectCluster(instanceConfig);
    // Selecting source VM
    await this.selectSourceVirtualMachine(sourceVMName);
    await this.waitForSpinner();
    // Clicking `edit` button to reach network and storage settings
    await click(view.editButton);
    await this.next;
    // Impossible to do changes of flavor, workload profile and/or OS, page is read-only
    await this.next;
    this.addVmNetworks(networkResources);
    await this.next;
    this.addVmStorage(storageResources);
    await this.next;
    // CloudInit page is in read-only mode
    await this.next;
    // Additional devices page is in read-only mode
    await this.next;

    // Exiting and getting back to main import cause it is common for all providers
  }

  async import(config: VMImportConfig) {
    const { provider, instanceConfig, name } = config;
    const importWizard = new ImportWizard();
    await importWizard.openWizard(VirtualMachineModel);

    // General section
    await importWizard.selectProvider(provider);
    await importWizard.waitForSpinner();
    await importWizard.configureInstance(instanceConfig, provider);

    // Splitting logic depending on provider (VMWare or RHV for a moment)
    if (provider === VMWARE_PROVIDER) {
      await this.vmwareImport(config);
    } else if (provider === RHV_PROVIDER) {
      await this.rhvImport(config);
    }

    // The rest is relevant for both VMWare and RHV
    // Review
    await this.validateReviewTab(config);

    // Import
    await importWizard.confirmAndCreate();
    await importWizard.waitForCreation();

    // Navigate to detail page
    await importWizard.navigateToDetail();

    return new VirtualMachine({ name, namespace: testName });
  }
}
