import { cloneElement } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// --- pages
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

import * as ROUTES from './constants/routes'
import { useAuthListener } from './hooks/useAuthListener'
import { UserContext } from "./context/user";

import Modal from "./components/Modal";
import { ModalContextProvider } from "./context/modal";

const ProtectedPage = ({ children }) => {
  const { user } = useAuthListener();

  if (!user) {
    return <Navigate replace to={ROUTES.LOGIN} />
  }

  return cloneElement(children, { user })
}

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Navigate replace to={ROUTES.LOGIN} /> // redirect to login page
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedPage>
        <Dashboard />
      </ProtectedPage>
    ),
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
    // element: <ProtectedPage><Profile /></ProtectedPage>,
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
      <ModalContextProvider>
        <RouterProvider router={router} />
        <Modal />
      </ModalContextProvider>
    </UserContext.Provider>
  );
}

export default App;
