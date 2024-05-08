//import "./App.css";
//import "./index.scss";
import {
  //Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Home from "./components/Company/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
