import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        empolye:[],
        selected:null
    },
    reducers:{
        setUser:(state, action) => {
            state.user = action.payload;
        },
        setEmpolye:(state,action)=>{
           state.empolye=action.payload
        },
        setSelectdUser:(state,action)=>{
            state.selected=action.payload
        }
    }
});
export const {setUser,setEmpolye,setSelectdUser} = authSlice.actions;
export default authSlice.reducer;