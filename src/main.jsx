import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './routes/Routes';
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { TodoProvider } from './provider/TodoProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoProvider>
      <RouterProvider router={router} />
    </TodoProvider>
  </React.StrictMode>,
)
