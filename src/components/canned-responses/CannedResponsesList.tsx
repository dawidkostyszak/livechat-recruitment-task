import { CannedResponseItem } from './CannedResponseItem';
import { CannedResponseItemPlaceholder } from './CannedResponseItemPlaceholder';
import { Virtuoso } from 'react-virtuoso';
import { type FC, useState } from 'react';
import { useCannedResponses } from '../../hooks/use-canned-responses';
import * as styles from './styles';
import { EmptyState } from '../empty-state/EmptyState';

const OVERSCAN_ITEMS = 2;

interface Props {
  handleSearch: (value: string) => void;
}

export const CannedResponsesList: FC<Props> = ({ handleSearch }) => {
  const { cannedResponses, isEmpty } = useCannedResponses();
  const [isScrolling, setIsScrolling] = useState(false);

  if (isEmpty) {
    return (
      <EmptyState
        icon={true}
        title="No canned responses"
        description="Save frequently used responses under a simple shortcut"
        className={styles.emptyState}
      />
    );
  }

  return (
    <Virtuoso
      style={{ height: '100%' }}
      data={cannedResponses}
      itemContent={(_, item, { isScrolling }) => (
        <CannedResponseItem key={item.id} item={item} handleSearch={handleSearch} isScrolling={isScrolling} />
      )}
      overscan={{
        main: OVERSCAN_ITEMS,
        reverse: OVERSCAN_ITEMS,
      }}
      context={{ isScrolling }}
      isScrolling={setIsScrolling}
      components={{ ScrollSeekPlaceholder: CannedResponseItemPlaceholder }}
      scrollSeekConfiguration={{
        enter: (velocity) => Math.abs(velocity) > 3000,
        exit: (velocity) => Math.abs(velocity) < 10,
      }}
    />
  );
};
