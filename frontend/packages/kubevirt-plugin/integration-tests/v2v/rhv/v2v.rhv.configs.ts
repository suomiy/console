import { VMImportConfig } from '../../tests/utils/types';
import { IMPORT_WIZARD_CONN_TO_NEW_INSTANCE } from '../../tests/utils/consts';

const {
  V2V_INSTANCE_API_URL,
  V2V_INSTANCE_USERNAME,
  V2V_INSTANCE_PASSWORD,
  V2V_INSTANCE_CA_CERT,
  V2V_INSTANCE_CLUSTER,
} = process.env;

export const rhvVMConfig: VMImportConfig = {
  name: `'N/A'`,
  sourceVMName: 'rhel7-vm',
  provider: 'Red Hat Virtualization (RHV)',
  instanceConfig: {
    instance: IMPORT_WIZARD_CONN_TO_NEW_INSTANCE,
    apiUrl: V2V_INSTANCE_API_URL,
    username: V2V_INSTANCE_USERNAME,
    password: V2V_INSTANCE_PASSWORD,
    certificate: V2V_INSTANCE_CA_CERT,
    cluster: V2V_INSTANCE_CLUSTER,
    saveInstance: false,
  },
};

export const rhvVMMultiNicConfig: VMImportConfig = {
  name: `'N/A'`,
  sourceVMName: 'rhel7-vm',
  provider: 'Red Hat Virtualization (RHV)',
  instanceConfig: {
    instance: IMPORT_WIZARD_CONN_TO_NEW_INSTANCE,
    apiUrl: V2V_INSTANCE_API_URL,
    username: V2V_INSTANCE_USERNAME,
    password: V2V_INSTANCE_PASSWORD,
    certificate: V2V_INSTANCE_CA_CERT,
    cluster: V2V_INSTANCE_CLUSTER,
    saveInstance: false,
  },
};

// Configuration for 2 VMs created one by one to re-use existing RHV instance
export const rhvVMConfig1: VMImportConfig = {
  name: `'N/A'`,
  sourceVMName: 'rhel7-vm',
  provider: 'Red Hat Virtualization (RHV)',
  instanceConfig: {
    instance: IMPORT_WIZARD_CONN_TO_NEW_INSTANCE,
    apiUrl: V2V_INSTANCE_API_URL,
    username: V2V_INSTANCE_USERNAME,
    password: V2V_INSTANCE_PASSWORD,
    certificate: V2V_INSTANCE_CA_CERT,
    cluster: V2V_INSTANCE_CLUSTER,
    saveInstance: false,
  },
};

export const rhvVMConfig2: VMImportConfig = {
  name: `'N/A'`,
  sourceVMName: 'rhel7-vm',
  provider: 'Red Hat Virtualization (RHV)',
  instanceConfig: {
    instance: IMPORT_WIZARD_CONN_TO_NEW_INSTANCE,
    apiUrl: V2V_INSTANCE_API_URL,
    username: V2V_INSTANCE_USERNAME,
    password: V2V_INSTANCE_PASSWORD,
    certificate: V2V_INSTANCE_CA_CERT,
    cluster: V2V_INSTANCE_CLUSTER,
    saveInstance: false,
  },
};

export const rhvVMConfig2VMs = [rhvVMConfig1, rhvVMConfig2];
