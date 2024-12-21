import { createSlice } from "@reduxjs/toolkit";

interface StoreUserType {
    displayName: string;
    accessToken: string;
    email: string;
    photoURL: string;
}

const initialState: StoreUserType = {
    displayName: "",
    accessToken: "",
    email: "",
    photoURL: "",
};

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setDisplayName(state, action) {
            state.displayName = action.payload;
        },
        setToken(state, action) {
            state.accessToken = action.payload;
        },
        setEmail(state, action) {
            state.email = action.payload;
        },
        setPhoto(state, action) {
            state.photoURL = action.payload;
        },
        logout() {
            return initialState;
        },
    },
});

export const { setDisplayName, setToken, setEmail, setPhoto, logout } = userSlice.actions;

export default userSlice.reducer;
