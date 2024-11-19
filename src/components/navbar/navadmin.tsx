import { Outlet } from "react-router-dom"
import Navbar from "./nav"
import Footer from "../footer"

const NavList = [
    { name: "HOME", path: "/admin" },
    { name: "ROOM", path: "/admin/room" },
    { name: "_admin", path: ""},
]

export default function Navadmin() {
    return (
        <>
            <Navbar navList={NavList} />
            <Outlet />
            <Footer />
        </>
    )
}