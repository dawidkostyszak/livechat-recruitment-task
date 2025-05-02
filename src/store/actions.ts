import { CannedResponseFilterType } from '../types/filter-type.ts';

export const Actions = {
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
} as const;

export const setFilterAction = (filter: CannedResponseFilterType) => ({ type: Actions.SET_FILTER, payload: filter });
export const setSearchAction = (search: string) => ({ type: Actions.SET_SEARCH, payload: search });

export type ActionTypes = ReturnType<typeof setFilterAction | typeof setSearchAction>;
