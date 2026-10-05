import { useState } from 'react'
import { useReveal } from './hooks/useReveal.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Calculator from './components/Calculator.jsx'
import Why from './components/Why.jsx'
import Coffee from './components/Coffee.jsx'
import Process from './components/Process.jsx'
import Business from './components/Business.jsx'
import Reviews from './components/Reviews.jsx'
import Booking from './components/Booking.jsx'
import Careers from './components/Careers.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CookieConsent from './components/CookieConsent.jsx'

export default function App() {
  // Смета из калькулятора, которая переносится в форму записи
  const [draft, setDraft] = useState('')
  useReveal()

  const bookWith = (text) => {
    setDraft(text)
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Calculator onBook={bookWith} />
        <Why />
        <Coffee />
        <Process />
        <Business />
        <Reviews />
        <Booking draft={draft} setDraft={setDraft} />
        <Careers />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
    </>
  )
}
