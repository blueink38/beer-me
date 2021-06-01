import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from './components/Header';
import FindBrewery from './components/FindBrewery';
import Blip from './components/Blip';
import Hero from './components/Hero';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Hero/>
        <Blip/>
        <FindBrewery/>   
        <ContactUs/>
        <Footer/>
      </div>
    );
  }
}
export default App;