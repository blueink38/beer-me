// import logo from './logo.svg';
import './App.css';
let userIP = "";
let userLat = 0;
let userLon = 0;
// let key = "2qYjtOeeuEawxxQE7KUtVZQFywO4pRvN";

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      {/* <h1>{userLat}</h1> */}
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
  fetch("https://api.tomtom.com/routing/1/calculateRoute/52.50931%2C13.42936%3A52.50274%2C13.43872/json?instructionsType=text&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleCommercial=false&key=2qYjtOeeuEawxxQE7KUtVZQFywO4pRvN").then(function(response){
                if(response.ok){
                    response.json().then(function(data){
                      var instructions=data.routes[0].guidance.instructions;
                      console.log(instructions);
                   });
                }
            });
          }
    

userLocation();

export default App;
