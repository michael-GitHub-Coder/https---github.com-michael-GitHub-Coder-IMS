import { Outlet } from "react-router-dom"
import Dashboard from "../Components/Dashboard"
import Login from "../Components/Login"
import Register from "../Components/Register"


const Mainlayout = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default Mainlayout