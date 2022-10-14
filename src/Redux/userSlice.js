import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: 0,
    userData: null,
};
export const userSlicer = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },

        setClear: (state, action) => {
            state.value = 0;
            state.userData = null;
        },
    },
});

export const { setUserData, setClear } = userSlicer.actions;

export default userSlicer.reducer;
