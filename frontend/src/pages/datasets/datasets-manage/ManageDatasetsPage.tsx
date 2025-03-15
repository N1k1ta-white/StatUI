import {CsvUpload} from "@/components/CsvUpload.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useCallback, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import store from "@/store/store.ts";
import {fetchUploadContext} from "@/store/chartsSlice.ts";


function ManageDatasetsPage() {
    const [file, setFile] = useState<File | null>(null);
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
    const [notes, setNotes] = useState<string>("");
    const handleInputChange = useCallback((key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues((prevState) => ({
            ...prevState,
            [key]: e.target.value,
        }));
    }, []);

    const sendData = async () => {
        try {
            await store.dispatch(fetchUploadContext({file, inputValues, notes}))
        } catch (error) {
            alert(error);
        }
    }

     return (
         <div>
             <h1 className="text-xl font-bold pt-3 pb-3 text-left ">Upload your dataset here.</h1>
                <div className="flex gap-2">
                    <CsvUpload setFile={setFile} setInputValues={setInputValues} className="h-full" />
                    <div className="flex flex-1 flex-col gap-2 h-[44.5rem]">
                        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="h-[40%] w-full resize-none" placeholder="Type your notes here for AI processing"/>
                        <Card className="flex-1 overflow-y-auto p-2">
                            <ul className="flex flex-col gap-2 overflow-auto">
                                {Object.keys(inputValues).map((key) => (
                                    <li className="flex justify-between items-center" key={key}>
                                        <span className="w-[40%]">{key}</span>
                                        <Input
                                            className="flex-1"
                                            type="text"
                                            value={inputValues[key]}
                                            onChange={handleInputChange(key)}  // При изменении значения вызываем обработчик
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