"use client"

import Image from "next/image"
import girlRun from "@/app/assets/girlRun.svg"
import timeIcon from "@/app/assets/timeIcon.svg"
import waterGlass from "@/app/assets/waterGlass.svg"
import calendar from "@/app/assets/calendar.svg"
import blackWater from "@/app/assets/blackWater.svg"
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Core = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);
    return ( <section className="core">
        <h4 className="core-title">CORE FEATURES</h4>
        <p className="core-subtitle">CORE FEATURES</p>
        <p className="core-info">After going through the brief i discovered that it has the following core features</p>
        <div className="core-icons-block">
            <div className="icons-box" data-aos="zoom-in">
                <Image src={girlRun} className="box-img"></Image>
                <p className="box-text">In the hustle and bustle of modern life, Create Healthy Habits</p>
            </div>
            <div className="icons-box" data-aos="zoom-in">
                <Image src={timeIcon} className="box-img"></Image>
                <p className="box-text">Quick & easy to set hydration goal & then track daily water intake progress</p>
            </div>
            <div className="icons-box" data-aos="zoom-in">
                <Image src={waterGlass} className="box-img"></Image>
                <p className="box-text">Staying hydrated every day is easy. Get a reminder to have a drink.</p>
            </div>
            <div className="icons-box" data-aos="zoom-in">
                <Image src={calendar} className="box-img"></Image>
                <p className="box-text">Lets you set up hydration reminders that fit in with your daily schedule</p>
            </div>
            <div className="icons-box" data-aos="zoom-in">
                <Image src={blackWater} className="box-img"></Image>
                <p className="box-text"> Reorder features</p>
            </div>
        </div>
        <div className="product-value-box">
            <p className="p-value-box-title">CORE PRODUCT VALUE</p>
            <p className="p-value-box-txt">The app is help people stay hydrated with the Drops Water Tracker App. Now you can learn everything you need to know about water and your health, how to stay hydrated, and much more with our new hydration book!</p>
        </div>
    </section> );
}
 
export default Core;