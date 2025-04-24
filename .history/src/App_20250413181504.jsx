import { BrowserRouter } from "react-router-dom"
import FAQ from "./components/Faq"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import HowItWorks from "./components/HowItWorks"
import { Route, Routes } from "react-router-dom"
import LoginSignUpPage from "./components/SignIn"
import Generator from "./components/Generator"
import CTA from "./components/Cta"

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/LoginSignUpPage" element={<LoginSignUpPage/>} />
            <Route 
              path="/" 
              element={
                <div className="flex flex-col gap-8">
                  <section id="hero">
                    <Hero/>
                  </section>
                  <section id="generator">
                    <Generator />
                  </section>
                  <section id="howitworks">
                    <HowItWorks />
                  </section>
                  <section id="faqs">
                    <FAQ />
                  </section>
                  <section id="cta">
                    <CTA/>
                  </section>
                </div>
              } 
            />
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App