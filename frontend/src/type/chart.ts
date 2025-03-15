<<<<<<< HEAD
export interface chartReduxInterface {
=======
interface DataPointNumbers {
    x: number;
    y: number;
    additionals?: {[key: string]: string };
}

interface DataPointStrings {
    x: string;
    y: string;
}

export interface ChartBase {
>>>>>>> 440095f37fd0e0bf44481123942d989165331e5a
    type: string;
    name: string;
    description: string;
}

// export interface ChartInterfaceCreateGraphics extends ChartBase {
//     data: DataPoint[];
// }

<<<<<<< HEAD
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
=======
export interface ChartInterfaceClustering extends ChartBase {
    data: {
        [key: string]: { x: number; y: number }[]
    }
}

export interface ChartInterfaceHeatMap extends ChartBase {
>>>>>>> 440095f37fd0e0bf44481123942d989165331e5a
    data: {
        methodName: string;
        points: DataPointStrings[]
        matrix: number[][];
        pValues?: number[][];
    };
}

export interface ChartInterfaceScatterPlot extends ChartBase {
    data: {
        points: DataPointNumbers[][];
        correlation: number;
        p_value: number;
        regression?: DataPointNumbers[];
    };
}

<<<<<<< HEAD
  export interface chartInterfaceRegressionResponse  extends chartReduxInterface{
    type: "scatterPlot";
    points: { x: number; y: number }[];
    regression?: {
      x: number[];
      y: number[];
=======
export interface ChartInterfaceCorrelation extends ChartBase {
    data: {
        heatMap?: ChartInterfaceHeatMap
        scatterPlot?: ChartInterfaceScatterPlot;
>>>>>>> 440095f37fd0e0bf44481123942d989165331e5a
    };
}

export interface ChartInterfaceRegression  extends ChartBase {
    data: {
        points: DataPointNumbers[];
        regression?: DataPointNumbers[];
    }
}


export interface DescriptiveStatistics {
    [key: string]: {[key: string]: number}
}

export interface StatisticsStore {
    fileId: string | null;
    fileName: string | null;
    descriptiveStatistics: DescriptiveStatistics | null,
    charts: ChartBase[]
}
