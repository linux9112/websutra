import { DataProvider } from "./context/DataContext"
import Header from "./components/Header"
import AdminModal from "./components/AdminModal"

import Hero from "./pages/Hero/Hero"
import About from "./pages/About/About"
import Services from "./pages/Services/Services"
import Project from "./pages/Project/Project"
import Why from "./pages/Why/Why"
import Process from "./pages/Process/Process"
import FAQ from "./pages/FAQ/FAQ"
import Contact from "./pages/Contact/Contact"
import Footer from "./pages/Footer/Footer"

function App() {
  return (
    <DataProvider>
      <Header />
      <Hero />
      <About />
      <Services />
      <Project />
      <Why />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
      <AdminModal />
    </DataProvider>
  )
}

export default App