import { BarBase, ChartBase, ChartInterfaceBar, ChartInterfaceClustering, ChartInterfaceHeatMap, ChartInterfacePie, ChartInterfaceRegression, FunnelPlotChartInterface, ViolinHistogramChartInterface } from "@/type/chart";
import { FunnelPlot, GroupedBarPlot, Heatmap, ScatterPlot, StackedBarPlot, StandardBarPlot, StandardPiePlot, ViolinPlot } from "./charts/Chart";
import Hint from "@/components/Hint.tsx";

interface Props {
    chart: ChartBase
}
function transformClusters({data}: ChartInterfaceClustering) {
    return Object.values(data).map(cluster => ({
        x: cluster.map(point => point.x),
        y: cluster.map(point => point.y),
        mode: 'markers'
    }));
}

export default function DefinedChart({chart}: Props) {
    return (
        <>
            {
                (() => {

                    switch (chart.type) {
                        case "heatmap": {
                            const heatmapData = chart as ChartInterfaceHeatMap;
                            const mappedData = {
                                z: heatmapData.data.correlationMatrix || [],
                                values: heatmapData.data.values|| [],
                                title: heatmapData.name || "heatmap",
                            }

                            return (
                                <>
                                    <Hint mappedData={mappedData} metaData={chart}/>
                                    <Heatmap mappedData={mappedData} metaData={chart}/>
                                </>
                            )
                        }
                        case "cluster": {
                            const clusteringData = chart as ChartInterfaceClustering;
                            // const preProcessData : { x: number[]; y: number[]; mode: string }[] = Object.values(clusteringData).map((cluster: { x: number; y: number }[]) => ({
                            //     x: cluster.map((point: { x: number; y: number }) => point.x),
                            //     y: cluster.map((point: { x: number; y: number }) => point.y),
                            //     mode: 'markers'
                            // }));
                            const mappedData = {
                                data: transformClusters(clusteringData),
                                title:clusteringData.name
                            }

                            return (
                                <>
                                    <Hint mappedData={mappedData} metaData={chart}/>
                                    <ScatterPlot mappedData={mappedData} metaData={chart}/>
                                </>
                            )
                        }
                        case "regression": {
                            const regressionData = chart as ChartInterfaceRegression;
                            const markers = {...regressionData.data.points, mode: 'markers'};
                            const regression = {...regressionData.data.regression_line, mode: 'lines'};
                            // const markers = {
                            //     x: regressionData.data.points.x,
                            //     y: regressionData.data.points.y,
                            //     mode: 'markers'
                            // };
                            // const regression = {
                            //     x: regressionData.data.regressionLine.x,
                            //     y: regressionData.data.regressionLine.y,
                            //     mode: 'lines'
                            // };
                            const mappedData = {
                                data: [markers, regression],
                                title: regressionData.name
                            };
                            console.log(regressionData)

                            return (
                                <>
                                    <Hint mappedData={mappedData} metaData={chart}/>
                                    <ScatterPlot mappedData={mappedData} metaData={chart}/>
                                </>
                            )
                        }
                        case "pie": {
                            const pieData = chart as ChartInterfacePie;
                            return (
                                <>
                                    <Hint mappedData={pieData} metaData={chart}/>
                                    <StandardPiePlot mappedData={pieData} metaData={chart}/>
                                </>
                            )
                        }
                        case "stackbar": {
                            const barData = chart as ChartInterfaceBar;
                            return (
                                <>
                                    <Hint mappedData={barData} metaData={chart}/>
                                    <StackedBarPlot mappedData={barData} metaData={chart}/>
                                </>
                            )
                        }
                        case "groupbar": {
                            const barData = chart as ChartInterfaceBar;
                            return (
                                <>
                                    <Hint mappedData={barData} metaData={chart}/>
                                    <GroupedBarPlot mappedData={barData} metaData={chart}/>
                                </>
                            )
                        }
                        case "bar": {
                            const barData = chart as BarBase;
                            return (
                                <>
                                    <Hint mappedData={barData} metaData={chart}/>
                                    <StandardBarPlot mappedData={barData} metaData={chart}/>
                                </>
                            )
                        }
                        case "violin":{
                            const violinData = chart as ViolinHistogramChartInterface;
                            return (
                                <>
                                    <Hint mappedData={violinData} metaData={chart}/>
                                    <ViolinPlot mappedData={violinData} metaData={chart}/>
                                </>
                            )
                        }
                        case "histogram":{
                            const histoData = chart as ViolinHistogramChartInterface;
                            return (
                                <>
                                    <Hint mappedData={histoData} metaData={chart}/>
                                    <ViolinPlot mappedData={histoData} metaData={chart}/>
                                </>
                            )
                        }
                        case "funnel":{
                            const funelData = chart as FunnelPlotChartInterface;
                            return (
                                <>
                                    <Hint mappedData={funelData} metaData={chart}/>
                                    <FunnelPlot mappedData={funelData} metaData={chart}/>
                                </>
                            )
                        }
                        



                        

                        default: return <> </>
                    }
                })()
            }
        </>
    );
}