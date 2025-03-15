import Plot from "react-plotly.js";

export function Heatmap() {
    return (
        <Plot
            data={[
                {
                    z: [
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9]
                    ],
                    x: ["A", "B", "C"],
                    y: ["X", "Y", "Z"],
                    type: "heatmap",
                    colorscale: "Viridis", // "Greys", "YlGnBu", "RdBu", etc.
                },
            ]}
            layout={{ title: "Heatmap Example" }}
        />
    );
}

export function ViolinPlot() {
    return (
        <Plot
            data={[
                {
                    type: "violin",
                    y: [12, 14, 15, 19, 22, 24, 25, 27, 29, 30, 31],
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
