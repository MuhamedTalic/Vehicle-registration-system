import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import AddNewCar from './components/AddNewCar';
import ChangePassword from './components/ChangePassword';
import EditCar from './components/EditCar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './index.css';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "signUp",
    element: <SignUp/>
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "home",
    element: <Home/>
  },
  {
    path: "addNewCar",
    element: <AddNewCar/>
  },
  {
    path: "changePassword",
    element: <ChangePassword/>
  },
  {
    path: "editCar",
    element: <EditCar/>
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


reportWebVitals();
