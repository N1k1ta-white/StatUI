import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChartReduxInterface} from "@/type/chart.ts";

interface State {
    loading: boolean;
    charts: ChartReduxInterface[];
    test: string;
    error: string | null;
}

const initialState: State = {
    loading: false,
    charts: [] as ChartReduxInterface[],
    test: '',
    error: null,
}


const chartsSlice = createSlice({
    name: 'chartsSlice',
    initialState,
    reducers: {
        updateError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updateChartsWithChart: (state, action: PayloadAction<ChartReduxInterface>) => {
            state.charts.push(action.payload);
        }
    },
    extraReducers:(builder) => {
    }
})

export const { updateError, updateChartsWithChart } = chartsSlice.actions;
export default chartsSlice.reducer;