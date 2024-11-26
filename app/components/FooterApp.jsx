import chart from "@/app/assets/chart-simple.svg"
import home from "@/app/assets/home 1.svg"
import settings from "@/app/assets/user-svgrepo-com 1.svg"
import search from "@/app/assets/search 1.svg"
import Image from "next/image"
const FooterApp = () => {
    return ( <> <footer className="footer">
        <button className="footer-button active">
            <Image src={home}></Image>
            Home
            </button>
        <button className="footer-button">
        <Image src={chart}></Image>
            Analysis</button>
        <button className="footer-button">
            +</button>
        <button className="footer-button">
        <Image src={search}></Image>
            Setting</button>
        <button className="footer-button">
        <Image src={settings}></Image>
            Profile</button>
      </footer></> );
}
 
export default FooterApp;