import React from "react";
import SearchBreweries from '../components/SearchBreweries/index';
import Blip from '../components/Blip/index';
import Hero from '../components/Hero/index';
import ContactUs from '../components/ContactUs/index';
import Footer from '../components/Footer/index';
import Modal from '../components/Modal'

const Home = () => {
    return (
      <div className="App">
        <Hero/> 
        <Blip/>
        <Modal/>
        <SearchBreweries/>  
        <ContactUs/>
        <Footer/>
      </div>
    );
  };
  
  export default Home;