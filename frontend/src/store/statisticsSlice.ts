import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChartBase, DescriptiveStatistics, StatisticsStore} from "@/type/chart.ts";;
import {fetchData, fetchFormDataAuth} from "@/lib/fetch";
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

export const fetchUploadFile = createAsyncThunk<
    {
        id: string,
        originalName: string
    },
    {
        file:File | null,
        inputValues:{[key:string]:string}
        notes:string
    }
    >(
    'chartSlice/fetchUploadContext',
    async (contextData) => {
        try {
            const formData = new FormData();
            formData.append('file', contextData.file!);
            // formData.append('inputValues', JSON.stringify(contextData.inputValues));
            // formData.append('notes', contextData.notes);
            const query = `${import.meta.env.VITE_API_ORGANIZER_URL}/api/upload`;
            return await fetchFormDataAuth<{ id: string, originalName: string }>(query, {
                method: 'POST',
                body: formData
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
)

export const fetchUploadStatistics = createAsyncThunk<DescriptiveStatistics, void, { state: RootState }> (
    'chartSlice/fetchUploadStatistics',
    async (_, { getState }) => {
        try {
            const state = getState();
            const fileId = state.chartsData.statistics.fileId
            if(!fileId)
                throw Error('No file provided');
            const query = `${import.meta.env.VITE_API_ORGANIZER_URL}/api/descriptive/${fileId}`;
            return await fetchData<DescriptiveStatistics>(query);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
)

export const fetchUploadSuggestedCharts = createAsyncThunk<ChartBase[], void, { state: RootState }> (
    'chartSlice/fetchUploadSuggestedCharts',
    async (_, { getState }) => {
        try {
            const state = getState();
            const fileId = state.chartsData.statistics.fileId
            if(!fileId)
                throw Error('No file provided');
            const query = `${import.meta.env.VITE_API_ORGANIZER_URL}/api/suggest${fileId}`;
            return await fetchData<ChartBase[]>(query, {
                method: 'GET',
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
)

export const fetchAnalysisMethod = createAsyncThunk<
    ChartBase[],
    { [p: string]: string[] },
    { state: RootState }
>(
'chartSlice/fetchAnalysisMethod',
async (methodData,{getState}) => {
    try {
        const state = getState();
        const methods = Object.keys(methodData);
        const attributes_analysis = Object.values(methodData);
        const query = `${import.meta.env.VITE_API_ORGANIZER_URL}/statistic`;//TODO: change to analysis method
        return await fetchData<ChartBase[]>(query, {
            method: 'POST',
            body:JSON.stringify( {
                fileId: state.chartsData.statistics.fileId,
                methods,
                attributes_analysis,
            })
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
        .addCase(fetchUploadFile.pending,(state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUploadFile.fulfilled,(state,action)=> {
            state.loading = false;
            state.error = null;
            state.statistics.fileId = action.payload.id;
            state.statistics.fileName = action.payload.originalName;
            state.file = action.meta.arg.file;

        })
        .addCase(fetchUploadFile.rejected,(state, action)=> {
            state.loading = false;
            state.error = action.error.message || "Неизвестна грешка";
        })



        .addCase(fetchUploadStatistics.pending,(state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUploadStatistics.fulfilled,(state,action)=> {
            state.loading = false;
            state.error = null;
            state.statistics.descriptiveStatistics = action.payload;

        })
        .addCase(fetchUploadStatistics.rejected,(state, action)=> {
            state.loading = false;
            state.error = action.error.message || "Неизвестна грешка";
        })



        .addCase(fetchUploadSuggestedCharts.pending,(state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUploadSuggestedCharts.fulfilled,(state,action)=> {
            state.loading = false;
            state.error = null;
            state.statistics.charts = action.payload;
        })
        .addCase(fetchUploadSuggestedCharts.rejected,(state, action)=> {
            state.loading = false;
            state.error = action.error.message || "Неизвестна грешка";
        })



        .addCase(fetchAnalysisMethod.pending,(state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAnalysisMethod.fulfilled,(state,action)=> {
            state.loading = false;
            state.error = null;
            state.statistics.charts = [...state.statistics.charts, ...action.payload];

        })
        .addCase(fetchAnalysisMethod.rejected,(state, action)=> {
            state.loading = false;
            state.error = action.error.message || "Неизвестна грешка";
        })



        //
        //     .addCase(fetchUploadCluster.pending,(state)=> {
        //         state.loading = true;
        //         state.error = null;
        //     })
        //     .addCase(fetchUploadCluster.fulfilled,(state,action)=> {
        //         state.loading = false;
        //         state.error = null;
        //         console.log(action.payload)
        //         state.statistics.charts.push(action.payload);
        //
        //     })
        //     .addCase(fetchUploadCluster.rejected,(state, action)=> {
        //         state.loading = false;
        //         state.error = action.error.message || "Неизвестна грешка";
        //     })
        //
        //
        //
        // .addCase(fetchUploadCorrelation.pending,(state)=> {
        //     state.loading = true;
        //     state.error = null;
        // })
        // .addCase(fetchUploadCorrelation.fulfilled,(state,action)=> {
        //     state.loading = false;
        //     state.error = null;
        //     console.log(action.payload)
        //     state.statistics.charts.push(action.payload);
        //
        // })
        // .addCase(fetchUploadCorrelation.rejected,(state, action)=> {
        //     state.loading = false;
        //     state.error = action.error.message || "Неизвестна грешка";
        // })
        //
        //
        //
        // .addCase(fetchUploadRegression.pending,(state)=> {
        //     state.loading = true;
        //     state.error = null;
        // })
        // .addCase(fetchUploadRegression.fulfilled,(state,action)=> {
        //     state.loading = false;
        //     state.error = null;
        //     console.log(action.payload)
        //     state.statistics.charts.push(action.payload);
        //
        // })
        // .addCase(fetchUploadRegression.rejected,(state, action)=> {
        //     state.loading = false;
        //     state.error = action.error.message || "Неизвестна грешка";
        // })
    }
})

export const { updateError, updateChartsWithChart } = statisticsSlice.actions;
export default statisticsSlice.reducer;




// export const fetchUploadCluster = createAsyncThunk<
//     ChartBase,
//     void,
//     { state: RootState }
// >(
//     'chartSlice/fetchUploadCluster',
//     async (_, { getState }) => {
//         try {
//             const state = getState();
//             if(!state.chartsData.file) throw Error('No file provided');
//             const formData = new FormData();
//             formData.append('file', state.chartsData.file);
//             // formData.append('inputValues', JSON.stringify(contextData.inputValues));
//             // formData.append('notes', contextData.notes);
//             const query = `${import.meta.env.VITE_API_STATISTICS_URL}/clustering`;
//             return await fetchFormDataAuth<ChartBase>(query, {
//                 method: 'POST',
//                 body: formData
//             });
//         } catch (error) {
//             throw new Error((error as Error).message);
//         }
//     }
// )
//
// export const fetchUploadCorrelation = createAsyncThunk<
//     ChartBase,
//     void,
//     { state: RootState }
// >(
//     'chartSlice/fetchUploadCorrelation',
//     async (_, { getState }) => {
//         try {
//             const state = getState();
//             if(!state.chartsData.file) throw Error('No file provided');
//             const formData = new FormData();
//             formData.append('file', state.chartsData.file);
//             // formData.append('inputValues', JSON.stringify(contextData.inputValues));
//             // formData.append('notes', contextData.notes);
//             const query = `${import.meta.env.VITE_API_STATISTICS_URL}/correlation`;
//             return await fetchFormDataAuth<ChartBase>(query, {
//                 method: 'POST',
//                 body: formData
//             });
//         } catch (error) {
//             throw new Error((error as Error).message);
//         }
//     }
// )
//
// export const fetchUploadRegression = createAsyncThunk<
//     ChartBase,
//     void,
//     { state: RootState }
// >(
//     'chartSlice/fetchUploadRegression',
//     async (_, { getState }) => {
//         try {
//             const state = getState();
//             if(!state.chartsData.file) throw Error('No file provided');
//             const formData = new FormData();
//             formData.append('file', state.chartsData.file);
//             // formData.append('inputValues', JSON.stringify(contextData.inputValues));
//             // formData.append('notes', contextData.notes);
//             const query = `${import.meta.env.VITE_API_STATISTICS_URL}/regression`;
//             return await fetchFormDataAuth<ChartBase>(query, {
//                 method: 'POST',
//                 body: formData
//             });
//         } catch (error) {
//             throw new Error((error as Error).message);
//         }
//     }
// )