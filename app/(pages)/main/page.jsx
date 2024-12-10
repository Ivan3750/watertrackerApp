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
import "@/app/styles/main.css";
import { useEffect, useState } from "react";

const Main = () => {
  const [page, setPage] = useState("load");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/profil", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Render pages dynamically
  const renderPage = () => {
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
      default:
        return <div>Page not found</div>;
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="container-load">
        <Load />
      </div>
    );
  }

  return (
    <div className="container">
      <main>{renderPage()}</main>
      <FooterApp linkFunc={setPage} />
    </div>
  );
};

export default Main;