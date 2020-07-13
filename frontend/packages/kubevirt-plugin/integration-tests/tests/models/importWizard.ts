/* eslint-disable no-await-in-loop */
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
  vmwareConfig,
  rhvConfig,
  VirtualMachineTemplateModel,
  VMImportConfig,
} from '../utils/types';
// import { VirtualMachineTemplateModel, VMImportConfig } from '../utils/types';
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
    await fillInput(view.ovirtCertInput, certificate);
  }

  async saveInstance(saveInstance: boolean) {
    await setCheckboxState(view.vcenterSaveInstanceCheckbox, saveInstance);
  }

  // async configureInstance(instanceConfig: vmwareConfig) {
  //   await selectOptionByText(view.vcenterInstanceSelect, instanceConfig.instance);
  //   if (instanceConfig.instance === IMPORT_WIZARD_CONN_TO_NEW_INSTANCE) {
  //     await this.fillHostname(instanceConfig.hostname);
  //     await this.fillUsername(instanceConfig.username);
  //     await this.fillPassword(instanceConfig.password);
  //     await this.saveInstance(instanceConfig.saveInstance);
  //   } else {
  //     throw Error('Saved provider instances are not implemented');
  //   }
  // }

  async configureVMwareProvider(instanceConfig: vmwareConfig) {
    await this.vmwareFillHostname(instanceConfig.hostname);
    await this.vmwareFillUsername(instanceConfig.username);
    await this.vmwareFillPassword(instanceConfig.password);
    await this.saveInstance(instanceConfig.saveInstance);
  }

  async configureRHVProvider(instanceConfig: rhvConfig) {
    await this.rhvFillApi(instanceConfig.apiUrl);
    await this.rhvFillUsername(instanceConfig.username);
    await this.rhvFillPassword(instanceConfig.password);
    await this.rhvFillCertificate(instanceConfig.certificate);
    await this.saveInstance(instanceConfig.saveInstance);
  }

  async configureInstance(instanceConfig: vmwareConfig | rhvConfig, provider: string) {
    await selectOptionByText(view.vcenterInstanceSelect, instanceConfig.instance);
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

  async connectToInstance() {
    await click(view.connectInstanceButton);
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
      await await click(saveButton);
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

// <<<<<<< HEAD
  /**
   * Waits for loading icon on Import tab to disappear.
   * As the icon disappears and re-appears several times when loading VM details
   * we need to sample it's presence multiple times to make sure all data is loaded.
   */
// =======
// >>>>>>> Adding support for migration from RHV
  async waitForSpinner() {
    // TODO: In a followup, we should use this implementation of waitFor and
    // deprecate the one we have in kubevirt-plugin/integration-tests/utils/utils.ts
    // because this is more general
// <<<<<<< HEAD
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
// =======
    const waitFor = async (func, interval = 1500, count = 4) => {
      let sequenceNumber = 0;
      let res;
      while (sequenceNumber !== count) {
// >>>>>>> Adding support for migration from RHV
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

  // async import(config: VMImportConfig) {
  //   const { provider } = config;
  //   const importWizard = new ImportWizard();
  //   await importWizard.openWizard(VirtualMachineModel);
  //   if (provider === 'VMware') {
  //     await this.vmwareImport(config);
  //   }
  // }

  async import(config: VMImportConfig) {
    const {
      provider,
      instanceConfig,
      sourceVMName,
      name,
      description,
      operatingSystem,
      flavorConfig,
      workloadProfile,
      storageResources,
      networkResources,
      cloudInit,
    } = config;
    const importWizard = new ImportWizard();
    await importWizard.openWizard(VirtualMachineModel);

    // General section
    await importWizard.selectProvider(provider);
    await importWizard.waitForSpinner();
    await importWizard.configureInstance(instanceConfig, provider);

    await importWizard.connectToInstance();
    await importWizard.waitForSpinner();

    await importWizard.selectSourceVirtualMachine(sourceVMName);
    await importWizard.waitForSpinner();

    await importWizard.next(true);

    if (operatingSystem) {
      await importWizard.selectOperatingSystem(operatingSystem as string);
    }
    if (flavorConfig) {
      await importWizard.selectFlavor(flavorConfig);
    }
    if (workloadProfile) {
      await importWizard.selectWorkloadProfile(workloadProfile);
    }
    if (name) {
      await importWizard.fillName(name);
    }
    if (description) {
      await importWizard.fillDescription(description);
    }
    await importWizard.next();
    // Networking
    // First update imported network interfaces to comply with k8s
    await importWizard.updateImportedNICs();
    // Optionally add new interfaces, if any
    if (networkResources) {
      for (const NIC of networkResources) {
        await importWizard.addNIC(NIC);
      }
    }
    await importWizard.next();

    // Storage
    // First update disks that come from the source VM
    await importWizard.updateImportedDisks();
    // Optionally add new disks
    if (networkResources) {
      for (const disk of storageResources) {
        await importWizard.addDisk(disk);
      }
    }
    await importWizard.next();

    // Advanced - Cloud Init
    if (cloudInit) {
      await importWizard.configureCloudInit(cloudInit);
    }
    await importWizard.next();

    // Advanced - Virtual HW
    await importWizard.next();

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
