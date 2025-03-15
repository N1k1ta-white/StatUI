import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChartBase, ChartInterfaceClustering, DescriptiveStatistics, StatisticsStore} from "@/type/chart.ts";
import {fetchFormDataAuth} from "@/lib/fetch";
import {RootState} from "@/store/store.ts";

export interface State {
    file: File | null,
    loading: boolean;
    statistics: StatisticsStore;
    error: string | null;
}


const initialState: State = {
    file: null,
    loading: false,
    statistics: {
        fileId: null,
        fileName: null,
        descriptiveStatistics: null,
        charts: []
    },
    error: null,
}

export const fetchUploadContext = createAsyncThunk<DescriptiveStatistics, {
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
            return await fetchFormDataAuth<DescriptiveStatistics>(query, {
                method: 'POST',
                body: formData
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
)

export const fetchUploadCluster = createAsyncThunk<
    ChartBase,
    void,
    { state: RootState }
>(
    'chartSlice/fetchUploadCluster',
    async (_, { getState }) => {
        try {
            const state = getState();
            if(!state.chartsData.file) throw Error('No file provided');
            const formData = new FormData();
            formData.append('file', state.chartsData.file);
            // formData.append('inputValues', JSON.stringify(contextData.inputValues));
            // formData.append('notes', contextData.notes);
            const query = `${import.meta.env.VITE_API_STATISTICS_URL}/clusters`;
            return await fetchFormDataAuth<ChartBase>(query, {
                method: 'POST',
                body: formData
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
)



const statisticsSlice = createSlice({
    name: 'statisticsSlice',
    initialState,
    reducers: {
        updateError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updateChartsWithChart: (state, action: PayloadAction<ChartBase>) => {
            state.statistics.charts.push(action.payload);
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
            state.statistics.descriptiveStatistics = action.payload;
            state.file = action.meta.arg.file;

        })
        .addCase(fetchUploadContext.rejected,(state, action)=> {
            state.loading = false;
            state.error = action.error.message || "Неизвестна грешка";
        })

        .addCase(fetchUploadCluster.pending,(state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUploadCluster.fulfilled,(state,action)=> {
            state.loading = false;
            state.error = null;
            state.statistics.charts.push(action.payload);
            state.file = action.meta.arg.file;

        })
        .addCase(fetchUploadCluster.rejected,(state, action)=> {
            state.loading = false;
            state.error = action.error.message || "Неизвестна грешка";
        })
    }
})

export const { updateError, updateChartsWithChart } = statisticsSlice.actions;
export default statisticsSlice.reducer;