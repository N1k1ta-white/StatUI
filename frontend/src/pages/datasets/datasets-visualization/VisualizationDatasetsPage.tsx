import {BubblePlot, DensityScatterPlot, FunnelPlot, GroupedBarPlot, Heatmap, ScatterPlot, StackedBarPlot, StandardBarPlot, StandardHistogramPlot, StandardPiePlot, ViolinPlot, Scatter3DPlot} from "@/components/charts/Chart.tsx";
import DataTable from "@/components/descriptiveView/DataTable";
import { defaultClusteringMockdata,mapClusterResponseToScatterPlotData } from "@/lib/utils";
import { useEffect } from "react";
import {ChartBase, ChartInterfaceClustering, ChartInterfaceCorrelation, ChartInterfaceHeatMap, ChartInterfaceRegression, ChartInterfaceScatterPlot, StatisticsStore} from "@/type/chart.ts";
import {useSelector} from "react-redux";
import store, {RootState} from "@/store/store.ts";
import {fetchUploadCluster} from "@/store/statisticsSlice.ts";



function transformClusters({data}: ChartInterfaceClustering) {
    return Object.values(data).map(cluster => ({
        x: cluster.map(point => point.x),
        y: cluster.map(point => point.y),
        mode: 'markers'
    }));
}

function Real(response: ChartBase): any {
    switch (response.type) {
      case "Heatmap":
        { const heatmapData = response as ChartInterfaceHeatMap;
        return {
          z: heatmapData.data.matrix || [],
          values: heatmapData.data.points.map(point => point.x) || [],
          values_y: heatmapData.data.points.map(point => point.y) || [],
          title: heatmapData.name || "Heatmap",
        }; }

      case "Clustering":
        { const clusteringData = response as ChartInterfaceClustering;
        return Object.entries(clusteringData.data).map(([_, points]) => ({
          x: points.map(point => point.x),
          y: points.map(point => point.y),
          mode: "markers",
        })); }

      case "ScatterPlot":
        { const scatterData = response as ChartInterfaceScatterPlot;
        return {
          x: scatterData.data.points.map(group => group.map(point => point.x)).flat(),
          y: scatterData.data.points.map(group => group.map(point => point.y)).flat(),
          regression: scatterData.data.regression || [],
          correlation: scatterData.data.correlation,
          p_value: scatterData.data.p_value,
          title: scatterData.name || "Scatter Plot",
        }; }

      case "Correlation":
        { const correlationData = response as ChartInterfaceCorrelation;
        return {
          heatmap: correlationData.data.heatMap ? mapBackendDataToChart(correlationData.data.heatMap) : null,
          scatterPlot: correlationData.data.scatterPlot ? mapBackendDataToChart(correlationData.data.scatterPlot) : null,
        }; }

      case "Regression":
        { const regressionData = response as ChartInterfaceRegression;
        return {
          x: regressionData.data.points.map(point => point.x),
          y: regressionData.data.points.map(point => point.y),
          regression: regressionData.data.regression || [],
          title: regressionData.name || "Regression Analysis",
        }; }

      default:
        console.warn("Unknown chart type:", response.type);
        return null;
    }
  }


function VisualizationDatasetsPage() {
    const cluster = useSelector((state: RootState) => state.chartsData.statistics.charts.find(chart => chart.type === "cluster"));
    useEffect(() => {
        store.dispatch(fetchUploadCluster())
    }, []);
     return (
         <div>
             <h1 className="text-xl font-bold pt-3 pb-3 text-left ">VisualizationDatasetsPage</h1>
             <DataTable/>
             {
                 cluster &&
                 <ScatterPlot
                     data={transformClusters(cluster as ChartInterfaceClustering)}
                     xAxisLabel = "X Axis Label"
                     yAxisLabel = "Y Axis Label"
                     title={cluster.name}
                 />
             }
            <Heatmap z={[[1, 20, 30], [20, 1, 60], [30, 60, 1]]} values_x={["A", "B", "C"]} values_y={["A", "B", "C"]} title="Heatmap Example" />
            <StandardHistogramPlot x={[1, 2, 3, 4]} name="Histogram" title="Histogram Example" />
            <StandardPiePlot values={[19, 26, 55]} labels={["A", "B", "C"]} title="Pie Chart Example" />
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