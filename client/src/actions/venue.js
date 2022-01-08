import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_VENUE_SUCCESS,
  REGISTER_VENUE_FAIL,
  VENUE_EDIT_SUCCESS,
  VENUE_EDIT_ERROR,
} from "./type";

// Register Venue
export const registerVenue =
  ({ name, address }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, address });

    try {
      const res = await axios.post("/api/venues", body, config);

      dispatch({
        type: REGISTER_VENUE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_VENUE_FAIL,
      });
    }
  };

// Update Venue
export const updateVenue = (id, name, address) => async (dispatch) => {
  console.log("called action");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, address });

  try {
    const res = await axios.post(`/api/venues/${id}`, body, config);

    dispatch({
      type: VENUE_EDIT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: VENUE_EDIT_ERROR,
    });
  }
};
