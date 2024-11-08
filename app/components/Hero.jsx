"use client"

import Image from "next/image"
import waterDrop from "@/app/assets/waterDrop.svg"
import checkIcon from "@/app/assets/check.svg"
import mainPhone from "@/app/assets/iPhone 14 Pro.png"
import LTPhone from "@/app/assets/image 4.png"
import RTPhone from "@/app/assets/image 3.png"
import RBPhone from "@/app/assets/image 4 (1).png"
import LBPhone from "@/app/assets/image 6.png"
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';



const Hero = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);
  return <section className="hero">
    <div className="hero__info">
        <div className="title__box">
        <Image src={waterDrop} alt="" width="100"/>
        <h1 className="hero__title">Drops Water Tracker</h1>
        </div>
        <h2 className="hero__subtitle">Water Tracker App and Reminder App</h2>
        <ul className="hero__list">
            <li  data-aos="zoom-out-up">
                <Image src={checkIcon} alt="*"></Image>
                <p>Detail system</p>
            </li>
            <li  data-aos="zoom-out-up">
                <Image src={checkIcon} alt="*"></Image>
                <p>Pixel perfect</p>
            </li>
            <li  data-aos="zoom-out-up">
                <Image src={checkIcon} alt="*"></Image>
                <p>Style guideline</p>
            </li>
            <li  data-aos="zoom-out-up">
                <Image src={checkIcon} alt="*"></Image>
                <p>Fully Customizable</p>
            </li>
        </ul>
        <p className="info-create">Developed By: <span>Ivan Kohan</span></p>
    </div>
    <div className="hero__image">
        <Image src={LTPhone} className="phoneLT" data-aos="zoom-in-up"></Image>
        <Image src={RTPhone} className="phoneRT" data-aos="zoom-in-up"></Image>
        <Image src={mainPhone} className="phoneM" data-aos="zoom-in-up"></Image>
        <Image src={LBPhone} className="phoneLB" data-aos="zoom-in-up"></Image>
        <Image src={RBPhone} className="phoneRB" data-aos="zoom-in-up"></Image>
    </div>
  
  </section>;
};

export default Hero;
