import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import pdfFileReducer from "./PdfFileSlice";
import refreshDoc from "./DocRefresh";
const store = configureStore({
  reducer: {
    user: userReducer,
    pdfFile: pdfFileReducer,
    docRefresh: refreshDoc,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
