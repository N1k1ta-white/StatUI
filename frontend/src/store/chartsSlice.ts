import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChartReduxInterface, descriptiveResponse} from "@/type/chart.ts";
import {fetchFormDataAuth} from "@/lib/fetch";
import {defaultDescriptiveMockdata} from "@/lib/utils.ts";

interface State {
    loading: boolean;
    descriptiveResponse: descriptiveResponse;
    charts: ChartReduxInterface[];
    error: string | null;
}

const initialState: State = {
    descriptiveResponse: defaultDescriptiveMockdata,
    loading: false,
    charts: [] as ChartReduxInterface[],
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
            formData.append('inputValues', JSON.stringify(contextData.inputValues));
            formData.append('notes', contextData.notes);
            const query = `${import.meta.env.VITE_API_STATISTICS_URL}/api/descriptive`;
            return await fetchFormDataAuth<descriptiveResponse>(query, {
                method: 'POST',
                body: formData,
                credentials: "include"
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
        updateChartsWithChart: (state, action: PayloadAction<ChartReduxInterface>) => {
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