import { CssBaseline } from "@mui/material"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Login from "~components/Authentication/Authentication"
import Home from "~components/Home/Home"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login/>} />
    </Route>
  )
)

function App() {

  return (
    <>
    <CssBaseline />
    <RouterProvider router={router}/>
    </>
  )
}

export default App
