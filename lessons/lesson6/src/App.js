import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// --- pages
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

import * as ROUTES from './constants/routes'
import { useAuthListener } from './hooks/useAuthListener'
import { UserContext } from "./context/user";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Navigate replace to={ROUTES.LOGIN} /> // redirect to login page
  },
  {
    path: ROUTES.DASHBOARD,
    element: <div>dashboard</div>,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.SIGN_UP,
    element: <SignUp />,
  },
  {
    path: ROUTES.PROFILE,
    element: <Profile />,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <div>not found</div>,
  },
]);

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
