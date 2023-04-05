import { createSlice } from "@reduxjs/toolkit";

export const currentChatUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    currentUser: {
      id: 0,
    },
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser } = currentChatUserSlice.actions;

export const selectCurrentUser = (state) => state.currentUser.currentUser;

export default currentChatUserSlice.reducer;
