import "@/app/styles/profile.css";
import Input from "../Input";
import { useState, useEffect } from "react";

const ProfileApp =({userdata})=> {

  const [username, setUsername] = useState(userdata.username)
  const [email, setEmail] = useState(userdata.email)
  const [age, setAge] = useState(userdata.age)



  useEffect(() => {
    const updateProfile = async () => {
      const token = localStorage.getItem("token");
      const url = "/api/profil";

      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username, email, age
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Data updated successfully:", result);
        } else {
          const error = await response.json();
          console.error("Error updating data:", error.message);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    };

    updateProfile();
  }, [username, email, age]);

  return(
    <div className="profile">
    <div className="profile-top">
      <div className="back"/>
      <div className="profile-title">My Profile</div>
      <div className="edit"/>
    </div>
    <div className="profile-content">
      <div className="profile">
        <Input type="text" desc="Username" value={username} onChange={setUsername}/>
        <Input type="email" desc="Email Adress" value={email} onChange={setEmail}/>
        <Input type="number" desc="Age" value={age} onChange={setAge}/>
      </div>
   </div>
   </div>
  )
};
export default ProfileApp;