import React, { useState, useEffect } from 'react';
import {Form, Button, Card, List, Grid, GridColumn} from 'semantic-ui-react'

import Auth from '../../utils/auth'
import { saveBrewery, searchOpenBrewDB, userLocation } from '../../utils/API'
import { saveBreweryIds, getSavedBreweryIds } from '../../utils/localStorage'

const SearchBreweries = () => {

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
      const response = await searchOpenBrewDB(searchInput);
      console.log(searchInput)
      console.log(response);
      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }


      const breweryData = response.map((brewery) => ({
        breweryId: brewery.id,
        name: brewery.name,
        breweryType: brewery.brewery_type,
        street: brewery.street || ['No street to display'],
        address2: brewery.address_2,
        address3: brewery.address_3,
        city: brewery.city,
        state: brewery.state,
        countyProvince: brewery.county_province,
        postalCode: brewery.postal_code,
        country: brewery.country,
        longitude: brewery.longitude,
        latitude: brewery.latitude,
        phone: brewery.phone || ['No phone number to display'],
        websiteUrl: brewery.website_url || ['No webpage to display']
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
     console.log(breweryToSave)
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
          <Form onSubmit={handleFormSubmit}>
            <Form.Field>
              <input 
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type='text'
                size='lg'
                placeholder='Search for a Brewery'>
              </input>
            </Form.Field>

            <Button type='submit'>Submit Search</Button>
          </Form>

        <h2>
          {searchedBreweries.length
            ? `Viewing ${searchedBreweries.length} results:`
            : 'Search for a Brewery to begin'}
        </h2>
        <Grid centered stackable columns={3} >
          {searchedBreweries.map((brewery) => {
            return (
              <GridColumn centered>  
              <Card centered key={brewery.breweryId}>
                <h3 style={{textAlign:'center'}}>{brewery.name}</h3>
                <List>
                  <List.Item>Type: {brewery.breweryType}</List.Item>
                  <List.Item>Street: {brewery.street}</List.Item>
                  <List.Item>City: {brewery.city}</List.Item>
                  <List.Item>State: {brewery.state}</List.Item>
                  <List.Item>Phone Number: {brewery.phone}</List.Item>
                  <List.Item>Website: <a href={brewery.websiteUrl} target='_blank'  rel="noreferrer" >{brewery.websiteUrl}</a></List.Item>
                </List>
                  {/* {Auth.loggedIn() && ( */}
                    <Button
                      // disabled={savedBreweryIds?.some((savedBreweryId) => savedBreweryId === brewery.breweryId)}
                      onClick={() => {handleSaveBrewery(brewery.breweryId) 
                        console.log(brewery.breweryId)}}>
                      {savedBreweryIds?.some((savedBreweryId) => savedBreweryId === brewery.breweryId)
                        ? 'This Brewery has already been saved!'
                        : 'Save this Brewery!'}
                    </Button>
                    <Button
                      // disabled={savedBreweryIds?.some((savedBreweryId) => savedBreweryId === brewery.breweryId)}
                      onClick={() => {{ userLocation() }}}>
                         <p>Directions</p>
                    </Button>
                  {/* )} */}
              </Card>
              </GridColumn>

            );
          })}
        </Grid>
    </>
  );
};

export default SearchBreweries;
