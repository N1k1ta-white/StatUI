import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage.tsx";
import RootPage from "@/pages/RootPage.tsx";
import HomePage from "@/pages/home/HomePage.tsx";
import ManageDatasetsPage from "@/pages/datasets/datasets-manage/ManageDatasetsPage.tsx";
import VisualizationDatasetsPage from "@/pages/datasets/datasets-visualization/VisualizationDatasetsPage.tsx";
import DatasetsPage from "@/pages/datasets/datasets-overview/DatasetsPage.tsx";

const router = createBrowserRouter([
      {
            path: "/",
            element: <RootPage />,
            errorElement: <ErrorPage message={'404 Not Found'} />,
            children: [
                  { index: true, element: <HomePage/> },
                  {
                        path: "datasets",
                        element: <DatasetsPage/>,
                        children: [
                              { path: "manage", element: <ManageDatasetsPage/>},
                              { path: "visualisation", element: <VisualizationDatasetsPage/>},
                        ]
                  }
                  // {
                  //       element: <AuthProtected />,
                  //       children: [
                  //             { path: "login", element: <Login /> },
                  //             { path: "register", element: <Register /> }
                  //       ],
                  // }
            ]
      }
]);

function App() {
      return (
          <RouterProvider router={router} />
      );
}

export default App
