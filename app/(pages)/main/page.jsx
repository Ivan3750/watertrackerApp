"use client"

import HomeApp from "@/app/components/App/HomeApp";
import FooterApp from "@/app/components/App/FooterApp";
import GoalApp from "@/app/components/App/GoalApp";
import AnalysisApp from "@/app/components/App/AnalysisApp";
import AddApp from "@/app/components/App/AddApp";
import ProfileApp from "@/app/components/App/ProfileApp";
import SettingsApp from "@/app/components/App/SettingsApp";
import "@/app/styles/home.css";
import { useEffect, useState } from "react";

const Main = () => {
    const [page, setPage] = useState("home");

    const renderPage = () => {
        switch (page) {
            case "home":
                return <HomeApp />;
            case "analysis":
                return <AnalysisApp />;
            case "goal":
                return <GoalApp />;
            case "add":
                return <AddApp/>
            case "settings":
                return <SettingsApp/>
            case "profile":
                return <ProfileApp/>
            default:
                return <div>Page not found</div>;
        }
    };


    useEffect(()=>{
        console.log(page)
    }, [page])
    return (
        <div className="container">
            {renderPage()}

            <FooterApp  linkFunc={setPage}/>
        </div>
    );
};

export default Main;
