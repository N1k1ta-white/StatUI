import {ChartBase} from "@/type/chart.ts";
import {useEffect, useState} from "react";
import {chatWithLLM} from "@/lib/utils.ts";
import {Loader} from "lucide-react";

export interface Props {
    mappedData?: any,
    metaData?: ChartBase
}

const generatePrompt = ({mappedData, metaData} : Props): string => {
    if (!metaData || !mappedData) {
        return '';
    }

    const { type, name, description } = metaData;

    // Пример структуры промпта:
    return `
        Пожалуйста, объясни график. Вот подробности:
        - Тип графика: ${type}
        - Название графика: ${name}
        - Описание графика: ${description}
        - Данные для графика: ${JSON.stringify(mappedData)}

        На основе этой информации, расскажи о графике, как он выглядит, что он отображает, 
        какие закономерности или важные моменты можно выделить, исходя из данных и описания.
    `;
};

function Hint({mappedData, metaData}: Props) {
    const [chat, setChat] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string | null>();
    useEffect(() => {
        const fetchAnswer = async () => {
            // setAnswer(await chatWithLLM(generatePrompt({mappedData, metaData})))
            setAnswer(await chatWithLLM("Привет как дела"))
        }
        try {
            fetchAnswer()
        } catch (error) {
            console.error(error)
        }

    }, [mappedData, metaData]);
    return (
        <span className="absolute top-0 right-0">
            <span
                onClick={() => setChat(!chat)}
                className="block text-white text-center leading-6 relative bg-yellow-400 w-6 h-6 rounded-[50%] cursor-pointer"
            >
                <b>?</b>
                <div
                    className="absolute z-10 w-96 h-96 top-0 bg-gray-200 shadow-xl rounded-lg transition-all duration-1000 ease-in-out border-[1px] border-black-400"
                    style={{
                        left: "calc(100% + 8px)",
                        transform: chat ? "translateX(0)" : "translateX(-100%)",
                        opacity: chat ? 1 : 0,
                    }}
                >
                        <div className="p-4">
                            <h1 className="text-gray-400 mb-4 text-center text-2xl font-bold">What does it mean?</h1>
                            <div className="">
                                {!answer && <Loader/>}
                                {answer && <TypingEffect
                                    text={answer}
                                    speed={25}/>}
                            </div>
                        </div>
                    </div>
            </span>
        </span>
    );
}

export default Hint;


const TypingEffect = ({text, speed = 100}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [index, text, speed]);

    return <div className="text-left text-gray-600">{displayedText}</div>;
};