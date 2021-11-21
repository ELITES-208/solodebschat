import { combineReducers } from "redux";
import { chats } from "./chats";
import { user } from "./user";

const Reducers = combineReducers({
  userState: user,
  chatState: chats,
});

export default Reducers;
