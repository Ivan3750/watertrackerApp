import chart from "@/app/assets/chart-simple.svg";
import home from "@/app/assets/home 1.svg";
import settings from "@/app/assets/user-svgrepo-com 1.svg";
import search from "@/app/assets/search 1.svg";
import Image from "next/image";

const FooterApp = ({ linkFunc }) => {
  return (
    <footer className="footer">
      <button onClick={() => linkFunc("home")} className="footer-button active">
        <Image src={home} alt="Home" />
        Home
      </button>
      <button onClick={() => linkFunc("analysis")} className="footer-button">
        <Image src={chart} alt="Analysis" />
        Analysis
      </button>
      <button onClick={() => linkFunc("add")} className="footer-button">
        +
      </button>
      <button onClick={() => linkFunc("settings")} className="footer-button">
        <Image src={search} alt="Settings" />
        Setting
      </button>
      <button onClick={() => linkFunc("profile")} className="footer-button">
        <Image src={settings} alt="Profile" />
        Profile
      </button>
    </footer>
  );
};

export default FooterApp;
