import { createSlice } from "@reduxjs/toolkit";

interface StoreUserType {
    displayName: string;
    accessToken: string;
    email: string;
}

const initialState: StoreUserType = {
    displayName: "",
    accessToken: "",
    email: "",
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
        logout() {
            return initialState;
        },
    },
});

export const { setDisplayName, setToken, setEmail, logout } = userSlice.actions;

export default userSlice.reducer;
