import React, { useState, useEffect } from 'react';
import {} from '../'

const SearchBrewery = () => {

  const openBrewDB = (query) => {
    return fetch(`https://api.openbrewerydb.org/breweries?by_city=${query}`);
  };
  // create state for holding returned openBrewery api data
  const [searchedBreweries, setSearchedBrewery] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved BreweryId values
  const [savedBreweryIds, setSavedBreweryIds] = useState(getSavedBreweryIds());

  // set up useEffect hook to save `savedBreweryIds` list to localStorage on component unmount
  useEffect(() => {
    return () => saveBreweryIds(savedBreweryIds);
  });

  // create method to search for Breweries and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await openBrewDB(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const breweryData = items.map((brewery) => ({
        breweryId: brewery.id,
        name: brewery.name,
        type: brewery.brewery_type,
        street: brewery.street || ['No street to display'],
        city: brewery.city || '',
        state: brewery.state,
        phone: brewery.phone || ['No phone number to display'],
        url: brewery.website_url || ['No webpage to display']
      }));

      setSearchedBrewery(breweryData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a Brewery to our database
  const handleSaveBrewery = async (breweryId) => {
    // find the Brewery in `searchedBreweries` state by the matching id
    const breweryToSave = searchedBreweries.find((brewery) => brewery.breweryId === breweryId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveBrewery(breweryToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if Brewery successfully saves to user's account, save Brewery id to state
      setSavedBreweryIds([...savedBreweryIds, breweryToSave.breweryId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
          <h1>Search for Breweries!</h1>
          <form onSubmit={handleFormSubmit}>
            <input 
              name='searchInput'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type='text'
              size='lg'
              placeholder='Search for a Brewery'
              type="text">

            </input>
            <button type='submit'>Submit Search</button>
          </form>

        <h2>
          {searchedBreweries.length
            ? `Viewing ${searchedBreweries.length} results:`
            : 'Search for a Brewery to begin'}
        </h2>
          {searchedBreweries.map((Brewery) => {
            return (
              <Card key={Brewery.BreweryId} border='dark'>
                {Brewery.image ? (
                  <Card.Img src={Brewery.image} alt={`The cover for ${Brewery.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{Brewery.title}</Card.Title>
                  <p className='small'>Authors: {Brewery.authors}</p>
                  <Card.Text>{Brewery.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBreweryIds?.some((savedBreweryId) => savedBreweryId === Brewery.BreweryId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBrewery(Brewery.BreweryId)}>
                      {savedBreweryIds?.some((savedBreweryId) => savedBreweryId === Brewery.BreweryId)
                        ? 'This Brewery has already been saved!'
                        : 'Save this Brewery!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
    </>
  );
};

export default SearchBrewery;
