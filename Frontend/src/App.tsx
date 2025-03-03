import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Register from "./Components/Register"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import AddUser from "./Components/AddUser"
import AddTicket from "./Components/AddTicket"
import Table from "./Components/Table"
import Addgroup from "./Components/AddGroup"
import Userprofile from "./Components/Userprofile"
import TableLayout from "./layout.tsx/TableLayout"

const App = () => {
  
  const router = createBrowserRouter(
    createRoutesFromElements(

      <>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} >
        <Route index element={<TableLayout />} /> 
        <Route path="Add-user" element={<AddUser />} />
        <Route path="Add-ticket" element={<AddTicket />} />
        <Route path="table" element={<TableLayout />} />
        <Route path="Add-group" element={<Addgroup />}/>
        <Route path="Profile" element={<Userprofile />} />
      </Route>
      </>
    )
  )
  return (
    <div className="bg-gray-100"><RouterProvider router={router} /></div>
  )
}

export default App
