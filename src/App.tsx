import { useState } from "react";
import Login from "./components/Login";
import Links from "./components/Links";
import Register from "./components/Register";

import { 
  Outlet, ReactLocation, Router 
} from "@tanstack/react-location";

const location = new ReactLocation();

function App() {
  return (
    <Router
      location={location}
      routes={[
        { path: '/', element: <Links /> },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },
      ]}
    >
    </Router>
  )
}

export default App;
