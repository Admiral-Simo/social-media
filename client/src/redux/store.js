import { configureStore } from "@reduxjs/toolkit";
import { socialApi } from "./api/apiSlice";
import searchReducer from "./features/searchSlice";

export default configureStore({
  reducer: {
    search: searchReducer,
    [socialApi.reducerPath]: socialApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socialApi.middleware),
});
