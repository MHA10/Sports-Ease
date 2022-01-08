import {
  REGISTER_VENUE_SUCCESS,
  REGISTER_VENUE_FAIL,
  VENUE_EDIT_SUCCESS,
  VENUE_EDIT_ERROR,
} from "../actions/type";

const initialState = {
  isAdded: null,
  isUpdated: false,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_VENUE_SUCCESS:
      return {
        ...state,
        ...payload,
        isAdded: true,
        loading: false,
      };
    case VENUE_EDIT_SUCCESS:
      return {
        ...state,
        ...payload,
        isUpdated: true,
        loading: false,
      };
    case REGISTER_VENUE_FAIL:
      return {
        ...state,
        isAdded: false,
        loading: false,
      };
    case VENUE_EDIT_ERROR:
      return {
        ...state,
        ...payload,
        isUpdated: false,
        loading: false,
      };
    default:
      return state;
  }
}
