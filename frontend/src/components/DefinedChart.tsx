import { ChartBase, ChartInterfaceClustering, ChartInterfaceHeatMap, ChartInterfaceRegression } from "@/type/chart";
import { Heatmap, ScatterPlot } from "./charts/Chart";
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
                                z: heatmapData.data.matrix || [],
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
                            const markers = {...regressionData.data.points,mode: 'markers'};
                            const regression = {...regressionData.data.regressionLine,mode: 'lines'};
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

                            return (
                                <>
                                    <Hint mappedData={mappedData} metaData={chart}/>
                                    <ScatterPlot mappedData={mappedData} metaData={chart}/>
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