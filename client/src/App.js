// import logo from './logo.svg';
import './App.css';
let userIP = "";
let userLat = 0;
let userLon = 0;

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      {/* <h1>{userLat}</h1> */}
    </div>
  );
}

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
                    });
                }
            });
        }
    })
};

userLocation();

export default App;
