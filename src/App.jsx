import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

import FAQ from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import LoginSignUpPage from "./components/SignIn";
import MusicSection from "./components/MusicSection";
import MusicLandingPage from "./components/MusicLandingPage";
import MusicMelodyUI from "./components/MusicMelodyUI";
import CTA from "./components/Cta";
import ProjectDetails from "./components/ProjectDetails";
import Pricing from "./components/Pricing";
import PrivacyPolicy from "./components/Privacy";
import TermsOfService from "./components/TermsOfService";
import Generate from "./components/Generate";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/LoginSignUpPage" element={<LoginSignUpPage />} />
              <Route path="/MusicLandingPage" element={<MusicLandingPage />} />
              <Route path="/MusicMelodyUI" element={<MusicMelodyUI />} />
              <Route path="/ProjectDetails" element={<ProjectDetails />} />
              <Route path="/Pricing" element={<Pricing />} />
              <Route path="/TermsOfService" element={<TermsOfService/>} />
              <Route path="/Privacy" element={<PrivacyPolicy/>} />
              <Route path="/Generate" element={<Generate />} />
              <Route
                path="/"
                element={
                  <div className="flex flex-col gap-8">
                    <section id="hero">
                      <Hero />
                    </section>
                    <section id="music-section">
                      <MusicSection />
                    </section>
                    <section id="howitworks">
                      <HowItWorks />
                    </section>
                    <section id="faqs">
                      <FAQ />
                    </section>
                    <section id="cta">
                      <CTA />
                    </section>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
