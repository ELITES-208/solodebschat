import { auth, db } from "../../fb";
import {
  CLEAR_DATA,
  SET_IS_CHAT_OPTIONS_VISIBLE,
  USER_STATE_CHANGE,
} from "../constants";

export function fetchUser() {
  return (dispatch) => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("does not exist");
        }
      });
  };
}

export const setChatOptionVisible = (bool) => {
  return (dispatch) => {
    dispatch({
      type: SET_IS_CHAT_OPTIONS_VISIBLE,
      isVisible: bool,
    });
  };
};

export const clearData = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_DATA,
    });
  };
};
