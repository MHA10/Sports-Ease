import {
  GET_VENUES,
  VENUES_ERROR,
  GET_VENUE,
  VENUE_ERROR,
} from "../actions/type";

const initialState = {
  venues: [],
  venue: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_VENUES:
      return {
        ...state,
        venues: payload,
        loading: false,
      };
    case VENUES_ERROR:
    case VENUE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_VENUE:
      return {
        ...state,
        venue: payload,
      };
    default:
      return state;
  }
}
