import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import venue from "./venue";

export default combineReducers({
  alert,
  auth,
  venue,
});
