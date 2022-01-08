import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_VENUES,
  VENUES_ERROR,
  GET_VENUE,
  VENUE_ERROR,
  VENUE_EDIT_ERROR,
} from "./type";

// Get Venues
export const getVenues = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/venues");

    dispatch({
      type: GET_VENUES,
      payload: res.data,
    });
    // Needs to reset the isUpdated flag
    dispatch({
      type: VENUE_EDIT_ERROR,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: VENUES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get selected Venue
export const getVenue = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/venues/${id}`);
    dispatch({
      type: GET_VENUE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: VENUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
