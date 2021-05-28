export const getSavedBreweryIds = () => {
    const savedBreweryIds = localStorage.getItem('saved_breweries')
      ? JSON.parse(localStorage.getItem('saved_breweries'))
      : [];
  
    return savedBreweryIds;
  };
  
  export const saveBreweryIds = (breweryIdArr) => {
    if (breweryIdArr.length) {
      localStorage.setItem('saved_breweries', JSON.stringify(breweryIdArr));
    } else {
      localStorage.removeItem('saved_breweries');
    }
  };
  
  export const removeBreweryId = (breweryId) => {
    const savedBreweryIds = localStorage.getItem('saved_breweries')
      ? JSON.parse(localStorage.getItem('saved_breweries'))
      : null;
  
    if (!savedBreweryIds) {
      return false;
    }
  
    const updatedSavedBreweryIds = savedBreweryIds?.filter((savedBreweryId) => savedBreweryId !== breweryId);
    localStorage.setItem('saved_breweries', JSON.stringify(updatedSavedBreweryIds));
  
    return true;
  };
  