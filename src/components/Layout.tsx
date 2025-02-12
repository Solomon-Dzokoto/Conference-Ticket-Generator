import { Outlet } from "react-router-dom"
import Header from "../components/Heder"

const Layout = () => {
  return (
    <div>
        <Header/>
        <Outlet/> 
    </div>
  )
}

export default Layout
