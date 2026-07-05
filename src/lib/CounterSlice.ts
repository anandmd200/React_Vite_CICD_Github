import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Counter {
    value: number;
}

const initialState: Counter = {
    value : 0
}

const CounterSlice = createSlice({
    name: 'CounterSlice',
    initialState: initialState,
    reducers : {

        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        increaseByValue: (state,action:PayloadAction<number>) => {
            state.value += action.payload; 
        } 
    }
})


export const {increment, decrement, increaseByValue} = CounterSlice.actions;

export default CounterSlice.reducer;