import Image from "next/image"
import "@/app/styles/load.css"

import water from "@/app/assets/water.png"
export default function Load(){
    return(<div className="loadBlock" style={{background: "#5dccfc", maxWidth: "500px", height: "100vh"}}>
    <div></div>
    <Image src={water} width={150} alt="img"></Image>
    <p className="loadTitle">Drops Water Tracker</p>
    <p className="loadInfo">Stay hydrated and track your daily water intake</p>
    <div class="points">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    </div>)
}