import { type FC } from 'react';
import * as styles from './styles';
import { SegmentedControl } from '@livechat/design-system-react-components';
import { useCannedResponsesButtons } from './use-canned-responses-buttons';

export const CannedResponseButtons: FC = () => {
  const { buttons, filter, handleSetFilter } = useCannedResponsesButtons();

  return (
    <>
      <div className={styles.segmentedControllButtonTopSpace}></div>
      <SegmentedControl
        initialId="all"
        currentId={filter}
        className={styles.segmentedControlButton}
        buttons={buttons}
        onButtonClick={handleSetFilter}
      />
    </>
  );
};
