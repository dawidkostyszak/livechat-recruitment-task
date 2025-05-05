import { ScrollSeekPlaceholderProps } from 'react-virtuoso';
import { Loader } from '@livechat/design-system-react-components';

export const CannedResponseItemPlaceholder = ({ height }: ScrollSeekPlaceholderProps) => (
  <div
    style={{
      height,
    }}
  >
    <Loader size="small" label="Loading..." />
  </div>
);
