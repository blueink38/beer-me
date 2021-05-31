  // route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  // save Brewery data for a logged in user
export const saveBrewery = (breweryData, token) => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(breweryData),
    });
  };
  
  // remove saved Brewery data for a logged in user
export const deleteBrewery = (breweryId, token) => {
    return fetch(`/api/users/breweries/${breweryId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  // make a search to open brew api
export  const searchOpenBrewDB = (query) => {
   return fetch(`https://api.openbrewerydb.org/breweries?by_city=${query}`)
                .then(response => response.json())
                .then(data => {
                   return data.filter( x => query.toLowerCase() === x.city.toLowerCase())
                })

  };
 

let userIP = "";
let userLat = 0;
let userLon = 0;
let completeDirections = [];
// let key = "2qYjtOeeuEawxxQE7KUtVZQFywO4pRvN";

export function userLocation() {
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
export function directions() {
    fetch("https://api.tomtom.com/routing/1/calculateRoute/" + userLat + "%2C" + userLon + "%3A30.3079827%2C-97.8934853/json?instructionsType=text&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleCommercial=false&key=2qYjtOeeuEawxxQE7KUtVZQFywO4pRvN").then(function(response){
                  if(response.ok){
                      response.json().then(function(data){
                        let instructions=data.routes[0].guidance.instructions;

              for (let i = 0; i < instructions.length; i++) {

            let stop = instructions[i].message;
            completeDirections.push(stop);

  };
  console.log(completeDirections);
                     });
                  }
              });
            }
      
  
  // userLocation();