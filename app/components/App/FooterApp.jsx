import chart from "@/app/assets/chart-simple.svg";
import home from "@/app/assets/home.svg";
import settings from "@/app/assets/settings.svg";
import user from "@/app/assets/user.svg";
import analysis from "@/app/assets/analysis.svg";
import Image from "next/image";

const FooterApp = ({ linkFunc }) => {
  return (
    <footer className="footer">
      <button onClick={() => linkFunc("home")} className="footer-button">
        <Image src={home} alt="Home" />
        Home
      </button>
      <button onClick={() => linkFunc("analysis")} className="footer-button">
        <Image src={analysis} alt="Analysis" />
        Analysis
      </button>
      <button onClick={() => linkFunc("add")} className="footer-button">
        +
      </button>
      <button onClick={() => linkFunc("settings")} className="footer-button">
        <Image src={settings} alt="Settings" />
        Setting
      </button>
      <button onClick={() => linkFunc("profile")} className="footer-button">
        <Image src={user} alt="Profile" />
        Profile
      </button>
    </footer>
  );
};

export default FooterApp;
