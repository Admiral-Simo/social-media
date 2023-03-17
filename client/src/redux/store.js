import { configureStore } from "@reduxjs/toolkit";
import { socialApi } from "./api/apiSlice";

export default configureStore({
  reducer: {
    [socialApi.reducerPath]: socialApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socialApi.middleware),
});
