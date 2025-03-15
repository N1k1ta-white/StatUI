import { RingLoader } from "react-spinners";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store.ts";

const Loader: React.FC = () => {
    const isLoading = useSelector((state: RootState) =>
        Object.values(state).some(slice => slice.loading)
    );

    if (!isLoading) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-md z-50">
            <RingLoader
                color="#000000"
                loading={isLoading}
                size={300}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Loader;