import {
  REGISTER_VENUE_SUCCESS,
  REGISTER_VENUE_FAIL,
  VENUE_EDIT_SUCCESS,
  VENUE_EDIT_ERROR,
} from "../actions/type";

const initialState = {
  loading: true,
};

export default function red(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_VENUE_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case VENUE_EDIT_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case REGISTER_VENUE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case VENUE_EDIT_ERROR:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    default:
      return state;
  }
}
