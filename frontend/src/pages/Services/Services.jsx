import React from 'react'
import Hero from '../../components/Service-page/Hero'
import ITPractice from '../../components/Service-page/ITPractice'
import GISPractice from '../../components/Service-page/GISPractice'
import HowWeWork from '../../components/Service-page/HowWeWork'
import CTA from '../../components/homePage/CTA'

const Services = () => {
  return (
    <main className="overflow-x-hidden lg:overflow-x-visible w-full bg-black">
      {/* Fixed Hero Section */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <div className="pointer-events-auto h-full w-full">
          <Hero />
        </div>
      </div>

      {/* Subsequent Sections that scroll over the hero */}
      <div className="relative z-10 bg-[#ffffff] mt-[100vh]">
        <ITPractice />
        <GISPractice />
        <HowWeWork />
        <CTA />
      </div>
    </main>
  )
}

export default Services