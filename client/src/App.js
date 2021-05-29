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
let userIP = "";
let userLat = 0;
let userLon = 0;
let completeDirections = [];
// let key = "2qYjtOeeuEawxxQE7KUtVZQFywO4pRvN";

function App() {
  return (
    <div className="App">
        <Header/>
        <About/>   
        <Portfolio/>
        <ContactUs/>
        <Suds/>
        <Footer/>
      <SearchBreweries />
    </div>


  );
};

function userLocation() {
    fetch("https://api.ipify.org/?format=json").then(function(response) {
        if(response.ok){
            response.json().then(function(data){
                userIP = data.ip 

                //uses ip address to get physical location data
                return fetch("https://ipapi.co/" + userIP + "/json")
            }).then(function(response){
                if(response.ok){
                    response.json().then(function(data){
                        //save location data for future use
                        userLat = data.latitude;
                        userLon = data.longitude;
                        console.log(userLat, userLon);
                        directions();
                    });
                }
            });
        }
    })
    
};

// directions using TomTom
function directions() {
  fetch("https://api.tomtom.com/routing/1/calculateRoute/" + userLat + "%2C" + userLon + "%3A30.3079827%2C-97.8934853/json?instructionsType=text&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleCommercial=false&key=2qYjtOeeuEawxxQE7KUtVZQFywO4pRvN").then(function(response){
                if(response.ok){
                    response.json().then(function(data){
                      let instructions=data.routes[0].guidance.instructions;
// let i = 0;
            for (let i = 0; i < instructions.length; i++) {
          // console.log(instructions[i].message);
          let stop = instructions[i].message;
          completeDirections.push(stop);
          // document.write(instructions[i].message);
          // completeDirections.push(message);
          // 
          // completeDirections=instructions[i].message;
};
console.log(completeDirections);
// console.log(i);
                      // console.log(instructions);
                   });
                }
            });
          }
    

userLocation();

export default App;
