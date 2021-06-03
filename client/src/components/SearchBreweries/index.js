import React, { useState, useEffect} from 'react';
// import _ from 'lodash'
import {Form, Button, Card, List, Grid, GridColumn, Menu} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import Auth from '../../utils/auth'
import {saveBrewery, searchByCity, searchByState, searchByTerm, searchNearUser, directions } from '../../utils/API'
import { saveBreweryIds, getSavedBreweryIds } from '../../utils/localStorage'
import {ADD_BREWERY_TO_DB, SAVE_BREWERY_TO_USER} from '../../utils/mutations'
import { add } from 'lodash';
import { formatPhone } from '../../utils/helpers';

let pageNum = 1;

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
  //holds the last used search input
  const [lastSearched, setLastSearched] = useState("")
  
  
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

    if (!searchInput && !lastSearched) {
      return false;
    }

    try {
      if(searchInput.length){
        setLastSearched(searchInput)
      }

      let response ;

      switch(searchType){
        case 'city':
          if(searchInput){
            response = await searchByCity(searchInput, pageNum);
          } else if (lastSearched) {
            response = await searchByCity(lastSearched, pageNum);
          } 
          break;
        case 'state':
          if(searchInput){
            response = await searchByState(searchInput, pageNum);
          } else if (lastSearched) {
            response = await searchByState(lastSearched, pageNum);
          }
          break;
        case 'keyword':
          if(searchInput){
            response = await searchByTerm(searchInput, pageNum);
          } else if (lastSearched) {
            response = await searchByTerm(lastSearched, pageNum);
          }
          break;
        default:
          response = await searchNearUser(pageNum);  
      }

      if(response.length){
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
      } else {
        setSearchedBrewery([])
      }
      
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

  const handlePageChange =  async (e,name) => {
    if (name === "next") {
      //setPageNumber(pageNumber + 1)
      pageNum++
      handleFormSubmit(e)
      console.log(pageNum)
    } else {
      //setPageNumber(pageNumber - 1)
      pageNum--
      handleFormSubmit(e)
    }
    
  }

  
  return (
    <>
          <div className="columns main-col drinkbutton">
            <Button 
              id="aboutButton" 
              onClick={handleFormSubmit} 
              className="ui huge yellow button"

              >GET DRINKING!!</Button>
          </div>
          <Form onSubmit={handleFormSubmit}>
              <Form.Group widths='equal'>
            
                  <Form.Input
                    name='searchInput'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder='Search for a Brewery'
                  />
                  
                  <Form.Select
                    fluid
                    options={options}
                    // required={true}
                    placeholder='Search for breweries by...'
                    onChange={(e, { value }) => setSearchType(value)}
                  />
         
              </Form.Group>
              <Button className="ui reset button" id='city' type='submit'>Search For Beer!</Button>
          </Form>

        <h2>
          {searchedBreweries.length
            ? `Viewing results ${1 +(20 * (pageNum -1))} - ${(20 * (pageNum - 1)) + searchedBreweries.length} :`
            : 'Search for a Brewery to begin'}
        </h2>
        <Grid centered stackable columns={3} >
          {searchedBreweries.length 
          ? 
          searchedBreweries.map((brewery) => {
            return (
              <GridColumn centered="true">  
              <Card centered key={brewery.breweryId}>
                <h3 style={{textAlign:'center'}}>{brewery.name}</h3>
                <List>
                  <List.Item>Type: {brewery.breweryType}</List.Item>
                  {brewery.street.length ?
                   <List.Item>Street: {brewery.street}</List.Item>
                   : ""}
                  <List.Item>City: {brewery.city}</List.Item>
                  <List.Item>State: {brewery.state}</List.Item>
                  {brewery.phone.length ? <List.Item>Phone Number: {formatPhone(brewery.phone)}</List.Item> : ""}
                  {brewery.websiteUrl.length ? 
                  <List.Item>Website: <a href={brewery.websiteUrl} target='_blank'  rel="noreferrer" >{brewery.websiteUrl}</a></List.Item> : ""}
                  
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
                    {brewery.latitude && brewery.longitude ? 
                      <Button
                        // disabled={savedBreweryIds?.some((savedBreweryId) => savedBreweryId === brewery.breweryId)}
                        onClick={() => {directions(brewery.latitude, brewery.longitude) }}>
                          <p>Directions</p>
                      </Button>
                    : ""}
                    
                  {/* )} */}
              </Card>
              </GridColumn>
            );
          })
          : ""}
          {!searchedBreweries.length && pageNum > 1 ?
          "No more breweries to display"
          :
          ""}
        </Grid>
        <Menu inverted >
          {pageNum > 1 ? 
            <Menu.Item
              name="prev"
              onClick={(e, { name }) => handlePageChange(e,name)}
            >
              <Button color="yellow">
                <p>Previous Page</p>
              </Button>
            </Menu.Item>
          : ""}
          {searchedBreweries.length ? 
            <Menu.Menu position="right">
              <Menu.Item
                name="next"
                onClick={(e, { name }) => handlePageChange(e,name)}
              >
                <Button color="yellow">
                  <p>Next Page</p>
                </Button>
              </Menu.Item>
            </Menu.Menu>
          : ""}
        </Menu>       
    </>
  );
};

export default SearchBreweries;
