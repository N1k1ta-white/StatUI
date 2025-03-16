import React, {useEffect, useState} from 'react';
import { Card } from "@/components/ui/card.tsx";
import { useSelector } from 'react-redux';
import { RootState } from "@/store/store.ts";
import { DescriptiveStatistics } from '@/type/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        <div className="max-w-screen-xl overflow-auto">
            <table className=" border-collapse text-sm">
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

type CustomSelectProps = {
    options: string[];
    onChange: (value: string) => void;
    defaultValue?: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange, defaultValue }) => {
    return (
        <Select onValueChange={onChange} defaultValue={defaultValue}>
            <SelectTrigger className="w-[200px] ml-auto border rounded-lg p-2 text-gray-700">
                <SelectValue placeholder="Выберите значение" />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

const DataTable: React.FC = () => {
    const fileName = useSelector((state: RootState) => state.chartsData.statistics.fileName);
    const descriptiveData = useSelector((state: RootState) => state.chartsData.statistics.descriptiveStatistics);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [checkboxes, setCheckboxes] = useState<{colId: string, checked: boolean}[]>([]);
    useEffect(() => {
        if(descriptiveData)
            setCheckboxes(
                Object.keys(descriptiveData).map((key) => ({
                    colId: key,  // ключ объекта
                    checked: false,  // начальное состояние
                }))
            );
    }, [descriptiveData])

    const handleSelectChange = (value: string) => {
        setSelectedValue(value);
    };
    const handleCheckboxChange = (colId) => {
        setCheckboxes((prevCheckboxes) =>
            prevCheckboxes.map((checkbox) =>
                checkbox.colId === colId
                    ? { ...checkbox, checked: !checkbox.checked }
                    : checkbox
            )
        );
    };

    return (
        <>
            {
                descriptiveData &&
                <Card className="w-fit p-4 mb-6 shadow-lg rounded-lg border border-gray-200 bg-white">
                    <div className="flex justify-start gap-8 items-center">
                        <h2 className="text-lg font-semibold text-gray-700">Statistical Overview</h2>
                        <span>example.csv</span>
                        <CustomSelect
                            options={["Correlation", "Regression", "Clusterization"]}
                            onChange={handleSelectChange}
                            defaultValue="Choose desired chart"
                        />
                    </div>
                    <ul
                        className={`w-full grid align-middle`}
                        style={{ gridTemplateColumns: `repeat(${checkboxes.length}, 1fr)` }}
                    >
                        {checkboxes.map((checkbox) => (
                            <li key={checkbox.colId}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checkbox.checked}
                                        onChange={() => handleCheckboxChange(checkbox.colId)}
                                    />
                                </label>
                            </li>
                        ))}
                    </ul>
                    <StatisticsTable data={descriptiveData}/>
                </Card>
            }
        </>
    );
};

export default DataTable;