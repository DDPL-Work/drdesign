import React from 'react'
import Hero from '../../components/Service-page/Hero'
import ITPractice from '../../components/Service-page/ITPractice'
import GISPractice from '../../components/Service-page/GISPractice'
import HowWeWork from '../../components/Service-page/HowWeWork'
import CTA from '../../components/homePage/CTA'

const Services = () => {
  return (
    <main className="overflow-x-hidden lg:overflow-x-visible w-full">
      <Hero />
      <ITPractice />
      <GISPractice />
      <HowWeWork />
      <CTA />
    </main>
  )
}

export default Services