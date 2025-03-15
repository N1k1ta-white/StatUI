import React, {useEffect, useState} from 'react';
import { Card } from "@/components/ui/card.tsx";
import { useSelector } from 'react-redux';
import { RootState } from "@/store/store.ts";
import { DescriptiveStatistics } from '@/type/chart';

type Props = {
    data: DescriptiveStatistics;
}
const StatisticsTable = ({data} : Props) => {
    const [statistics, setStatistics] = useState<{ map: Set<string>; array: string[] }>({
        map: new Set(),
        array: [],
    });

    useEffect(() => {
        const newStatistics = new Set<string>();

        Object.keys(data).forEach((key) => {
            Object.keys(data[key]).forEach((stat) => {
                newStatistics.add(stat);
            });
        });

        setStatistics({
            map: newStatistics,
            array: Array.from(newStatistics).sort(), // Используем `newStatistics`, а не `statistics`
        });
    }, [data]);

    return (
        <div className="w-full overflow-auto">
            <table className="min-w-full border-collapse text-sm">
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
                    {statistics.array.map((stat) => (
                        <tr key={stat} className="border-b">
                            <td className="py-2 px-4 text-gray-800">{stat}</td>
                            {Object.keys(data).map((key) => {
                                const value = (data[key])[stat] ?? '-';
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
      </div>
  );
};

const DataTable: React.FC = () => {
    const descriptiveData = useSelector((state: RootState) => state.chartsData.statistics.descriptiveStatistics);
    return (
        <>
            {
                descriptiveData &&
                <div className="space-y-6">
                    <Card className="w-full p-4 shadow-lg rounded-lg border border-gray-200 bg-white">
                        <div className="text-lg font-semibold mb-4 text-gray-700">Statistical Overview</div>
                        <StatisticsTable data={descriptiveData}/>
                    </Card>
                </div>
            }
        </>
    );
};

export default DataTable;