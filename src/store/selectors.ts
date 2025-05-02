import { CannedResponse } from '../types/canned-responses';
import { KeyMap } from '../types/types';
import { createSelector } from 'reselect';

export interface EntitiesState {
  cannedResponses: CannedResponsesState;
}

export interface StoreState {
  entities: EntitiesState;
}

export interface CannedResponsesState {
  byIds: KeyMap<CannedResponse>;
  allIds: string[];
}

export interface WithCannedResponsesState {
  entities: {
    cannedResponses: CannedResponsesState;
  };
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
