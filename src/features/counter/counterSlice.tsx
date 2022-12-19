import {createSlice} from '@reduxjs/toolkit';
import { AppState } from '../../store';

const counterSlice = createSlice({
    name: 'counterSlice',
    initialState: {value:0},
    reducers:{
        up:(state,action) => {
            state.value = state.value + action.payload;
        },
        down : (state,action) => {
            state.value = state.value - action.payload;
        }
    }
})

export const selectCount = (state: AppState) => state.counter.value;

export default counterSlice;

export const {up, down} = counterSlice.actions;