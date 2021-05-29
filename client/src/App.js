// import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Header from './components/Header';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Suds from  './components/Suds';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import SearchBreweries from './components/SearchBreweries'


function App() {
  return (
    <div className="App">
        <Header/>
        <About/>   
        <Portfolio/>
        <Suds/>
        <ContactUs/>
        <Footer/>
      <SearchBreweries />
    </div>


  );
};





export default App;
