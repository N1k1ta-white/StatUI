import {useSelector} from "react-redux";
import store, {RootState} from "@/store/store.ts";
import {useState} from "react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Button} from "@/components/ui/button.tsx";
import {fetchAnalysisMethod} from "@/store/statisticsSlice.ts";

const categories = {
    clustering: ["K-means Clustering", "Hierarchical Clustering", "DBSCAN", "Gaussian Mixture Model"],
    correlation: [
        "Pearson's Correlation Coefficient",
        "Spearman's Rank Correlation",
        "Kendall's Tau",
        "Cross-Correlation",
        "Variance Inflation Factor",
    ],
    regression: [
        "Linear Regression",
        "Multiple Regression",
        "Logistic Regression",
        "Polynomial Regression",
        "Lasso Regression",
        "Probit & Tobit Regression",
    ],
};

export default function MethodSelection() {
    const headers = useSelector((state: RootState) => Object.keys(state.chartsData.statistics.descriptiveStatistics ?? []))
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedMethods, setSelectedMethods] = useState<{ [key: string]: string | null }>({});
    const [selectedColumns, setSelectedColumns] = useState<{ [key: string]: string[] }>({});

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
        setSelectedMethods((prev) => ({ ...prev, [category]: null }));
    };

    const handleMethodChange = (category: string, method: string) => {
        setSelectedMethods((prev) => ({ ...prev, [category]: method }));
        setSelectedColumns((prev) => ({ ...prev, [method]: [] }));
    };

    const handleColumnChange = (method: string, column: string) => {
        setSelectedColumns((prev) => ({
            ...prev,
            [method]: prev[method]?.includes(column)
                ? prev[method].filter((c) => c !== column)
                : [...(prev[method] || []), column],
        }));
    };

    const processData = async () => {
        try {
            console.log(selectedColumns)
            await store.dispatch(fetchAnalysisMethod(selectedColumns)).unwrap()
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    return (
        <div className="w-fit max-w-lg space-y-6 p-4 bg-white rounded-xl shadow">
            <h2 className="text-xl font-semibold">Choose category and method</h2>

            {/* Чекбоксы категорий */}
            {Object.keys(categories).map((category) => (
                <div key={category} className="border-b pb-4 mb-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <span className="text-lg capitalize">
                            {category}
                        </span>
                    </div>

                    {/* Радио-кнопки методов */}
                    {selectedCategories.includes(category) && (
                        <RadioGroup
                            value={selectedMethods[category] || ""}
                            onValueChange={(value) => handleMethodChange(category, value)}
                            className="ml-6 mt-2 space-y-2"
                        >
                            {categories[category as keyof typeof categories].map((method) => (
                                <div key={method} className="flex items-center space-x-2">
                                    <RadioGroupItem value={method} id={method} />
                                    <span>{method}</span>
                                </div>
                            ))}
                        </RadioGroup>
                    )}

                    {/* Чекбоксы столбцов */}
                    {selectedMethods[category] && (
                        <div className="ml-6 mt-4">
                            <h3 className="text-sm font-medium">Choose columns</h3>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {headers.map((column) => (
                                    <div key={column} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={column}
                                            checked={selectedColumns[selectedMethods[category]!]?.includes(column)}
                                            onCheckedChange={() => handleColumnChange(selectedMethods[category]!, column)}
                                        />
                                        <span>{column}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <Button onClick={processData}>Get Charts</Button>
            {/* Отладка */}
            {/*<pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify({ selectedCategories, selectedMethods, selectedColumns }, null, 2)}</pre>*/}

        </div>
    );
}