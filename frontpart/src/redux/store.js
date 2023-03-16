import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerReducer";
import userReducer from "./userReducer";
export const store = configureStore({
    reducer:{
        user: userReducer,
        player:playerReducer
    }
});