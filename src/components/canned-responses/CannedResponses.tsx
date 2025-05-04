import { useState, type FC } from 'react';
import { SearchInput } from '@livechat/design-system-react-components';
import { CannedResponseItem } from './CannedResponseItem';
import { EmptyState } from '../empty-state/EmptyState';
import { useCannedResponses } from '../../hooks/use-canned-responses';
import * as styles from './styles';
import { CannedResponseButtons } from '../canned-responses-buttons/CannedResponseButtons';
import { useDispatch } from 'react-redux';
import { setSearchAction } from '../../store/actions';
import { debounce } from 'lodash';
import { Virtuoso } from 'react-virtuoso';
import { CannedResponseItemPlaceholder } from './CannedResponseItemPlaceholder';

const OVERSCAN_ITEMS = 2;

export const CannedResponses: FC = () => {
  const { cannedResponses, isEmpty } = useCannedResponses();
  const [search, setSearch] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const dispatch = useDispatch();
  const debouncedDispatch = debounce(dispatch, 500);

  const handleSearch = (value: string) => {
    setSearch(value);
    debouncedDispatch(setSearchAction(value));
  };

  return (
    <div className={styles.wrapper}>
      <>
        <div className={styles.actionBar}>
          <div className={styles.barContainer}>
            <CannedResponseButtons />
          </div>
          <SearchInput onChange={handleSearch} value={search} className={styles.searchBar} />
        </div>
      </>

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
        )}
      </div>
    </div>
  );
};
