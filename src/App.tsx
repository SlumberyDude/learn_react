import { useState } from "react";
import Login from "./components/Login";
import Links from "./components/Links";
import Register from "./components/Register";

import { 
  createRouteConfig,
  RouterProvider,
  Link,
  ReactRouter
} from '@tanstack/react-router'

const rootRoute = createRouteConfig()

const loginRoute = rootRoute.createRoute({
  path: 'login',
  component: Login
})

const registerRoute = rootRoute.createRoute({
  path: '/register',
  component: Register
})

const linksRoute = rootRoute.createRoute({
  path: '/',
  component: Links
})

const routeConfig = rootRoute.addChildren([
  linksRoute,
  loginRoute,
  registerRoute
])

const router = new ReactRouter({ routeConfig })


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
