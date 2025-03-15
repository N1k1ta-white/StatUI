import {BubblePlot, DensityScatterPlot, FunnelPlot, GroupedBarPlot, Heatmap, ScatterPlot, StackedBarPlot, StandardBarPlot, StandardHistogramPlot, StandardPiePlot, ViolinPlot, Scatter3DPlot} from "@/components/charts/Chart.tsx";


function VisualizationDatasetsPage() {
     return (
         <div>
             <h1 className="text-xl font-bold pt-3 pb-3 text-left ">VisualizationDatasetsPage</h1>

            <Heatmap z={[[1, 20, 30], [20, 1, 60], [30, 60, 1]]} values={["A", "B", "C"]} title="Heatmap Example" />
            <StandardHistogramPlot x={[1, 2, 3, 4]} name="Histogram" title="Histogram Example" />
            <StandardPiePlot values={[19, 26, 55]} labels={["A", "B", "C"]} title="Pie Chart Example" />
            <ScatterPlot
                data={[
                    { x: [1, 2, 3], y: [10, 15, 13], mode: "markers" },
                    { x: [2, 3, 4], y: [16, 5, 11], mode: "lines" },
                ]}
                title="Scatter Plot Example"
            />
            <GroupedBarPlot
                data={[
                    { x: ["A", "B", "C"], y: [10, 20, 30], name: "Group 1" },
                    { x: ["A", "B", "C"], y: [15, 25, 35], name: "Group 2" },
                ]}
                title="Grouped Bar Plot Example"
            />
            <StackedBarPlot
                data={[
                    { x: ["A", "B", "C"], y: [10, 20, 30], name: "Stack 1" },
                    { x: ["A", "B", "C"], y: [15, 25, 35], name: "Stack 2" },
                ]}
                title="Stacked Bar Plot Example"
            />
            <StandardBarPlot x={["A", "B", "C"]} y={[10, 20, 30]} title="Bar Plot Example" />
            <ViolinPlot y={[2, 6, 2, 2, 2, 2, 6, 2]} title="Violin Plot Example" />
            <FunnelPlot x={[100, 80, 60, 40, 20]} y={["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"]} title="Funnel Plot Example" />
            <BubblePlot x={[1, 2, 3, 4]} y={[10, 11, 12, 13]} sizes={[40, 60, 80, 100]} title="Bubble Plot Example" />
            <DensityScatterPlot
                x={[1, 2, 3,4, 5]}
                y={[10, 11, 12, 13, 14]}
                title="Density Scatter Plot Example"
            />
            {/*For show case only*/ }
             <Scatter3DPlot
                csvUrl="https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv"
                title="3D Scatter Plot Example"
            />
         </div>
     );
}

export default VisualizationDatasetsPage;