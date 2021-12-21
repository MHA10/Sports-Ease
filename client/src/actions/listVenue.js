import axios from "axios";
import { setAlert } from "./alert";
import { GET_VENUES, VENUES_ERROR } from "./type";

// Get Venues
export const getVenues = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/venues");

    dispatch({
      type: GET_VENUES,
      payload: res.data,
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
