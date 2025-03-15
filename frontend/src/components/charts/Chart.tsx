import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

// Heatmap Component
export function Heatmap({ z, values_x,values_y, title }: { z: number[][]; values_x: string[];values_y: string[]; title: string }) {
    return (
        <Plot
            data={[
                {
                    z,
                    x: values_x,
                    y: values_y,
                    type: "heatmap",
                    colorscale: "Viridis",
                },
            ]}
            layout={{ title: { text: title } }}
        />
    );
}

// Histogram Component
export function StandardHistogramPlot({ x, title }: { x: number[];  title: string }) {
    return (
        <Plot
            data={[
                {
                    x,
                    type: "histogram",
                },
            ]}
            layout={{ title: { text: title } }}
        />
    );
}

// Pie Chart Component
export function StandardPiePlot({ values, labels, title }: { values: number[]; labels: string[]; title: string }) {
    return (
        <Plot
            data={[
                {
                    values,
                    labels,
                    type: "pie",
                },
            ]}
            layout={{ title: { text: title } }}
        />
    );
}

// Scatter Plot Component
export function ScatterPlot({ data, title, xAxisLabel, yAxisLabel,}: {
    data: { x: number[]; y: number[]; mode: string }[];
    title: string;
    xAxisLabel: string;
    yAxisLabel: string;
}) {
    return (
        <Plot
            data={data.map((d) => ({
                x: d.x,
                y: d.y,
                mode: d.mode,
                type: "scatter",
            }))}
            layout={{
                title: { text: title },
                xaxis: { title: { text: xAxisLabel } }, // Label for x-axis
                yaxis: { title: { text: yAxisLabel } }, // Label for y-axis
            }}
        />
    );
}

// Grouped Bar Plot Component
export function GroupedBarPlot({ data, title }: { data: { x: string[]; y: number[]; name: string }[]; title: string }) {
    const plotData = Array.isArray(data) ? data : [];

    return (
        <Plot
            data={plotData.map((d) => ({
                x: d.x,
                y: d.y,
                name: d.name,
                type: "bar",
            }))}
            layout={{ title: { text: title }}}
        />
    );
}

// Stacked Bar Plot Component
export function StackedBarPlot({ data, title }: { data: { x: string[]; y: number[]; name: string }[]; title: string }) {
    const plotData = Array.isArray(data) ? data : [];

    return (
        <Plot
            data={plotData.map((d) => ({
                x: d.x,
                y: d.y,
                name: d.name,
                type: "bar",
            }))}
            layout={{ title: { text: title }, barmode: "stack" }}
        />
    );
}

// Standard Bar Plot Component
export function StandardBarPlot({ x, y, title }: { x: string[]; y: number[]; title: string }) {
    return (
        <Plot
            data={[
                {
                    x,
                    y,
                    type: "bar",
                },
            ]}
            layout={{ title: { text: title }, yaxis: { title: "Values" } }}
        />
    );
}

// Violin Plot Component
export function ViolinPlot({ y, title }: { y: number[]; title: string }) {
    return (
        <Plot
            data={[
                {
                    type: "violin",
                    y,
                    box: { visible: true },
                    meanline: { visible: true },
                    points: "all",
                    jitter: 0.3,
                    marker: { color: "blue" },
                },
            ]}
            layout={{ title: { text: title }, yaxis: { title: "Values" } }}
        />
    );
}

// Funnel Plot Component
export function FunnelPlot({ x, y, title }: { x: number[]; y: string[]; title: string }) {
    return (
        <Plot
            data={[
                {
                    type: "funnel",
                    x,
                    y,
                },
            ]}
            layout={{
                title: { text: title },
                margin: { l: 150 },
                width: 600,
                height: 500,
            }}
        />
    );
}

// Bubble Plot Component
export function BubblePlot({ x, y, sizes, title }: { x: number[]; y: number[]; sizes: number[]; title: string }) {
    return (
        <Plot
            data={[
                {
                    x,
                    y,
                    mode: "markers",
                    marker: {
                        size: sizes,
                    },
                },
            ]}
            layout={{
                title: { text: title },
                showlegend: true,
                height: 600,
                width: 600,
            }}
        />
    );
}

export function DensityScatterPlot({
    x,
    y,
    title,
}: {
    x: number[];
    y: number[];
    title: string;
}) {
    return (
        <Plot
            data={[
                {
                    x,
                    y,
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
                    x,
                    y,
                    name: "density",
                    ncontours: 20,
                    colorscale: "Hot",
                    reversescale: true,
                    showscale: false,
                    type: "histogram2dcontour",
                },
                {
                    x,
                    name: "x density",
                    marker: { color: "rgb(102,0,0)" },
                    yaxis: "y2",
                    type: "histogram",
                },
                {
                    y,
                    name: "y density",
                    marker: { color: "rgb(102,0,0)" },
                    xaxis: "x2",
                    type: "histogram",
                },
            ]}
            layout={{
                title: { text: title },
                showlegend: false,
                autosize: false,
                width: 600,
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

            const trace1 = {
                x: unpack("x1"),
                y: unpack("y1"),
                z: unpack("z1"),
                mode: "markers",
                marker: {
                    size: 8,
                    line: {
                        color: "rgba(217, 217, 217, 0.14)",
                        width: 0.5,
                    },
                    opacity: 0.8,
                },
                type: "scatter3d",
            };

            const trace2 = {
                x: unpack("x2"),
                y: unpack("y2"),
                z: unpack("z2"),
                mode: "markers",
                marker: {
                    color: "rgb(127, 127, 127)",
                    size: 8,
                    symbol: "circle",
                    line: {
                        color: "rgb(204, 204, 204)",
                        width: 1,
                    },
                    opacity: 0.8,
                },
                type: "scatter3d",
            };

            setData([trace1, trace2]);
        }

        fetchData();
    }, [csvUrl]);

    const layout = {
        title: { text: title },
        margin: { l: 1, r: 2, b: 1, t: 0 },
    };

    return <Plot data={data} layout={layout} />;
}