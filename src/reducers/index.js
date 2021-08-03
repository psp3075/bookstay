import { combineReducers } from "redux";
import { authReducer } from "./auth";

//combined reducer
const rootReducer = combineReducers({
  user: authReducer,
});

export default rootReducer;
