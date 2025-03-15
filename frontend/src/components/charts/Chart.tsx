import Plot from "react-plotly.js";

// Heatmap Component
export function Heatmap({ z, values }: { z: number[][]; values: string[] }) {
    return (
        <Plot
            data={[
                {
                    z:z,
                    x: values,
                    y: values,
                    type: "heatmap",
                    colorscale: "Viridis",
                },
            ]}
            layout={{ title: "Heatmap Example" }}
        />
    );
}

// Histogram Component
export function StandardHistogramPlot({ x, name }: { x: number[]; name: string }) {
    return (
        <Plot
            data={[
                {
                    x,
                    name,
                    type: "histogram",
                },
            ]}
            layout={{ title: "Histogram Example" }}
        />
    );
}

// Pie Chart Component
export function StandardPiePlot({ values, labels }: { values: number[]; labels: string[] }) {
    return (
        <Plot
            data={[
                {
                    values,
                    labels,
                    type: "pie",
                },
            ]}
            layout={{ title: "Pie Chart Example" }}
        />
    );
}

// Scatter Plot Component
export function ScatterPlot({ data }: { data: { x: number[]; y: number[]; mode: string }[] }) {
    const plotData = Array.isArray(data) ? data : [];

    return (
        <Plot
            data={plotData.map((d) => ({
                x: d.x,
                y: d.y,
                mode: d.mode,
                type: "scatter",
            }))}
            layout={{ title: "Scatter Plot", yaxis: { title: "Values" } }}
        />
    );
}

// Grouped Bar Plot Component
export function GroupedBarPlot({ data }: { data: { x: string[]; y: number[]; name: string }[] }) {
    const plotData = Array.isArray(data) ? data : [];

    return (
        <Plot
            data={plotData.map((d) => ({
                x: d.x,
                y: d.y,
                name: d.name,
                type: "bar",
            }))}
            layout={{ title: "Grouped Bar Plot", yaxis: { title: "Values" } }}
        />
    );
}

// Stacked Bar Plot Component
export function StackedBarPlot({ data }: { data: { x: string[]; y: number[]; name: string }[] }) {
    const plotData = Array.isArray(data) ? data : [];

    return (
        <Plot
            data={plotData.map((d) => ({
                x: d.x,
                y: d.y,
                name: d.name,
                type: "bar",
            }))}
            layout={{ title: "Stacked Bar Plot", barmode: "stack" }}
        />
    );
}

// Standard Bar Plot Component
export function StandardBarPlot({ x, y }: { x: string[]; y: number[] }) {
    return (
        <Plot
            data={[
                {
                    x,
                    y,
                    type: "bar",
                },
            ]}
            layout={{ title: "Bar Plot", yaxis: { title: "Values" } }}
        />
    );
}

// Violin Plot Component
export function ViolinPlot({ y }: { y: number[] }) {
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
            layout={{ title: "Violin Plot", yaxis: { title: "Values" } }}
        />
    );
}