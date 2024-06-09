import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './pages/Layout';

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Home />,
  // },
  {
    path: '/',
    element: <Layout />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
