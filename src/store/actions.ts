import { CannedResponseFilterType } from '../types/filter-type';
import { Author } from '../types/author';

export const Actions = {
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
  SET_AUTHOR: 'SET_AUTHOR',
} as const;

export const setFilterAction = (filter: CannedResponseFilterType) => ({ type: Actions.SET_FILTER, payload: filter });
export const setSearchAction = (search: string) => ({ type: Actions.SET_SEARCH, payload: search });
export const setAuthorAction = (cannedResponseId: string, author: Author) => ({
  type: Actions.SET_AUTHOR,
  payload: { cannedResponseId, author },
});

export type ActionTypes = ReturnType<typeof setFilterAction | typeof setSearchAction | typeof setAuthorAction>;
