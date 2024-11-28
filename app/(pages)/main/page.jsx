"use client";

import HomeApp from "@/app/components/App/HomeApp";
import FooterApp from "@/app/components/App/FooterApp";
import GoalApp from "@/app/components/App/GoalApp";
import AnalysisApp from "@/app/components/App/AnalysisApp";
import AddApp from "@/app/components/App/AddApp";
import ProfileApp from "@/app/components/App/ProfileApp";
import SettingsApp from "@/app/components/App/SettingsApp";
import Load from "@/app/components/Load";
import "@/app/styles/home.css";
import { useEffect, useState } from "react";
import GetUserData from "@/app/lib/GET"
import "@/app/styles/main.css";

const Main = () => {
  const [page, setPage] = useState("load");
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/api/profil", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setTimeout(() => {
          setPage("home");
        }, 500);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch("/api/profil", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        
      })
      .catch((error) => console.error(error));
  }, [page]);



  

  const renderPage =  () => {
    switch (page) { 
      case "home":
        return <HomeApp linkFunc={setPage} userdata={user} />;
      case "analysis":
        return <AnalysisApp userdata={user} />;
      case "goal":
        return <GoalApp userdata={user} />;
      case "add":
        return <AddApp userdata={user} />;
      case "settings":
        return <SettingsApp userdata={user} />;
      case "profile":
        return <ProfileApp userdata={user} />;
      case "load":
        return <Load userdata={user} />;
      default:
        return <div>Page not found</div>;
    }
    
  };


  if (page === "load") {
    return (<div className="container-load">
        <Load userdata={user} />
        
        </div>)
  }

  return (
    <div className="container">
      <main>{renderPage()}</main>
      <FooterApp linkFunc={setPage} />
    </div>
  );

};

export default Main;
