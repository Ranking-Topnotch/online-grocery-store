import { createSlice } from "@reduxjs/toolkit";

//state
const initialState = {
    _id: "", 
    firstName: "", 
    lastName: "", 
    email: "", 
    profileImage: "" 
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        loginRedux: (state, action) =>{
            state._id = action.payload.data._id
            state.firstName = action.payload.data.firstName
            state.lastName = action.payload.data.lastName
            state.email = action.payload.data.email
            state.profileImage = action.payload.data.profileImage
        },
        logoutRedux: (state, action) =>{
            state._id = ""
            state.firstName = ""
            state.lastName = ""
            state.email = ""
            state.profileImage = ""
        }
    }
})

export const { loginRedux, logoutRedux } = userSlice.actions

export default userSlice.reducer