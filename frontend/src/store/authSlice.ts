import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface State {
    loading: boolean;
    user: string | null;
    error: string | null;
}

const initialState: State = {
    loading: false,
    user: null,
    error: null,
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        updateError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updateUser: (state, action: PayloadAction<string | null>) => {
            state.user = action.payload
        }
    },
    extraReducers:(builder) => {

    }
})

export const { updateError, updateUser } = authSlice.actions;
export default authSlice.reducer;