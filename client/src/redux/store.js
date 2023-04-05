import { configureStore } from "@reduxjs/toolkit";
import { socialApi } from "./api/apiSlice";
import searchReducer from "./features/searchSlice";
import currentUserReducer from "./features/currentChatUserSlice";

export default configureStore({
  reducer: {
    search: searchReducer,
    currentUser: currentUserReducer,
    [socialApi.reducerPath]: socialApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socialApi.middleware),
});
