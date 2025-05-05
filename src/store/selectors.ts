import { CannedResponse } from '../types/canned-responses';
import { KeyMap } from '../types/types';
import { createSelector } from 'reselect';
import type { CannedResponseFilterType } from '../types/filter-type';
import { Author } from '../types/author';
import { searchCannedResponses } from './helpers/search-canned-responses';

export interface EntitiesState {
  cannedResponses: CannedResponsesState;
  authors: AuthorsState;
}

export interface StoreState {
  entities: EntitiesState;
  filter: CannedResponseFilterType;
  search: string;
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

export interface AuthorsState {
  byCannedResponseIds: KeyMap<Author>;
}

export interface WithAuthorsState {
  entities: {
    authors: AuthorsState;
  };
}

export const getCannedResponses = createSelector(
  [(state: WithCannedResponsesState): KeyMap<CannedResponse> => state.entities.cannedResponses.byIds],
  (cannedResponses): CannedResponse[] => {
    return Object.values(cannedResponses);
  },
);

export const getSharedCannedResponses = createSelector(
  [getCannedResponses, getSearch],
  (cannedResponses, search): CannedResponse[] => {
    return searchCannedResponses(
      cannedResponses.filter((cannedResponse) => !cannedResponse.isPrivate),
      search,
    );
  },
);

export const getPrivateCannedResponses = createSelector(
  [getCannedResponses, getSearch],
  (cannedResponses, search): CannedResponse[] => {
    return searchCannedResponses(
      cannedResponses.filter((cannedResponse) => cannedResponse.isPrivate),
      search,
    );
  },
);

export const getAllCannedResponses = createSelector(
  [getSharedCannedResponses, getPrivateCannedResponses],
  (sharedCannedResponses, privateCannedResponses): CannedResponse[] => {
    return [...sharedCannedResponses, ...privateCannedResponses];
  },
);

export const getFilteredCannedResponses = createSelector(
  [getAllCannedResponses, getSharedCannedResponses, getPrivateCannedResponses, getFilter],
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

export function getFilter(state: StoreState): CannedResponseFilterType {
  return state.filter;
}

export function getSearch(state: StoreState): string {
  return state.search;
}

export function getAuthors(state: WithAuthorsState): KeyMap<Author> {
  return state.entities.authors.byCannedResponseIds;
}
