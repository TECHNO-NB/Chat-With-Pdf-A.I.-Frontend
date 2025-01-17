import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface DocRefreshState {
  isDocRefresh: boolean;
}

const initialState: DocRefreshState = {
  isDocRefresh: false,
};

const docRefresh = createSlice({
  name: "isDocRefresh",
  initialState,
  reducers: {
    refreshDoc(state, action: PayloadAction<boolean>) {
      state.isDocRefresh = action.payload;
    },
  },
});

export const { refreshDoc } = docRefresh.actions;
export default docRefresh.reducer;
