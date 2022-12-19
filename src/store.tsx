import { configureStore } from '@reduxjs/toolkit'

import counterSlice from './features/counter/counterSlice'
import userSlice from './features/user/userSlice'

export function makeStore(){
    return configureStore({
        reducer: {
            counter: counterSlice.reducer,
            user : userSlice.reducer
        }
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export default store;