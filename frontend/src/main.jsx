import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";
import BouncingLoading from "./components/repeated/BouncingLoading.jsx";
const Welcome = lazy(() => import("./components/Welcome.jsx"));
const Register = lazy(() => import("./components/CreateAccount.jsx"));
const Login = lazy(() => import("./components/Login.jsx"));
const Profile = lazy(() => import("./components/Profile.jsx"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<BouncingLoading />}>
            <Welcome />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<BouncingLoading />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<BouncingLoading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<BouncingLoading />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </StrictMode>,
);
