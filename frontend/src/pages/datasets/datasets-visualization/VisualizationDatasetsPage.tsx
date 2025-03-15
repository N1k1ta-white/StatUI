import {GroupedBarPlot, Heatmap, ScatterPlot, StackedBarPlot, StandardBarPlot, StandardHistogramPlot, StandardPiePlot, ViolinPlot} from "@/components/charts/Chart.tsx";


function VisualizationDatasetsPage() {


     return (
         <div>
             <h1 className="text-xl font-bold pt-3 pb-3 text-left ">VisualizationDatasetsPage</h1>

            <Heatmap z={[[1, 20, 30], [20, 1, 60], [30, 60, 1]]} values={["A", "B", "C"]} />
            <ViolinPlot y={[2, 6, 2, 2, 2, 2, 6, 2]} />

            <ScatterPlot
                data={[
                    { x: [1, 2, 3, 4], y: [10, 15, 13, 17], mode: "markers" },
                    { x: [2, 3, 4, 5], y: [16, 5, 11, 9], mode: "lines" },
                ]}
            />

            <StandardBarPlot
                x={["Apples", "Bananas", "Cherries"]}
                y={[10, 20, 30]}
            />

            <GroupedBarPlot
                data={[
                    { x: ["Giraffes", "Orangutans", "Monkeys"], y: [20, 14, 23], name: "SF Zoo" },
                    { x: ["Giraffes", "Orangutans", "Monkeys"], y: [12, 18, 29], name: "LA Zoo" },
                ]}
            />

            <StackedBarPlot
                data={[
                    { x: ["Cats", "Dogs", "Birds"], y: [10, 20, 30], name: "Pet Store A" },
                    { x: ["Cats", "Dogs", "Birds"], y: [15, 25, 35], name: "Pet Store B" },
                ]}
            />

            <StandardPiePlot
                values={[19, 26, 55]}
                labels={["Residential", "Non-Residential", "Utility"]}
            />

            <StandardHistogramPlot
                x={[1, 2, 2, 3, 3, 3, 4, 4, 4, 4]}
                name="Sample Histogram"
            />
         </div>
     );
}

export default VisualizationDatasetsPage;