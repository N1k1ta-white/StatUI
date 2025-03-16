import DataTable from "@/components/descriptiveView/DataTable";
import {useSelector} from "react-redux";
import store, {RootState} from "@/store/store.ts";
import {fetchUploadCluster, fetchUploadStatistics, fetchUploadSuggestedCharts} from "@/store/statisticsSlice.ts";
import DefinedChart from "@/components/DefinedChart.tsx";
import {Button} from "@/components/ui/button.tsx";
import MethodSelection from "@/components/descriptiveView/MethodSuggestion.tsx";

// function transformClusters({data}: ChartInterfaceClustering) {
//     return Object.values(data).map(cluster => ({
//         x: cluster.map(point => point.x),
//         y: cluster.map(point => point.y),
//         mode: 'markers'
//     }));
// }

function VisualizationDatasetsPage() {
    const charts = useSelector((state: RootState) => state.chartsData.statistics.charts);
    const descriptive = useSelector((state: RootState) => state.chartsData.statistics.descriptiveStatistics);
    const handleGetDescriptiveStatistics = async () => {
        try {
            await store.dispatch(fetchUploadStatistics()).unwrap()
        } catch (error) {
            console.log((error as Error).message);
        }
    }
    const handleGeSuggestedCharts = async () => {
        try {
            await store.dispatch(fetchUploadSuggestedCharts()).unwrap()
        } catch (error) {
            console.log((error as Error).message);
        }
    }

     return (
         <div>
             <h1 className="text-xl font-bold pt-3 pb-3 text-left ">Visualization Datasets Page</h1>
             <div className="w-full gap-4 flex justify-start items-center mb-4">
                 <Button onClick={handleGetDescriptiveStatistics}>Upload Descriptive Statistics</Button>
                 <Button onClick={handleGeSuggestedCharts}>Upload Suggested Charts</Button>
             </div>
             <div className="w-full gap-4 flex justify-between items-start">
                 {descriptive && <>
                     <MethodSelection/>
                     <DataTable/>
                 </>}
             </div>
             {
                 charts.length > 0 && charts.map((chart, idx) => (
                     <div key={idx} className = "w-fit relative">
                         <DefinedChart chart={chart} key={idx} />
                     </div>
                 ))
             }


                 {/*cluster &&*/}
                 {/*<ScatterPlot*/}
                 {/*    data={transformClusters(cluster as ChartInterfaceClustering)}*/}
                 {/*    xAxisLabel = "X Axis Label"*/}
                 {/*    yAxisLabel = "Y Axis Label"*/}
                 {/*    title="Scatter Plot Example"*/}
                 {/*/>*/}
            {/*<Heatmap z={[[1, 20, 30], [20, 1, 60], [30, 60, 1]]} values_x={["A", "B", "C"]} values_y={["A", "B", "C"]} title="Heatmap Example" />*/}
            {/*/!*<StandardHistogramPlot x={[1, 2, 3, 4]} name="Histogram" title="Histogram Example" />*!/*/}
            {/*<StandardPiePlot values={[19, 26, 55]} labels={["A", "B", "C"]} title="Pie Chart Example" />*/}
            {/*<GroupedBarPlot*/}
            {/*    data={[*/}
            {/*        { x: ["A", "B", "C"], y: [10, 20, 30], name: "Group 1" },*/}
            {/*        { x: ["A", "B", "C"], y: [15, 25, 35], name: "Group 2" },*/}
            {/*    ]}*/}
            {/*    title="Grouped Bar Plot Example"*/}
            {/*/>*/}
            {/*<StackedBarPlot*/}
            {/*    data={[*/}
            {/*        { x: ["A", "B", "C"], y: [10, 20, 30], name: "Stack 1" },*/}
            {/*        { x: ["A", "B", "C"], y: [15, 25, 35], name: "Stack 2" },*/}
            {/*    ]}*/}
            {/*    title="Stacked Bar Plot Example"*/}
            {/*/>*/}
            {/*<StandardBarPlot x={["A", "B", "C"]} y={[10, 20, 30]} title="Bar Plot Example" />*/}
            {/*<ViolinPlot y={[2, 6, 2, 2, 2, 2, 6, 2]} title="Violin Plot Example" />*/}
            {/*<FunnelPlot x={[100, 80, 60, 40, 20]} y={["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"]} title="Funnel Plot Example" />*/}
            {/*<BubblePlot x={[1, 2, 3, 4]} y={[10, 11, 12, 13]} sizes={[40, 60, 80, 100]} title="Bubble Plot Example" />*/}
            {/*<DensityScatterPlot*/}
            {/*    x={[1, 2, 3,4, 5]}*/}
            {/*    y={[10, 11, 12, 13, 14]}*/}
            {/*    title="Density Scatter Plot Example"*/}
            {/*/>*/}
            {/*/!*For show case only*/ }
            {/* <Scatter3DPlot*/}
            {/*    csvUrl="https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv"*/}
            {/*    title="3D Scatter Plot Example"*/}
            {/*/>*/}
            
         </div>
     );
}

export default VisualizationDatasetsPage;