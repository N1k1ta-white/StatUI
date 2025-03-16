import {NavLink, Outlet, useNavigate} from 'react-router-dom'
import {cn} from "@/lib/utils.ts";
import Loader from "@/components/Loader.tsx";
import ErrorToast from '@/components/ErrorToast';

export default function RootPage() {
    const navigate = useNavigate();
    const links = [
        { path: "/", label: "Home"},
        { path: "datasets/", label: "Datasets"},
    ];
    return  (
        <div className="flex flex-col h-screen">
            {/* Fixed Header */}
            <header className="w-full">
                <div className="w-full flex items-center justify-between bg-[rgb(244,244,244)] px-12">
                    <h1 className="text-2xl font-bold pt-3 pb-3 text-center cursor-pointer"
                        onClick={() => navigate("/")}><i>STAT UI</i></h1>
                    <div className="flex items-center gap-4">
                        <NavLink to="/login">Login</NavLink>
                    </div>
                </div>
                
            </header>

            {/* Main Content */}
            <main className="h-fit">
                <Outlet/>
                <Loader/>
                <ErrorToast/>
            </main>
        </div>
    )
}