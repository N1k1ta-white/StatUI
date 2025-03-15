import CsvUpload from "@/components/CsvUpload.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import store from "@/store/store.ts";

function ManageDatasetsPage() {
    const [file, setFile] = useState<File | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
    const [notes, setNotes] = useState<string>("");
    const handleInputChange = (key: string, value: string) => {
        setInputValues(prevState => ({
            ...prevState,
            [key]: value, // Обновляем значение для конкретного поля
        }));
    };
    const sendData = async () => {
        try {
            console.log({file, inputValues, notes})
            //await store.dispatch(fetchCreateProduct({file, inputValues, notes})).unwrap()
        } catch (error) {
            alert(error);
        }
    }

     return (
         <div>
             <h1 className="text-xl font-bold pt-3 pb-3 text-left ">Upload your dataset here.</h1>
                <div className="flex gap-2">
                    <CsvUpload setFile={setFile} setHeaders={setHeaders} className={"h-full"}/>
                    <div className="flex flex-1 flex-col gap-2 h-[44.5rem]">
                        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="h-[40%] w-full resize-none" placeholder="Type your notes here for AI processing"/>
                        <Card className="flex-1 overflow-y-auto p-2">
                            <ul className="flex flex-col gap-2 overflow-y-auto">
                                {(!headers || !headers.length) && <span className="text-gray-400">Describe your attributes here</span>}
                                {headers?.map((header, key) => (
                                    <li className="flex justify-between items-center" key={key}>
                                        <span className="w-[40%]">{header}</span>
                                        <Input
                                            className="flex-1"
                                            placeholder="Enter description"
                                            value={inputValues[header] || ""} // Привязываем значение
                                            onChange={(e) => handleInputChange(header, e.target.value)} // Обработчик изменений
                                        />
                                    </li>
                                ))}
                            </ul>
                        </Card>
                        <Button onClick={sendData}>Send data</Button>
                    </div>
                </div>
         </div>
     );
}

export default ManageDatasetsPage;