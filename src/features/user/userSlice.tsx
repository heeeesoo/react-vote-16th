import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { AppState } from "../../store";

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        isLogged : false,
        useremail : '',
        password : '',
        department: -1,
        team: -1,
        name: ''
    },
    reducers: {
        login:(state,action) => {
            state.isLogged = true;
            state.useremail = action.payload.useremail;
            state.password = action.payload.password;
            state.department = action.payload.department;
            state.team = action.payload.team;
            state.name = action.payload.name;
            
        },
        logout:(state)=>{
            state.isLogged = false;
            state.useremail = '';
            state.password = '';
            state.department = -1;
            state.team = -1;
            state.name = '';
        }
    }
})

export const selectUser = (state : AppState) => state.user;

export default userSlice;

export const {login ,logout} = userSlice.actions;