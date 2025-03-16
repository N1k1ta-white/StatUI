import {NavLink, Outlet} from "react-router-dom";
import {cn} from "@/lib/utils.ts";


function DatasetsPage() {
    const links = [
        { path: "manage", label: "Manage datasets"},
        { path: "visualisation", label: "Visualize datasets"},
    ];
     return (
         <div className="flex lg:flex-row flex-col gap-2 w-full px-12 py-6">
             <div className="lg:w-[20%] w-full border-gray-500 rounded">
                 <h2 className="text-lg font-bold pt-3 pb-3 text-left cursor-pointer">Data map</h2>
                 <ul className="border-l-2 border-gray-400 pl-4 flex flex-col gap-2">
                     {
                         links.map((link, key) => (
                             <li key={key}>
                                 <NavLink
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
                             </li>
                         ))
                     }
                 </ul>
             </div>
             <div className="lg:w-[80%] w-full flex-1 border-gray-500 rounded">
                 <Outlet/>
             </div>
         </div>
     );
}

export default DatasetsPage;