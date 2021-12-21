import { REGISTER_VENUE_SUCCESS, REGISTER_VENUE_FAIL } from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAdded: null,
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
    case REGISTER_VENUE_FAIL:
      return {
        ...state,
        isAdded: false,
        loading: false,
      };
    default:
      return state;
  }
}
