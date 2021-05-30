import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from './components/Header';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Suds from  './components/Suds';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Portfolio/>

        <About/>   
        <ContactUs/>
        <Footer/>
      </div>
    );
  }
}

export default App;