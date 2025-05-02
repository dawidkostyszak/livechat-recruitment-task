import { useState, type FC } from 'react';
import { SearchInput } from '@livechat/design-system-react-components';
import { CannedResponseItem } from './CannedResponseItem';
import { EmptyState } from '../empty-state/EmptyState';
import { useCannedResponses } from '../../hooks/use-canned-responses';
import * as styles from './styles';
import { CannedResponseButtons } from '../canned-responses-buttons/CannedResponseButtons';

export const CannedResponses: FC = () => {
  const { cannedResponses, isEmpty } = useCannedResponses();
  const [search, setSearch] = useState('');

  return (
    <div className={styles.wrapper}>
      {!isEmpty && (
        <>
          <div className={styles.actionBar}>
            <div className={styles.barContainer}>
              <CannedResponseButtons />
            </div>
            <SearchInput onChange={setSearch} value={search} className={styles.searchBar} />
          </div>
        </>
      )}

      <div className={styles.list}>
        {isEmpty && (
          <EmptyState
            icon={true}
            title="No canned responses"
            description="Save frequently used responses under a simple shortcut"
            className={styles.emptyState}
          />
        )}

        {!isEmpty && (
          <>
            {cannedResponses.map((item) => (
              <CannedResponseItem key={item.id} item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
