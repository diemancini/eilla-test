import "./App.css";
import {
  //Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Company from "./components/Company";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Company />,
  },
  // {
  //   path: "/portfolio-frontend",
  //   element: <Navigate to='/golf' />,
  // },
  // {
  //   path: "/golf",
  //   element: <Pga />,

  //   // children: [
  //   //   {
  //   //     path: "/events/new",
  //   //     element: <NewEvent />,
  //   //   },
  //   // ],
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
