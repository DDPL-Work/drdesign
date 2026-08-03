import React from 'react'
import AboutUsHero from '../../components/About-UsPage/Hero'
import OurJourney from '../../components/About-UsPage/OurJourney'
import VisionMission from '../../components/About-UsPage/VisionMission'
import Achievement from '../../components/About-UsPage/Achievement'
import TrustedClients from '../../components/About-UsPage/TrustedClients'
import CTA from '../../components/homePage/CTA'

const AboutUs = () => {
  return (
    <main>
        <AboutUsHero />
        <OurJourney />
        <VisionMission />
        <Achievement />
        <TrustedClients />
        <CTA />
    </main>
  )
}

export default AboutUs