import { Outlet } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import FeaturedTabs from "../components/FeaturedTabs"
import BannerSectionWithServices from "../components/BannerSectionWithServices";


function Home(){

  return(
    <>
    <HeroSection/>
    <BannerSectionWithServices/>
     <FeaturedTabs />
      <Outlet/>
    </>
  )
}

export default Home;