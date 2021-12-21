import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import venue from "./venue";
import listVenue from "./listVenue";

export default combineReducers({
  alert,
  auth,
  venue,
  listVenue,
});
