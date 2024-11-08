"use client"


import Image from "next/image";
import drinkWater from "@/app/assets/drinkwater.svg"
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Tagline = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);
    return ( <section className="tagline">
        <div className="tagline-top">
        <h3 className="tagline-title">TAGLINE</h3>
        <p className="tagline-desc">Drops Water Tracker app specifically designed to help young individuals stay hydrated and maintain a healthy lifestyle</p>
        </div>
        <div className="tagline__block">
            <div className="tagline-info">
                <p className="tagline-i-title">PROBLEM STATEMENT</p>
                <p className="tagline-i-text">Many individuals struggle to maintain proper hydration throughout the day, leading to various health issues. With busy schedules and distractions, it's easy to forget to drink enough water. There is a need for a solution to address this problem.</p>
                <p className="tagline-i-title">PROBLEM SOLUTIONS</p>
                <p className="tagline-i-text">Hydrate, a mobile app that allows users to track their water intake by settingpersonalized hydration goals and timely notification that reminds users to take a sip ofwater.</p>
            </div>
            <div className="tagline-img">
                <Image src={drinkWater} data-aos="zoom-in-left"></Image>
            </div>
        </div>
    </section> );
}
 
export default Tagline;