import { Outlet } from "react-router-dom"
import Navbar from "./nav"
import Footer from "../footer"

const NavList = [
    { name: "HOME", path: "/staff" },
    { name: "ROOM", path: "room" },
    // { name: "_staff", path: ""},
]

export default function Navstaff() {
    return (
        <>
            <Navbar navList={NavList} />
            <Outlet />
            <Footer />
        </>
    )
}