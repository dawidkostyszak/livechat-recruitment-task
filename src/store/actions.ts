import { CannedResponseFilterType } from '../types/filter-type.ts';

const SET_FILTER = 'SET_FILTER';

export const setFilterAction = (filter: CannedResponseFilterType) => ({ type: SET_FILTER, payload: filter });

export type ActionTypes = ReturnType<typeof setFilterAction>;

export const Actions = {
  SET_FILTER,
} as const;
