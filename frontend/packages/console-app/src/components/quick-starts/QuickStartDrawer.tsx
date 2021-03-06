import * as React from 'react';
import * as classNames from 'classnames';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Drawer,
  DrawerPanelContent,
  DrawerContent,
  DrawerPanelBody,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  DrawerContentBody,
  Title,
} from '@patternfly/react-core';
import { RootState } from '@console/internal/redux';
import { AsyncComponent } from '@console/internal/components/utils';
import { confirmModal } from '@console/internal/components/modals';
import { useScrollDirection, ScrollDirection } from '@console/shared/';
import {
  getActiveQuickStartID,
  getActiveQuickStartStatus,
} from '../../redux/reducers/quick-start-reducer';
import { setActiveQuickStart } from '../../redux/actions/quick-start-actions';
import { getQuickStartByName } from './utils/quick-start-utils';
import { QuickStartStatus } from './utils/quick-start-types';

import './QuickStartDrawer.scss';

type StateProps = {
  activeQuickStartID: string;
  activeQuickStartStatus: QuickStartStatus;
};

type DispatchProps = {
  onClose: () => void;
};

type QuickStartDrawerProps = StateProps & DispatchProps;

const QuickStartDrawer: React.FC<QuickStartDrawerProps> = ({
  children,
  activeQuickStartID,
  activeQuickStartStatus,
  onClose,
}) => {
  const quickStart = getQuickStartByName(activeQuickStartID);
  const [scrollDirection, handleScrollCallback] = useScrollDirection();

  const handleClose = () => {
    if (activeQuickStartStatus === QuickStartStatus.IN_PROGRESS) {
      return confirmModal({
        title: 'Are you sure you want to leave the tour?',
        message: "Any progress you've made will be saved.",
        btnText: 'Leave',
        executeFn: () => {
          onClose();
          return Promise.resolve();
        },
      });
    }

    return onClose();
  };

  const headerClasses = classNames('co-quick-start-drawer-head', {
    'pf-u-box-shadow-sm-bottom':
      scrollDirection && scrollDirection !== ScrollDirection.scrolledToTop,
  });

  const panelContent = quickStart ? (
    <DrawerPanelContent onScroll={handleScrollCallback}>
      <div className={headerClasses}>
        <DrawerHead>
          <div className="co-quick-start-drawer__title">
            <Title
              headingLevel="h1"
              size="xl"
              style={{ marginRight: 'var(--pf-global--spacer--md)' }}
            >
              {quickStart?.spec.displayName}
            </Title>
            <Title headingLevel="h6" size="md" className="text-secondary">
              {`${quickStart?.spec.duration} minutes`}
            </Title>
          </div>
          <DrawerActions>
            <DrawerCloseButton onClick={handleClose} />
          </DrawerActions>
        </DrawerHead>
      </div>
      <DrawerPanelBody>
        <AsyncComponent
          loader={() => import('./QuickStartController').then((c) => c.default)}
          quickStart={quickStart}
        />
      </DrawerPanelBody>
    </DrawerPanelContent>
  ) : null;

  return (
    <Drawer isExpanded={!!activeQuickStartID} isInline>
      <DrawerContent panelContent={panelContent}>
        <DrawerContentBody className="co-quick-start-drawer__body">{children}</DrawerContentBody>
      </DrawerContent>
    </Drawer>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  activeQuickStartID: getActiveQuickStartID(state),
  activeQuickStartStatus: getActiveQuickStartStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClose: () => dispatch(setActiveQuickStart('')),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(QuickStartDrawer);
