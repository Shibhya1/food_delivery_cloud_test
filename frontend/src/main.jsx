import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './screens/Home.jsx';
import Login from './screens/Login.jsx';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder.jsx';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><App /></div>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:<Login />
      },
      {
        path:"/signup",
        element:<Signup />
      },
      {
        path:"/myOrder",
        element:<MyOrder></MyOrder>
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
  ,
)
