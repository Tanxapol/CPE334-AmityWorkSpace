import { Outlet } from "react-router-dom"
import Navbar from "./nav"
import Footer from "../footer"


const NavList = [
    { name: "HOME", path: "/" },
    { name: "ROOM", path: "/" },
]

export default function Navnologin() {
    return (
        <>
            <Navbar navList={NavList} />
            <Outlet />
            <Footer />
        </>
    )
}