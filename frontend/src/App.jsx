import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// import Home from './pages/Home';
import Layout from "./pages/Layout";
import Home from "./components/Home";

import Templates from "./components/Templates";
import Projects from "./components/Projects";
import CreateDesign from "./components/CreateDesign";
import Main from "./pages/Main";
import Index from "./pages/Index";
import { token_decode } from "./util";
const userInfo = token_decode(localStorage.getItem("canva_token"));

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Home />,
  // },

  {
    path: "/",
    element: userInfo ? <Layout /> : <Index />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/templates",
        element: <Templates />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
    ],
  },
  {
    path: "/design/create",
    element: userInfo ? <CreateDesign /> : <Navigate to="/" />,
  },
  {
    path: "/design/:design_id/edit",
    element: userInfo ? <Main /> : <Navigate to="/" />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
