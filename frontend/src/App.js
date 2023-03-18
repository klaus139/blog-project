import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import TopBar from './components/topBar/TopBar';
import Register from './pages/Register/Register'
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Footer from './components/Footer/Footer'
import Single from "./pages/Single";

const Layout = () => {
  return (
    <>
    <TopBar />
    <Outlet />
    <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"/post/:id",
        element: <Single />,
      },
      // {
      //   path: "/write",
      //   element: <Write />,
      // },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
  path: "/login",
  element: <Login />,
  },
]);

function App(){
  return (
    <div className="app">
       <ToastContainer />
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>

  )
}



export default App;
