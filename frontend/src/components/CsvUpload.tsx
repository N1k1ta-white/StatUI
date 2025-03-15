import React, { useState } from 'react';

interface CsvUploadProps {}

const CsvUpload: React.FC<CsvUploadProps> = () => {
    const [fileData, setFileData] = useState<string[][]>([]);
    const [error, setError] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'text/csv') {
            setError('');
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
                const text = e.target?.result as string;
                const parsedData = parseCSV(text);
                setFileData(parsedData);
            };

            reader.readAsText(file);
        } else {
            setError('Пожалуйста, загрузите валидный CSV файл');
        }
    };

    const parseCSV = (data: string): string[][] => {
        const rows = data.split('\n');
        return rows.map((row) => row.split(','));
    };

    return (
        <div>
            <h2>Загрузить CSV файл</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {fileData.length > 0 && (
                <div>
                    <h3>Данные из CSV:</h3>
                    <table border="1">
                        <thead>
                        <tr>
                            {fileData[0].map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {fileData.slice(1).map((row, index) => (
                            <tr key={index}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CsvUpload;
