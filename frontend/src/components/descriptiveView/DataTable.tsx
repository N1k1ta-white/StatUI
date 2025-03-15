import React, { useEffect } from 'react';
import { Card } from "@/components/ui/card.tsx";
import { useSelector } from 'react-redux';
import store, { RootState } from "@/store/store.ts";
import { descriptiveResponse } from '@/type/chart';

const renderTable = (data: descriptiveResponse) => {

  const statistics = new Set<string>();


    Object.keys(data).forEach((key) => {
      console.log(key);
      Object.keys(data[key][0]).forEach((stat) => {
        statistics.add(stat);
        console.log(stat);
      });
    });

  const statisticsArray = Array.from(statistics).sort();

  return (
    <table className="min-w-full table-auto border-collapse text-sm">
      <thead>
        <tr className="border-b-2">
          <th className="py-2 px-4 text-left font-medium text-gray-600">Statistic</th>
          {Object.keys(data).map((key) => (
            <th key={key} className="py-2 px-4 text-left font-medium text-gray-600">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {statisticsArray.map((stat) => (
          <tr key={stat} className="border-b">
            <td className="py-2 px-4 text-gray-800">{stat}</td>
            {Object.keys(data).map((key) => {
              const value = (data[key][0] as { [key: string]: number })[stat] ?? '-';
              return (
                <td key={key} className="py-2 px-4 text-gray-800">
                  {value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const DataTable: React.FC = () => {

  const descriptiveData = useSelector((state: RootState) => state.chartsData.descriptiveResponse);

  useEffect(() => {console.log(descriptiveData)},[descriptiveData])

  return (
    <div className="p-6 space-y-6">
      <Card className="p-4 shadow-lg rounded-lg border border-gray-200 bg-white max-w-5xl mx-auto">
        <div className="text-lg font-semibold mb-4 text-gray-700">Statistical Overview</div>
        {renderTable(descriptiveData)}
      </Card>
    </div>
  );
};

export default DataTable;