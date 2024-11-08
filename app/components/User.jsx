import Image from "next/image";

import personDraw from "@/app/assets/personDraw.png"

const User = () => {
    return ( <section className="user">
        <h3 className="user-main-title">USER
        PERSONAS</h3>
      
        <div className="user-subinfo">
        <h5 className="user-title">USER
        PERSONAS</h5>
        <p className="user-subtitle">USER
        PERI created a user persona that highlights the users' frustration, goals, and demographic using the information I learned from the interview sessions. </p>
        </div>
        <div className="user-main">
            <div className="u-main-img">
                <Image src={personDraw} width="300"></Image>
            </div>
            <div className="u-main-info">
                <div className="u-main-top">
                    <h3 className="main-top-username">Aashifa Sheikh</h3>
                    <p className="main-top-info">Age: 25   |   Occupation: Front End Developer | Senior Designer  |   Location: Indore, India</p>
                </div>
                    <div className="main-center">
                        <div className="main-center-frustration">
                            <p>Frustration</p>
                            <ul>
                                <li>Suffer from dehydration
                                </li>
                                <li>Sara Always forgets drinking water because her daily stuffed schedule
                                </li>
                                <li>She does not drink enough water, which causes her dizziness and affects her effectiveness</li>
                            </ul>
                        </div>
                        <div className="main-center-goals">
                            <p>Goals</p>
                            <ul>
                                <li>Wants to drink her need of water daily on a regular basis

                                </li>
                                <li>Needs a reminder to drink water on her busy days

                                </li>
                                <li>Wishes to stay healthy and maintain a balanced body</li>
                            </ul>
                        </div>
                    </div>
                        <div className="main-bottom">
                            <p>“In my busy days, I forget to drink water and suffer from dehydration at that time, not to mention I use my laptop a lot. due to that my productivity, health, and vitality are negatively affected”</p>
                        </div>
            </div>
        </div>
    </section> );
}
 
export default User;