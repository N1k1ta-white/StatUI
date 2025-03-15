export interface ChartReduxInterface {
    type: string;
    name: string;
    description: string;
}

interface DataPoint {
    x: number;
    y: number;
    [key: string]: string | number;
  }

export interface ChartInterfaceCreateGraphics extends ChartReduxInterface{
    data: DataPoint[];
}

export interface ChartInterfaceClustering extends ChartReduxInterface{
    data:[{[key: string]: { x: number; y: number }[]}]
}
export interface descriptiveResponse{
    [key: string]: {[key: string]: number}[];
}

  
export interface ChartInterfaceCorrelation extends ChartReduxInterface {
    data: {
      heatMap?: {
        type: "heatMap";
        methodName: string;
        data: {
          variablesX: string[] 
		  variablesY: string[]
          matrix: number[][];
          pValues?: number[][];
        };
      };
      scatterPlot?: {
        type: "scatterPlot";
        points: {
          x_values: number[];
          y_values: number[];
        }[];
        correlation: number;
        p_value: number;
        regression?: {
          x: number[];
          y: number[];
        };
      };
    };
  }

  export interface ChartInterfaceRegression  extends ChartReduxInterface{
    type: "scatterPlot";
    points: { x: number; y: number }[];
    regression?: {
      x: number[];
      y: number[];
    };
  }

