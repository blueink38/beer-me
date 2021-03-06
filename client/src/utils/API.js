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
  
let userIP = "";
let userLat = 0;
let userLon = 0;
let completeDirections = new Set;
let breweriesNearMe =[];

 
  
 
  // make a search to open brew api
export  const searchByCity = (query, page) => {
    return fetch(`https://api.openbrewerydb.org/breweries?by_city=${query}&page=${page}`)
        .then(response => response.json())
        .then(data => {
          //console.log(data)
             return data.filter( x => query.toLowerCase() === x.city.toLowerCase())
        })
     }; 

export  const searchByState = (query, page) => {
    return fetch(`https://api.openbrewerydb.org/breweries?by_state=${query}&page=${page}`)
        .then(response => response.json())
        .then(data => {
          // console.log(data)

           return data

      })
}; 

export  const searchByTerm = (query, page) => {
  return fetch(`https://api.openbrewerydb.org/breweries/search?query=${query}&page=${page}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data)

         return data

    })
}; 

export  const searchNearUser = (page) => {
  fetch("https://api.ipify.org/?format=json").then(function(response) {
    if(response.ok){
        response.json().then(function(data){
           userIP = data.ip 

            //uses ip address to get physical location data
            return fetch("https://ipapi.co/" + userIP + "/json")
        }).then(function(response){
          console.log(response)
            if(response.ok){
                response.json().then( function(data){
                    //save location data for future use
                    userLat = data.latitude;
                    userLon = data.longitude;
                    // console.log(userLat, userLon);
                    fetch(`https://api.openbrewerydb.org/breweries?by_dist=${userLat},${userLon}&page=${page}`)
                    .then(response => response.json())
                    .then(data => {
                      // console.log(data)
                      if(breweriesNearMe.length){
                        breweriesNearMe= []
                      }
                      data.map( x => {
                        breweriesNearMe.push(x)
                      })
                      // console.log(breweriesNearMe)
                  })
                  });
              }
          });
      }
  })
  // console.log(breweriesNearMe)
  return breweriesNearMe
}; 
searchNearUser()
 
export function directions(latitude, longitude) {
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);
  completeDirections.clear()
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
            fetch("https://api.tomtom.com/routing/1/calculateRoute/" + userLat + "%2C" + userLon + "%3A" + lat + "%2C" + lon + "/json?instructionsType=text&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleCommercial=false&key=2qYjtOeeuEawxxQE7KUtVZQFywO4pRvN").then(function(response){
              if(response.ok){
                response.json().then(function(data){
                  let instructions=data.routes[0].guidance.instructions;                                             
                  for (let i = 0; i < instructions.length; i++) {
                    let stop = instructions[i].message;
                    completeDirections.add(stop);
                  };
                });
              }
              else {
                console.log("wooooooooow")
              }
            });
          });
        }
      });
    } 
  })  
  return completeDirections 
};

