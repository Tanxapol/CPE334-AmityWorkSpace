import Footer from "../../components/footer";
import Navuser from "../../components/navbar/navuser";
import Homesec1 from "./homesec1";
import Homesec2 from "./homesec2";
import Homesec3 from "./homesec3";

export default function Home() {
    return (
        <>
            <Navuser />
            
            <Homesec1 />
            <Homesec2 />
            <Homesec3 />
            <Footer />
        </>
    )
}