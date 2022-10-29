import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// --- pages
import Login from './pages/Login';
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/login" /> // redirect to login page
  },
  {
    path: "/dashboard",
    element: <div>dashboard</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  return (
    // <div>
    //   header
    <RouterProvider router={router} />
    //   footer
    // </div>
  );
}

export default App;
