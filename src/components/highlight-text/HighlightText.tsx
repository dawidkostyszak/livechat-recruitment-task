import type { FC } from 'react';
import { escapeRegExp } from 'lodash';

interface Props {
  text: string;
  highlight: string;
}

export const HighlightText: FC<Props> = ({ text = '', highlight = '' }) => {
  if (highlight.trim() === '') {
    return <span>{text}</span>;
  }

  const escapedHighlight = escapeRegExp(highlight);
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.split(regex).filter((part) => part);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? <mark key={index}>{part}</mark> : <span key={index}>{part}</span>,
      )}
    </span>
  );
};
