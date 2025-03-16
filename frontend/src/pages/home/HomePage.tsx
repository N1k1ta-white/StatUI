import { Scatter3DPlot } from "@/components/charts/Chart";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-gray-100 flex flex-col items-center justify-center text-white px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-6xl">
                {/* Chart Section */}
                <div className="w-auto bg-white rounded-lg shadow-lg border-2 border-gray-300">
                    <div className="h-[400px] w-full rounded-lg overflow-hidden">
                        <Scatter3DPlot
                            csvUrl="https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv"
                            title="3D Scatter Plot Example"
                        />
                    </div>
                </div>
                {/* Text Section */}
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <h1 className="text-4xl font-bold mb-6 text-center">Welcome to StatUI</h1>
                    <p className="text-lg mb-10 text-center max-w-2xl">
                        Explore advanced data visualizations and statistical insights with ease. We bring the power of data science to your fingertips.
                    </p>
                    <p className="text-lg mb-6 text-center md:text-center">
                        Dive into the world of data visualization. Analyze trends, patterns, and relationships in your data effortlessly.
                    </p>
                    <Button
                        className="px-8 py-4 bg-yellow-100 hover:bg-yellow-400 text-black font-semibold rounded-lg shadow-lg animate-float w-[50%]"
                        onClick={() => navigate("datasets/manage")}
                     >
                        START
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;