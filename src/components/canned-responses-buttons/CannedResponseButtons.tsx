import { type FC } from 'react';
import * as styles from '../canned-responses/styles';
import { SegmentedControl } from '@livechat/design-system-react-components';
import { CannedResponseFilterType } from '../../types/filter-type';
import { useCannedResponsesButtons } from './use-canned-responses-buttons';

interface Props {
  filter: CannedResponseFilterType;
  setFilter: (filter: CannedResponseFilterType) => void;
}

export const CannedResponseButtons: FC<Props> = ({ filter, setFilter }) => {
  const buttons = useCannedResponsesButtons();

  return (
    <>
      <div className={styles.segmentedControllButtonTopSpace}></div>
      <SegmentedControl
        initialId="all"
        currentId={filter}
        className={styles.segmentedControlButton}
        buttons={buttons}
        onButtonClick={(id) => setFilter(id as CannedResponseFilterType)}
      />
    </>
  );
};
