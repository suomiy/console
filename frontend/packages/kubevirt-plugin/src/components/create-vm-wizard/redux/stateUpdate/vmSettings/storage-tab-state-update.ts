import * as _ from 'lodash';
import {
  hasVmSettingsChanged,
  iGetProvisionSource,
} from '../../../selectors/immutable/vm-settings';
import { VMSettingsField, VMWizardStorage, VMWizardStorageType } from '../../../types';
import { InternalActionType, UpdateOptions } from '../../types';
import { iGetProvisionSourceStorage } from '../../../selectors/immutable/storage';
import { getProvisionSourceStorage } from '../../initial-state/storage-tab-initial-state';
import { VolumeWrapper } from '../../../../../k8s/wrapper/vm/volume-wrapper';
import { DataVolumeWrapper } from '../../../../../k8s/wrapper/vm/data-volume-wrapper';
import { StorageUISource } from '../../../../modals/disk-modal/storage-ui-source';
import { getNextIDResolver } from '../../../../../utils/utils';
import { getStorages } from '../../../selectors/selectors';
import { vmWizardInternalActions } from '../../internal-actions';
import { getTemplateValidation } from '../../../selectors/template';
import { DiskBus } from '../../../../../constants/vm/storage/disk-bus';

export const prefillInitialDiskUpdater = ({ id, prevState, dispatch, getState }: UpdateOptions) => {
  const state = getState();
  if (!hasVmSettingsChanged(prevState, state, id, VMSettingsField.PROVISION_SOURCE_TYPE)) {
    return;
  }

  const iOldSourceStorage = iGetProvisionSourceStorage(state, id);
  const oldSourceStorage: VMWizardStorage = iOldSourceStorage && iOldSourceStorage.toJSON();

  const newSourceStorage = getProvisionSourceStorage(iGetProvisionSource(state, id));
  const oldType =
    oldSourceStorage &&
    StorageUISource.fromTypes(
      VolumeWrapper.initialize(oldSourceStorage.volume).getType(),
      DataVolumeWrapper.initialize(oldSourceStorage.dataVolume).getType(),
    );

  const newType =
    newSourceStorage &&
    StorageUISource.fromTypes(
      VolumeWrapper.initialize(newSourceStorage.volume).getType(),
      DataVolumeWrapper.initialize(newSourceStorage.dataVolume).getType(),
    );

  if (newType !== oldType) {
    if (!newSourceStorage) {
      // not a template provision source
      if (oldSourceStorage && oldSourceStorage.type === VMWizardStorageType.PROVISION_SOURCE_DISK) {
        dispatch(
          vmWizardInternalActions[InternalActionType.RemoveStorage](id, oldSourceStorage.id),
        );
      }
    } else {
      dispatch(
        vmWizardInternalActions[InternalActionType.UpdateStorage](id, {
          id: oldSourceStorage ? oldSourceStorage.id : getNextIDResolver(getStorages(state, id))(),
          ...newSourceStorage,
        }),
      );
    }
  }
};

export const diskBusUpdater = ({ id, prevState, dispatch, getState }: UpdateOptions) => {
  const state = getState();

  const oldValidations = getTemplateValidation(prevState, id);
  const newValidations = getTemplateValidation(state, id);

  const isValidationsChanged =
    newValidations && oldValidations ? !newValidations.isEqual(oldValidations) : !!newValidations;

  if (isValidationsChanged) {
    let isBusValid = true;
    const iOldSourceStorage = iGetProvisionSourceStorage(state, id);
    const oldSourceStorage: VMWizardStorage = iOldSourceStorage && iOldSourceStorage.toJSON();

    const newSourceStorage = getProvisionSourceStorage(iGetProvisionSource(state, id));
    const allowedBuses = newValidations.getAllowedBuses();

    ['disk.disk.bus', 'disk.cdrom.bus'].forEach((busPath) => {
      const busType = _.get(newSourceStorage, busPath);
      if (busType && !allowedBuses.has(DiskBus.fromString(busType))) {
        _.set(newSourceStorage, busPath, newValidations.getDefaultBus().getValue());
        isBusValid = false;
      }
    });

    if (!isBusValid) {
      dispatch(
        vmWizardInternalActions[InternalActionType.UpdateStorage](id, {
          id: oldSourceStorage ? oldSourceStorage.id : getNextIDResolver(getStorages(state, id))(),
          ...newSourceStorage,
        }),
      );
    }
  }
};

export const updateStorageTabState = (options: UpdateOptions) =>
  [prefillInitialDiskUpdater, diskBusUpdater].forEach((updater) => {
    updater && updater(options);
  });
