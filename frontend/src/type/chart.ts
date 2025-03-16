interface DataPointNumbers {
    x: number;
    y: number;
    additionals?: {[key: string]: string };
}

interface DataPointStrings {
    x: string;
    y: string;
}
interface AnalysisMethodRequest {
    method: string,
    attributes_analysis: string[],
    expected_results: string[]
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
        correlationMatrix: number[][];
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

export interface ChartInterfacePie extends ChartBase {
    data:{
        values: number[];
        labels: string[];
        title:string;
    }
}

interface BarBase{
    x: string[];
    y: number[];
    name:string;
}

export interface ChartInterfaceBar extends ChartBase {
    data:{
        data: BarBase[];
        title:string;
    }
}

export interface ChartInterfaceRegression  extends ChartBase {
    data: {
        points: {x: number[], y: number[]};
        regression_line: {x: number[], y: number[]};
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
