import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Register from "./Components/Register"
import Mainlayout from "./layout/Mainlayout"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"

const App = () => {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Mainlayout/>} >
        <Route index element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    )
  )
  return (
    <div className="bg-gray-100"><RouterProvider router={router} /></div>
  )
}

export default App


