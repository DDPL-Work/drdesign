import React from 'react'
import { useNavigate } from "react-router-dom";
import bgVideo from '../../assets/Home-hero.mp4'
import mobileBgVideo from '../../assets/MobileHero.mp4'
import heroPoster from '../../assets/heroImg.webp'

const NewHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[100svh] md:h-screen overflow-hidden flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        {/* Simple Dark Overlay for text readability */}
        <div className="absolute inset-0 z-10"></div>
        {/* Desktop Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroPoster}
          className="hidden md:block w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        {/* Mobile Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroPoster}
          className="block md:hidden w-full h-full object-cover"
        >
          <source src={mobileBgVideo} type="video/mp4" />
        </video>
      </div>

      {/* Learn More Button */}
      <div className="absolute bottom-12 right-1/2 translate-x-1/2 md:translate-x-0 md:bottom-7 md:right-20 z-20 w-max">
        <button 
          onClick={() => navigate("/what-we-do")}
          className="group flex items-center justify-center px-6 py-4 md:py-6 bg-black/40 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-wide rounded-full hover:bg-transparent hover:border-white/50 transition-colors duration-300 shadow-xl overflow-hidden cursor-pointer"
        >
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-3">
            Learn more
          </span>
          <span className="text-xl font-bold -mt-1 ml-2 transition-all duration-300 ease-out group-hover:translate-x-7.5 group-hover:opacity-0">
            &rarr;
          </span>
        </button>
      </div>
    </section>
  )
}

export default NewHero