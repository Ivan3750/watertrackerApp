"use client"

import Image from "next/image";
import phone1 from "@/app/assets/iPhone 14 pro.png"
import phone2 from "@/app/assets/phone 2.png"
import clock from "@/app/assets/clock.svg"
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const InfoProject = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);
    return ( <section className="info-project">
        <h2 className="i-project-main-title">PROJECT OVERVIEW</h2>
        <div>
        <div className="i-project-block">
            <div className="i-project-info">
            <h3 className="i-project-title">WHAT IS Drops Water Tracker</h3>
            <p className="i-project-text">A beautiful water tracker widget app helps you to track your daily water activity. It shows your regular goal and reminds you of water throughout the day. So, a clean and intuitive interface motivates you to drink water on time and makes you healthy.</p>
            <h3 className="i-project-title">MY ROLE</h3>
            <p className="i-project-text">Carryout User Experience Research and User Interface Design</p>
            <div className="i-project-widget">
                <Image src={clock}></Image>
                <div className="widget-txt-box">
                    <p className="widget-title">Project Duration:</p>
                    <p className="widget-subtitle">6 weeks</p>
                </div>
            </div>
            </div>
            <div className="i-project-img">
                <Image src={phone1} data-aos="zoom-in-down" className="i-project-phone" width="400px"></Image>
                <Image src={phone2} data-aos="zoom-in-down" className="i-project-phone" width="400px"></Image>
            </div>
        </div>
        <div></div>
        </div>
    </section> );
}
 
export default InfoProject;