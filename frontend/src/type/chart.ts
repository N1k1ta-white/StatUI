export interface chartReduxInterface {
    type: string;
    name: string;
    description: string;
}

interface DataPoint {
    x: number;
    y: number;
    [key: string]: string | number;
  }

export interface chartInterfaceCreateGraphicsResponse extends chartReduxInterface{
    data: DataPoint[];
}

export interface chartInterfaceClusteringResponse extends chartReduxInterface{
    data:[{[key: string]: { x: number; y: number }[]}]
}
export interface descriptiveResponse{
    [key: string]: {[key: string]: number};
}

  
export interface chartInterfaceCorrelationResponse extends chartReduxInterface {
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

  export interface chartInterfaceRegressionResponse  extends chartReduxInterface{
    type: "scatterPlot";
    points: { x: number; y: number }[];
    regression?: {
      x: number[];
      y: number[];
    };
  }

