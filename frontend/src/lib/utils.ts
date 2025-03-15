import { descriptiveResponse } from "@/type/chart";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const defaultDescriptiveMockdata: descriptiveResponse = {
  Account_Age: [
    {
      "25%": 30.0,
      "50%": 60.0,
      "75%": 90.0,
      count: 51000.0,
      max: 119.0,
      mean: 60.033902,
      min: 1.0,
      std: 34.384131,
    },
  ],
  Fraudulent: [
    {
      count: 51000.0,
      mean: 0.049216,
    },
  ],
  Number_of_Transactions_Last_24H: [
    {
      "25%": 4.0,
      "50%": 7.0,
      "75%": 11.0,
      max: 14.0,
      mean: 7.495588,
      std: 4.02008,
    },
  ],
  Time_of_Transaction: [
    {
      "25%": 5.0,
      "50%": 12.0,
      "75%": 17.0,
      count: 48448.0,
      mean: 11.4884,
    },
  ],
  Transaction_Amount: [
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