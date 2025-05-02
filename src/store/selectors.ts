import { CannedResponse } from '../types/canned-responses';
import { KeyMap } from '../types/types';
import { createSelector } from 'reselect';
import type { CannedResponseFilterType } from '../types/filter-type';

export interface EntitiesState {
  cannedResponses: CannedResponsesState;
}

export interface StoreState {
  entities: EntitiesState;
  filter: CannedResponseFilterType;
}

export interface CannedResponsesState {
  byIds: KeyMap<CannedResponse>;
  allIds: string[];
}

export interface WithCannedResponsesState {
  entities: {
    cannedResponses: CannedResponsesState;
  };
  filter: CannedResponseFilterType;
}

export const getCannedResponses = createSelector(
  [(state: WithCannedResponsesState): KeyMap<CannedResponse> => state.entities.cannedResponses.byIds],
  (cannedResponses: KeyMap<CannedResponse>): CannedResponse[] => {
    return Object.values(cannedResponses);
  },
);

export const getSharedCannedResponses = createSelector(
  [getCannedResponses],
  (cannedResponses: CannedResponse[]): CannedResponse[] => {
    return cannedResponses.filter((cannedResponse) => !cannedResponse.isPrivate);
  },
);

export const getPrivateCannedResponses = createSelector(
  [getCannedResponses],
  (cannedResponses: CannedResponse[]): CannedResponse[] => {
    return cannedResponses.filter((cannedResponse) => cannedResponse.isPrivate);
  },
);

export function getFilter(state: WithCannedResponsesState): CannedResponseFilterType {
  return state.filter;
}

export const getFilteredCannedResponses = createSelector(
  [getCannedResponses, getSharedCannedResponses, getPrivateCannedResponses, getFilter],
  (cannedResponses, sharedCannedResponses, privateCannedResponses, filter): CannedResponse[] => {
    if (filter === 'shared') {
      return sharedCannedResponses;
    }

    if (filter === 'private') {
      return privateCannedResponses;
    }

    return cannedResponses;
  },
);
