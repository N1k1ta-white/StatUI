import {Heatmap, ViolinPlot} from "@/components/charts/Chart.tsx";


function VisualizationDatasetsPage() {
     return (
         <div>
              <h1 className="text-xl font-bold pt-3 pb-3 text-left ">VisualizationDatasetsPage</h1>

             <Heatmap/>
             <ViolinPlot/>
         </div>
     );
}

export default VisualizationDatasetsPage;