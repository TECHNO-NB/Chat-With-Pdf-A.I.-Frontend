import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  plan: boolean;
  isLogin: boolean;
}

const initialState: IUser = {
  _id: "",
  username: "",
  email: "",
  plan:false,
  isLogin: false,
};

export const User = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.plan = action.payload.plan;
      state.isLogin = action.payload.isLogin;
    },
  },
});

export const { login } = User.actions;
export default User.reducer;
