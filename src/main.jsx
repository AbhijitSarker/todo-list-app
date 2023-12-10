import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './routes/Routes';
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { TodoProvider } from './provider/TodoProvider';
import AuthProvider from './provider/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <TodoProvider>
          <RouterProvider router={router} />
        </TodoProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)
