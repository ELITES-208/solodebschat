import { SET_IS_CHAT_OPTIONS_VISIBLE } from "../constants";

const initialState = {
  isVisible: false,
};

export const chats = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_CHAT_OPTIONS_VISIBLE:
      return {
        ...state,
        isVisible: action.isVisible,
      };

    default:
      return state;
  }
};
