import { chartInterfaceClusteringResponse, descriptiveResponse } from "@/type/chart";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
{/*MOCK*/}
export const defaultDescriptiveMockdata: descriptiveResponse = {
  Account_Age: { "25%": 30.0 },
  Fraudulent: { count: 51000.0, mean: 0.049216 },
  Number_of_Transactions_Last_24H: {
      "25%": 4.0,
      "50%": 7.0,
      "75%": 11.0,
      max: 14.0,
      mean: 7.495588,
      std: 4.02008,
    },
  Time_of_Transaction:
    {
      "25%": 5.0,
      "50%": 12.0,
      "75%": 17.0,
      count: 48448.0,
      mean: 11.4884,
    },
  Transaction_Amount:
    {
      "25%": 1270.5525,
      "50%": 2524.1,
      "75%": 3787.24,
      count: 48480.0,
      max: 49997.8,
      min: 5.03,
      std: 5043.932555,
    },
  ],
  User_ID: [
    {
      count: 51000.0,
    },
  ],
};

export const defaultClusteringMockdata: chartInterfaceClusteringResponse = {
  type: "scatter",
  name: "Sample Clustering",
  description: "This is a mock clustering response for testing purposes.",
  data: [
      {
          cluster1: [
              { x: 1.2, y: 3.4 },
              { x: 2.3, y: 4.5 },
              { x: 3.1, y: 5.6 },
          ],
          cluster2: [
              { x: 6.7, y: 8.9 },
              { x: 7.8, y: 9.1 },
              { x: 8.2, y: 10.3 },
          ],
          cluster3: [
              { x: 11.4, y: 13.5 },
              { x: 12.5, y: 14.6 },
              { x: 13.6, y: 15.7 },
          ],
      },
  ],
};
export function mapClusterResponseToScatterPlotData(input: chartInterfaceClusteringResponse): { x: number[]; y: number[]; mode: string }[] {
  const output: { x: number[]; y: number[]; mode: string }[] = [];

  input.data.forEach((obj) => {
    Object.entries(obj).forEach(([_, points]) => {
      const typedPoints = points as { x: number; y: number }[];
      const x = typedPoints.map((point) => point.x);
      const y = typedPoints.map((point) => point.y);
      output.push({ x, y, mode: "markers" });
    });
  });

  return output;
}
