import { useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Teams from "./components/Team";
import Drivers from "./components/Drivers";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

function App() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) return <Loader onFinish={() => setLoaded(true)} />;

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Teams />
      <Drivers />
      <Timeline />
      <Gallery />
      <Footer />
    </>
  );
}

export default App;
