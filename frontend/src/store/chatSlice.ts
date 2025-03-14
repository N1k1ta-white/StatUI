import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface State {
    loading: boolean;
    chat: string[];
    error: string | null;
}

const initialState: State = {
    loading: false,
    chat: [],
    error: null,
}

const chatSlice = createSlice({
    name: 'chatSlice',
    initialState,
    reducers: {
        updateError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updateChatWithMessage: (state, action: PayloadAction<string>) => {
            state.chat.push(action.payload);
        }
    },
    extraReducers:(builder) => {

    }
})

export const { updateError, updateChatWithMessage } = chatSlice.actions;
export default chatSlice.reducer;