import React, { useState, useEffect} from 'react';
// import _ from 'lodash'
import {Form, Button, Card, List, Grid, GridColumn} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import Auth from '../../utils/auth'
import {saveBrewery, searchByCity, searchByState, searchByTerm, searchNearUser, directions } from '../../utils/API'
import { saveBreweryIds, getSavedBreweryIds } from '../../utils/localStorage'
import {ADD_BREWERY_TO_DB, SAVE_BREWERY_TO_USER} from '../../utils/mutations'
import { formatPhone } from '../../utils/helpers';

const SearchBreweries = () => {
//  searchNearUser()
  const[addBrewery] = useMutation(ADD_BREWERY_TO_DB);
  const[saveBrewery] = useMutation(SAVE_BREWERY_TO_USER)
  // create state for holding returned openBrewery api data
  const [searchedBreweries, setSearchedBrewery] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state for holding our search field data
  const [searchType, setSearchType] = useState('');
  // create state to hold saved BreweryId values
  const [savedBreweryIds, setSavedBreweryIds] = useState(getSavedBreweryIds());
  
  // set up useEffect hook to save `savedBreweryIds` list to localStorage on component unmount
  useEffect(() => {
    return () => saveBreweryIds(savedBreweryIds);
  });
  const options = [
    { key: 'city', text: 'City', value: 'city' },
    { key: 'state', text: 'State', value: 'state' },
    { key: 'keyword', text: 'Keyword', value: 'keyword' },
  ]
  // create method to search for Breweries and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(event.type)

    // if (!searchInput) {
    //   return false;
    // }

    try {
      // debugger;
      console.log(searchType)
      
      let response ;
        switch(event.type){
          case 'click':
            response = await searchNearUser();
          case 'submit':
            switch(searchType){
              case 'city':
                response = await searchByCity(searchInput);
                break;
              case 'state':
                response = await searchByState(searchInput);
                break;
              case 'keyword':
                response = await searchByTerm(searchInput);
                break;             
            }
        }
      
   

      // console.log(searchInput)
      console.log(response);
      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }


      const breweryData = response.map((brewery) => ({
        breweryId: brewery.id,
        name: brewery.name,
        breweryType: brewery.brewery_type,
        street: brewery.street || "",
        address2: brewery.address_2,
        address3: brewery.address_3,
        city: brewery.city,
        state: brewery.state,
        countyProvince: brewery.county_province,
        postalCode: brewery.postal_code,
        country: brewery.country,
        longitude: brewery.longitude,
        latitude: brewery.latitude,
        phone: brewery.phone || "",
        websiteUrl: brewery.website_url || ""
      }));


      setSearchedBrewery(breweryData);
      // addBrewery(breweryData)
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a Brewery to our database
  const handleSaveBrewery = async (brewery) => {
    // find the Brewery in `searchedBreweries` state by the matching id
    // const breweryToSave = searchedBreweries.find((brewery) => brewery.breweryId === breweryId);
     console.log(brewery)
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveBrewery(brewery, token);
      console.log(response)
// add brewery using brewery ID
      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if Brewery successfully saves to user's account, save Brewery id to state
      // setSavedBreweryIds([...savedBreweryIds, breweryToSave.breweryId]);
    } catch (err) {
      console.error(err);
    }
  };

 
  
 
  
  return (
    <>
          <div className="columns main-col drinkbutton">
            <Button 
              id="aboutButton" 
              onClick={handleFormSubmit} 
              className="ui huge yellow button"

              >GET DRINKING!!</Button>
          </div>
      <div className="columns main-col drinkbutton"> 
        </div>
          <Form onSubmit={handleFormSubmit}>
            <Grid id='find-brewery' centered columns={2}>
              <Grid.Column>          
                <div class="ui segment contactform inverted" >
                  <h2 style={{textAlign: "center", color: '#ebba34'}}>New Search Brewery Section</h2>
                  <br></br>
                  <Form.Group>
                    <Form.Input
                      width={8}
                      name='searchInput'
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder='Search for a Brewery'
                    />
                  <Form.Select
                    fluid
                    options={options}
                    width={8}
                    // required={true}
                    placeholder='Search for breweries by...'
                    onChange={(e, { value }) => setSearchType(value)}
                    />
                  </Form.Group>
                <div className="columns main-col drinkbutton">
                  <Button 
                    centered
                    id='city' 
                    type='submit'
                    // onClick={handleFormSubmit} 
                    className="ui huge yellow button">
                    GET DRINKING!!
                  </Button>
                  <Button 
                    centered
                    id='city' 
                    type='submit'
                    // onClick={handleFormSubmit} 
                    className="ui huge yellow button">
                    GET LUCKY!!
                  </Button>

                </div>
              </div>
          </Grid.Column>
        </Grid>
      </Form>      

        <h2>
          {searchedBreweries.length
            ? `Viewing ${searchedBreweries.length} results:`
            : ''}
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
                      onClick={() => {handleSaveBrewery(brewery) 
                        console.log(brewery)}}>
                      {savedBreweryIds?.some((savedBreweryId) => savedBreweryId === brewery.breweryId)
                        ? 'This Brewery has already been saved!'
                        : 'Save this Brewery!'}
                    </Button>
                    <Button
                      // disabled={savedBreweryIds?.some((savedBreweryId) => savedBreweryId === brewery.breweryId)}
                      onClick={() => {directions(brewery.latitude, brewery.longitude) }}>
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
