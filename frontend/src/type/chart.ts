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
    type: string;
    name: string;
    description: string;
}

// export interface ChartInterfaceCreateGraphics extends ChartBase {
//     data: DataPoint[];
// }

export interface ChartInterfaceClustering extends ChartBase {
    data: {
        [key: string]: { x: number; y: number }[]
    }
}

export interface ChartInterfaceHeatMap extends ChartBase {
    data: {
        methodName: string;
        values: string[]
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

export interface ChartInterfaceCorrelation extends ChartBase {
    data: {
        heatMap?: ChartInterfaceHeatMap
        scatterPlot?: ChartInterfaceScatterPlot;
    };
}

export interface ChartInterfaceRegression  extends ChartBase {
    data: {
        points: {x: number[], y: number[]};
        regressionLine: {x: number[], y: number[]};
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
