import Hero from "@/app/components/Hero"
import InfoProject from "@/app/components/InfoProject"
import Tagline from "@/app/components/Tagline"
import Core from "@/app/components/Core"
import Footer from "@/app/components/Footer"
import User from "@/app/components/User"
export default function Home() {
  return (
    <>
    <main>
    <Hero></Hero>
    <InfoProject/>
    <Tagline/>
    <Core></Core>
    <User></User>
    <Footer></Footer>
    </main>
    </>
  );
}
