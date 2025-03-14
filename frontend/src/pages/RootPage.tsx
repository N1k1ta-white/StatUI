import {NavLink, Outlet, useNavigate} from 'react-router-dom'
import {cn} from "@/lib/utils.ts";

export default function RootPage() {
    const navigate = useNavigate();
    const links = [
        { path: "/", label: "Home"},
        { path: "datasets/manage", label: "Datasets"},
    ];
    return  (
        <div className="flex flex-col h-screen">
            {/* Fixed Header */}
            <header className="w-full bg-gray-400 p-4">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-2xl font-bold pt-3 pb-3 text-center cursor-pointer"
                        onClick={() => navigate("/")}><i>STAT UI</i></h1>
                    <div className="flex items-center gap-4">
                        <NavLink to="/login">Login</NavLink>
                    </div>
                </div>
                <div className="w-full flex gap-4">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({isActive}) =>
                                cn(
                                    "text-[0.9rem]",
                                    isActive ? "text-black font-bold" : "text-gray-500"
                                )
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto mt-16 p-4">
                <Outlet/>
            </main>
        </div>
    )
}