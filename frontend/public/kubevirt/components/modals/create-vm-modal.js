import { modalResourceLauncher } from '../utils/modalResourceLauncher';
import { CreateVmWizard, TEMPLATE_TYPE_LABEL, getResource, TEMPLATE_TYPE_VM, TEMPLATE_TYPE_BASE } from 'kubevirt-web-ui-components';
import { k8sCreate, k8sGet, k8sPatch, k8sKill } from '../../module/okdk8s';
import {
  NamespaceModel,
  TemplateModel,
  NetworkAttachmentDefinitionModel,
  StorageClassModel,
  PersistentVolumeClaimModel,
  VmTemplateModel,
  DataVolumeModel,
  VirtualMachineModel,
} from '../../models';
import { WithResources } from '../utils/withResources';
import { units } from '../utils/okdutils';

export const openCreateVmWizard = ( activeNamespace, createTemplate = false ) => {
  const launcher = modalResourceLauncher(CreateVmWizard, {
    namespaces: {
      resource: getResource(NamespaceModel, { immutable: true }),
    },
    virtualMachines: {
      resource: getResource(VirtualMachineModel, { immutable: true }),
      required: true,
    },
    userTemplates: {
      resource: getResource(TemplateModel, { namespace: activeNamespace, prop: 'userTemplates', matchLabels: {[TEMPLATE_TYPE_LABEL]: TEMPLATE_TYPE_VM}, immutable: true }),
    },
    commonTemplates: {
      resource: getResource(VmTemplateModel, { namespace: 'openshift', prop: 'commonTemplates', matchLabels: {[TEMPLATE_TYPE_LABEL]: TEMPLATE_TYPE_BASE}, immutable: true }),
    },
    networkConfigs: {
      resource: getResource(NetworkAttachmentDefinitionModel, { namespace: activeNamespace, immutable: true }),
    },
    storageClasses: {
      resource:  getResource(StorageClassModel, { immutable: true }),
    },
    persistentVolumeClaims: {
      resource:  getResource(PersistentVolumeClaimModel, { namespace: activeNamespace,immutable: true }),
    },
    dataVolumes: {
      resource:  getResource(DataVolumeModel, { namespace: activeNamespace,immutable: true }),
    },
  },(({namespaces}) => {
      let selectedNamespace;

      if (namespaces && activeNamespace){
        selectedNamespace = namespaces.find(namespace => namespace.getIn(['metadata', 'name']) === activeNamespace);
      }

      return {
        selectedNamespace,
      };
    }));

  launcher({
    k8sCreate, // TODO: wrap in sort of "Context" object
    k8sGet,
    k8sPatch,
    k8sKill,
    units,
    WithResources, // for loading of data subsets based on actual user's selection
    createTemplate,
  });

};
