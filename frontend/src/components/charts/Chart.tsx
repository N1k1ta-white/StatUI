import { ChartBase } from "@/type/chart";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";


interface HeatMapProps {
    mappedData:{
        z: number[][];
        values: string[]
        title:string;
    }
    metaData:ChartBase;
}
// Heatmap Component
export function Heatmap({ mappedData,metaData }: HeatMapProps) {
    return (

            <Plot
                data={[
                    {
                        z: mappedData.z,
                        x: mappedData.values,
                        y: mappedData.values,
                        type: "heatmap",
                        colorscale: "Viridis",
                    },
                ]}
                layout={{ title: { text: mappedData.title } }}
            />
    );
}

interface StandardHistogramProps {
    mappedData:{
        x: number[];
        title:string;
    }
    metaData:ChartBase;
}

// Histogram Component
export function StandardHistogramPlot({ mappedData, metaData }: StandardHistogramProps) {
    return (
        <Plot
            data={[
                {
                    x: mappedData.x,
                    type: "histogram",
                },
            ]}
            layout={{ title: { text: mappedData.title } }}
        />
    );
}
interface StandardPieProps {
    mappedData:{
        values: number[];
        labels: string[];
        title:string;
    }
    metaData:ChartBase;
}

// Pie Chart Component
export function StandardPiePlot({ mappedData, metaData }: StandardPieProps) {
    return (
        <Plot
            data={[
                {
                    values:mappedData.values,
                    labels:mappedData.labels,
                    type: "pie",

                },
            ]}
            layout={{ title: { text: mappedData.title } }}
        />
    );
}


interface ScatteredPlotProps {
    mappedData:{
        data: { x: number[]; y: number[]; mode: string }[];
        title:string;
    }
    metaData:ChartBase;
}


// Scatter Plot Component
export function ScatterPlot({ mappedData,metaData}: ScatteredPlotProps) {
    return (
        <Plot
            data={mappedData.data.map((d) => ({
                x: d.x,
                y: d.y,
                mode: d.mode,
                type: "scatter",
            }))}
            layout={{
                title: { text: mappedData.title },
                xaxis: { title: "X Axis" },
                yaxis: { title: "Y Axis" },
            }}
        />
    );
}


interface BarBase{
    x: string[];
    y: number[];
    name:string;
}


interface BarPlotProps {
    mappedData:{
        data: BarBase[];
        title:string;
    }
    metaData:ChartBase;
}


// Grouped Bar Plot Component
export function GroupedBarPlot({ mappedData,metaData}: BarPlotProps) {
    const plotData = Array.isArray(mappedData.data) ? mappedData.data : [];

    return (
        <Plot
            data={plotData.map((d) => ({
                x: d.x,
                y: d.y,
                name: d.name,
                type: "bar",
            }))}
            layout={{ title: { text: mappedData.title }}}
        />
    );
}

// Stacked Bar Plot Component
export function StackedBarPlot({ mappedData,metaData}: BarPlotProps) {
    const plotData = Array.isArray(mappedData.data) ? mappedData.data : [];

    return (
        <Plot
            data={plotData.map((d) => ({
                x: d.x,
                y: d.y,
                name: d.name,
                type: "bar",
            }))}
            layout={{ title: { text: mappedData.title }, barmode: "stack" }}
        />
    );
}

// Standard Bar Plot Component
export function StandardBarPlot({ mappedData, metaData }: { mappedData: BarBase; metaData: ChartBase }) {
    return (
        <Plot
            data={[
                {
                    x: mappedData.x,
                    y: mappedData.y,
                    type: "bar",
                },
            ]}
            layout={{ title: { text: mappedData.name } }}
        />
    );
}


interface ViolinPlotProps {
    mappedData:{
        y: number[];
        title:string;
    }
    metaData:ChartBase;
}
// Violin Plot Component
export function ViolinPlot({ mappedData,metaData}: ViolinPlotProps ) {
    return (
        <Plot
            data={[
                {
                    type: "violin",
                    y: mappedData.y,
                    box: { visible: true },
                    meanline: { visible: true },
                    points: "all",
                    jitter: 0.3,
                    marker: { color: "blue" },
                },
            ]}
            layout={{ title: { text: mappedData.title } }}
        />
    );
}


interface FunnelPlotProps {
    mappedData:{
        x: number[];
        y: string[];
        title:string;
    }
    metaData:ChartBase;
}
// Funnel Plot Component
export function FunnelPlot({ mappedData,metaData}: FunnelPlotProps) {
    return (
        <Plot
            data={[
                {
                    type: "funnel",
                    x: mappedData.x,
                    y: mappedData.y,
                },
            ]}
            layout={{
                title: { text: mappedData.title },
                margin: { l: 150 },
                width: 600,
                height: 500,
            }}
        />
    );
}

interface BubblePlotProps {
    mappedData:{
        x: number[];
        y: number[];
        sizes: number[];
        title:string;
    }
    metaData:ChartBase;
}

// Bubble Plot Component
export function BubblePlot({ mappedData,metaData}: BubblePlotProps) {
    return (
        <Plot
            data={[
                {
                    x: mappedData.x,
                    y: mappedData.y,
                    mode: "markers",
                    marker: {
                        size: mappedData.sizes,
                    },
                },
            ]}
            layout={{
                title: { text: mappedData.title },
                showlegend: true,
                height: 600,
                width: 600,
            }}
        />
    );
}


interface DensityPlotProps {
    mappedData:{
        x: number[];
        y: number[];
        title:string;
    }
    metaData:ChartBase;
}


export function DensityScatterPlot({mappedData,metaData}: DensityPlotProps) {
    return (
        <Plot
            data={[
                {
                    x: mappedData.x,
                    y: mappedData.y,
                    mode: "markers",
                    name: "points",
                    marker: {
                        color: "rgb(102,0,0)",
                        size: 2,
                        opacity: 0.4,
                    },
                    type: "scatter",
                },
                {
                    x: mappedData.x,
                    y: mappedData.y,
                    name: "density",
                    ncontours: 20,
                    colorscale: "Hot",
                    reversescale: true,
                    showscale: false,
                    type: "histogram2dcontour",
                },
                {
                    x: mappedData.x,
                    name: "x density",
                    marker: { color: "rgb(102,0,0)" },
                    yaxis: "y2",
                    type: "histogram",
                },
                {
                    y: mappedData.y,
                    name: "y density",
                    marker: { color: "rgb(102,0,0)" },
                    xaxis: "x2",
                    type: "histogram",
                },
            ]}
            layout={{
                title: { text: mappedData.title },
                showlegend: false,
                autosize: true,
                width: 500,
                height: 550,
                margin: { t: 50 },
                hovermode: "closest",
                bargap: 0,
                xaxis: {
                    domain: [0, 0.85],
                    showgrid: false,
                    zeroline: false,
                },
                yaxis: {
                    domain: [0, 0.85],
                    showgrid: false,
                    zeroline: false,
                },
                xaxis2: {
                    domain: [0.85, 1],
                    showgrid: false,
                    zeroline: false,
                },
                yaxis2: {
                    domain: [0.85, 1],
                    showgrid: false,
                    zeroline: false,
                },
            }}
        />
    );
}

// 3D Scatter Plot Component for showcase only
export function Scatter3DPlot({ csvUrl, title }: { csvUrl: string; title: string }) {
    const [data, setData] = useState<{ x: number[]; y: number[]; z: number[]; mode: string; marker: unknown; type: string }[]>([]);

    useEffect(() => {
        async function fetchData() {

            const response = await fetch(csvUrl);
            const text = await response.text();
            const rows = text.split("\n").map((row) => row.split(","));
            const headers = rows[0];
            const unpack = (key: string) => rows.slice(1).map((row) => parseFloat(row[headers.indexOf(key)]));

            const code = {
                x: unpack("x1"),
                y: unpack("y1"),
                z: unpack("z1"),
                mode: "lines+markers",
                marker: {
                    size: 8,
                    line: {
                        color: "rgba(217, 217, 217, 0.14)",
                        width: 0.2,
                    },
                    opacity: 0.8,
                },
                type: "scatter3d",
            };

            const science = {
                x: unpack("x2"),
                y: unpack("y2"),
                z: unpack("z2"),
                mode: "",
                marker: {
                    color: "rgb(127, 127, 127)",
                    size: 8,
                    symbol: "circle",
                    line: {
                        color: "rgb(204, 204, 204)",
                        width: 0.8,
                    },
                    opacity: 0.8,
                },
                type: "scatter3d",
            };

            setData([code, science]);
        }

        fetchData();
    }, [csvUrl]);

    const layout = {
        title: { text: title },
        margin: { l: 0, r: 0, b: 0, t: 0 },
    };

    return <Plot data={data} layout={layout} />;
}