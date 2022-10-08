import { createSlice } from '@reduxjs/toolkit'

export const userSlicer = createSlice({
    name: 'user',
    initialState: {
        value: 0,
        userData: null
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        }
    },
})


export const { setUserData } = userSlicer.actions

export default userSlicer.reducer