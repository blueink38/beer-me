import React, { useState } from "react";
import SearchBreweries from '../components/SearchBreweries/index';
import Blip from '../components/Blip';
import Hero from '../components/Hero';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const Home = () => {
    return (
      <div className="App">
        <Hero/>
        <Blip/>
        <SearchBreweries/>   
        <ContactUs/>
        <Footer/>
      </div>
    );
  };
  
  export default Home;