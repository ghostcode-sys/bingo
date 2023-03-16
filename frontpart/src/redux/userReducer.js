import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  name: "",
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user-reducer",
  initialState: initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.isAuth = true;
    },
    removeUserInfo:(state) => {
      state.username="";
      state.name="";
      state.isAuth=false;
    }
  },
});


export const {setUserInfo, removeUserInfo} = userSlice.actions;

export default userSlice.reducer