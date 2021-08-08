import { combineReducers } from "redux";
import { authReducer } from "./auth";

//combined reducer
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
