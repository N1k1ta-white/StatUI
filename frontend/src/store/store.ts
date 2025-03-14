import { configureStore } from '@reduxjs/toolkit';
import authReducer from "@/store/authSlice.ts"
import chatReducer from "@/store/chatSlice.ts"
import chartsReducer from "@/store/chartsSlice.ts"

const store = configureStore({
    reducer: {
        authData: authReducer,
        chartsData: chartsReducer,
        chatData: chatReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export default store