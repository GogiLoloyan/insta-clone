import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// --- pages
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>home</div>,
  },
  {
    path: "/about",
    element: <div>about</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
