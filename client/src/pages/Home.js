import React, { useState } from "react";
import FindBrewery from '../components/FindBrewery';
import Blip from '../components/Blip';
import Hero from '../components/Hero';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const Home = () => {
    return (
      <div className="App">
        <Hero/>
        <Blip/>
        <FindBrewery/>   
        <ContactUs/>
        <Footer/>
      </div>
    );
  };
  
  export default Home;