import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlice";

const store = configureStore({
    reducer: {
        usersInfo: userReducer,
    }
})

export default store;

//committed