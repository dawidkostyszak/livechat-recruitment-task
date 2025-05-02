import { StoreState } from './selectors';
import { Actions, type ActionTypes } from './actions';

const defaultState: StoreState = {
  entities: {
    cannedResponses: {
      byIds: {},
      allIds: [],
    },
  },
  filter: 'all',
};

export const reducer = (state: StoreState = defaultState, action: ActionTypes): StoreState => {
  switch (action.type) {
    case Actions.SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};
