import { StoreState } from './selectors';
import { Actions, type ActionTypes } from './actions';

const defaultState: StoreState = {
  entities: {
    cannedResponses: {
      byIds: {},
      allIds: [],
    },
    authors: {
      byCannedResponseIds: {},
    },
  },
  filter: 'all',
  search: '',
};

export const reducer = (state: StoreState = defaultState, action: ActionTypes): StoreState => {
  switch (action.type) {
    case Actions.SET_FILTER:
      return { ...state, filter: action.payload };
    case Actions.SET_SEARCH:
      return { ...state, search: action.payload };
    case Actions.SET_AUTHOR:
      return {
        ...state,
        entities: {
          ...state.entities,
          authors: {
            ...state.entities.authors,
            byCannedResponseIds: {
              ...state.entities.authors.byCannedResponseIds,
              [action.payload.cannedResponseId]: action.payload.author,
            },
          },
        },
      };
    default:
      return state;
  }
};
