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
                .then(data => data)
  };
  