import { useSelector } from 'react-redux';
import type { CannedResponse } from '../types/canned-responses';
import { getFilteredCannedResponses } from '../store/selectors';

interface UseCannedResponses {
  cannedResponses: CannedResponse[];
  isEmpty: boolean;
}

const sortedResponses = (responses: CannedResponse[]): CannedResponse[] =>
  responses.sort((first, second) => second.modificationTimestamp - first.modificationTimestamp);

export const useCannedResponses = (): UseCannedResponses => {
  const items = useSelector(getFilteredCannedResponses);
  const isEmpty = items.length === 0;

  return {
    cannedResponses: isEmpty ? [] : sortedResponses(items),
    isEmpty,
  };
};
