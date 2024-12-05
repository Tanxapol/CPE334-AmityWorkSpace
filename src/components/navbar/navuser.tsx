import { Outlet } from "react-router-dom"
import Navbar from "./nav"
import Footer from "../footer"

const NavList = [
    { name: "HOME", path: "" },
    { name: "ROOM", path: "room" },
    // { name: "_user", path: "profile"},
]

export default function Navuser() {
    return (
        <>
            <Navbar navList={NavList} />
            <Outlet />
            <Footer />
        </>
    )
}