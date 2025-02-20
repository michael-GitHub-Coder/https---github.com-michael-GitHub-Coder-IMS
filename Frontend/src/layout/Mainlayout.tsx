import { Outlet } from "react-router-dom"
import Login from "../Components/Login"

const Mainlayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default Mainlayout