import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {chartInterfaceClusteringResponse, chartReduxInterface, descriptiveResponse} from "@/type/chart.ts";
import {fetchFormDataAuth} from "@/lib/fetch";
import {defaultClusteringMockdata, defaultDescriptiveMockdata} from "@/lib/utils.ts";

interface State {
    loading: boolean;
    descriptiveResponse: descriptiveResponse;
    chartInterfaceClusteringResponse:chartInterfaceClusteringResponse;
    charts: chartReduxInterface[];
    error: string | null;
}

const initialState: State = {
    descriptiveResponse: defaultDescriptiveMockdata,
    chartInterfaceClusteringResponse: defaultClusteringMockdata,
    loading: false,
    charts: [] as chartReduxInterface[],
    error: null,

}


export const fetchUploadContext = createAsyncThunk<descriptiveResponse, {
    file:File | null,
    inputValues:{[key:string]:string}
    notes:string
    }>(
    'chartSlice/fetchUploadContext',
    async (contextData) => {
        try {
            const formData = new FormData();
            formData.append('file', contextData.file!);
            // formData.append('inputValues', JSON.stringify(contextData.inputValues));
            // formData.append('notes', contextData.notes);
            const query = `${import.meta.env.VITE_API_STATISTICS_URL}/descriptive`;
            return await fetchFormDataAuth<descriptiveResponse>(query, {
                method: 'POST',
                body: formData
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
)



const chartsSlice = createSlice({
    name: 'chartsSlice',
    initialState,
    reducers: {
        updateError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updateChartsWithChart: (state, action: PayloadAction<chartReduxInterface>) => {
            state.charts.push(action.payload);
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchUploadContext.pending,(state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUploadContext.fulfilled,(state,action)=> {
            state.loading = false;
            state.error = null;
            console.log(action.payload);
            state.descriptiveResponse = action.payload;

        })
        .addCase(fetchUploadContext.rejected,(state,action)=> {
            state.loading = false;
            console.log(action.error.message);

        })
    }
})

export const { updateError, updateChartsWithChart } = chartsSlice.actions;
export default chartsSlice.reducer;