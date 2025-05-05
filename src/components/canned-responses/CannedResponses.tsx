import { type FC } from 'react';
import { SearchInput } from '@livechat/design-system-react-components';
import * as styles from './styles';
import { CannedResponseButtons } from '../canned-responses-buttons/CannedResponseButtons';
import { CannedResponsesList } from './CannedResponsesList';
import { useCannedResponses } from './use-canned-responses';

export const CannedResponses: FC = () => {
  const { search, handleSearch } = useCannedResponses();

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
        <CannedResponsesList handleSearch={handleSearch} />
      </div>
    </div>
  );
};
