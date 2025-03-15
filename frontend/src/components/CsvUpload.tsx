import {useEffect, useState} from "react";
import { useDropzone } from "react-dropzone";
import { Loader2 } from "lucide-react"; // Иконка загрузки

interface Props {
    className?: string;
    setHeaders: React.Dispatch<React.SetStateAction<string[]>>;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function CsvUpload({ className, setHeaders, setFile }: Props) {
    const [state, setState] = useState<{file: File | null, fileData: string[][], error: string, loading: boolean}>({
        file: null,
        fileData: [],
        error: "",
        loading: false
    })

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;
        setState(prevState => ({...prevState, file, fileData: [], error: "", loading: true}))
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const text = e.target?.result as string;
            processCSV(text);
        };

        reader.readAsText(file);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "text/csv": [".csv"] }
    });

    useEffect(() => {
        setFile(state.file)
    }, [setFile, state.file])

    useEffect(() => {
        setHeaders(state.fileData[0])
    }, [setHeaders, state.fileData])

    const processCSV = (data: string) => {
        const rows = data.split("\n").map((row) => row.split(","));
        setState(prevState => ({ ...prevState, fileData: rows, error: "", loading: false}))
    };

    return (
        <div className={`${className} w-full max-w-3xl mx-auto`}>
            <div {...getRootProps()} className="h-full border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-gray-700">Drop the file here...</p>
                ) : (
                    <p className="text-gray-700">Drag and drop your CSV file here or click to select</p>
                )}
            </div>
            {state.error && <div className="text-red-500 text-sm mt-2">{state.error}</div>}

            {state.loading && (
                <div className="flex justify-center items-center mt-4">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-700" />
                    <span className="ml-2 text-gray-700">File uploading...</span>
                </div>
            )}

            {!state.loading && state.fileData.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold my-4">Data from CSV</h3>
                    <div className="max-h-[36rem] overflow-auto mt-4 border rounded-lg">
                        <table className="w-full border-collapse">
                            <thead className="sticky top-0 bg-white shadow-md z-10">
                            <tr>
                                {state.fileData[0].map((header, index) => (
                                    <th key={index} className="bg-gray-200 px-4 py-2 text-left font-semibold">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {state.fileData.slice(1).map((row, index) => (
                                <tr key={index} className="border-b">
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="px-4 py-2">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
