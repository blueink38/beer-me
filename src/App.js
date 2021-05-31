import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from './components/Header';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Hero from './components/Hero';

import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Hero/>
        <Portfolio/>
        <About/>   
        <ContactUs/>
        <Footer/>
      </div>
    );
  }
}

export default App;