import todoReducer from './slice/todoSlice'
import { configureStore } from '@reduxjs/toolkit'


export const store=  configureStore({
    reducer:{
        todo:todoReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch