import React, { useState, useEffect} from 'react';
import Modal from '../Modal/index'
// import _ from 'lodash'
import {Form, Button, Card, List, Grid, GridColumn, Menu} from 'semantic-ui-react'
import {useMutation, useQuery} from '@apollo/react-hooks'
import Auth from '../../utils/auth'
import {directions, saveBrewery, searchByCity, searchByState, searchByTerm, searchNearUser} from '../../utils/API'
import { saveBreweryIds, getSavedBreweryIds } from '../../utils/localStorage'
import {ADD_BREWERY_TO_DB, SAVE_BREWERY_TO_USER} from '../../utils/mutations'
import {QUERY_ALL_BREWERIES, QUERY_BREWERY, QUERY_ME, QUERY_BREWERIES_NO_ID} from '../../utils/queries'
import { add, xor } from 'lodash';
import { formatPhone , idbPromise} from '../../utils/helpers';

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
  const [lastSearched, setLastSearched] = useState('')
  const[savedBrewery, setSavedBrewery] = useState('')

  const {loading: userLoading, error: userError, data: userData} = useQuery(QUERY_ME, {
    variables:{ id: 'Auth.getProfile().data._id'}
  })
  const {loading, error, data} = useQuery(QUERY_BREWERY, {
    variables:{ name: savedBrewery}
  })
  const { data:allData} = useQuery(QUERY_ALL_BREWERIES, {

    // pollInterval: 500,
  });

  const { data: noIDBreweries} = useQuery(QUERY_BREWERIES_NO_ID, {

    // pollInterval: 500,
  });
  // console.log(Auth.loggedIn())

  useEffect(() => {
    if(allData) {
      allData.breweries.forEach((brewery) => {
        idbPromise('searched-brewery', 'put', brewery);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
      // since we're offline, get all of the data from the `brewery` store
      idbPromise('searched-brewery', 'get').then((brewery) => {
       setSearchedBrewery(brewery)
      });
    }
  }, [data, loading]);

  useEffect(() => {
     if(savedBrewery){
    handleSaveBrewery(savedBrewery)
  }
    if(userData) {
      userData.me.breweries.forEach((brewery) => {
        console.log(brewery)
        idbPromise('saved-brewery', 'put', brewery);
      });
    } 
  }, [data, loading]);

  
  const options = [
    { key: 'city', text: 'City', value: 'city' },
    { key: 'state', text: 'State', value: 'state' },
    { key: 'keyword', text: 'Keyword', value: 'keyword' },
  ]

  const handleUserLoc = async (event) => {
    event.preventDefault();

    setSearchInput('')
    setLastSearched('')
    try {
      const response = await searchNearUser(pageNum);
     
      console.log(response)
      if(response.length){
        
          const breweryData = response.map((brewery) => (
            {
            breweryID: brewery.id,
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
          const filterData = []
          console.log(searchedBreweries)
          console.log(noIDBreweries.breweries)
          console.log(breweryData)

          setSearchedBrewery(breweryData);
          
          if(searchedBreweries){
              noIDBreweries.breweries.map(brewery => {
              
                console.log(brewery)
                const index = searchedBreweries.indexOf(brewery)
                console.log(index)
                // if (index > -1) {
                //   savedBreweries.splice(index, 1);
                // }
            })
          }
          
        console.log(breweryData)
        console.log(filterData)
        const saveToDB = response.map((brewery) => 
         addBrewery(
           {
             variables:
              {
                breweryID: brewery.id,
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
              }
             
           }
        
         ));
        console.log(breweryData)
        
      } else {
        setSearchedBrewery([])
      }
      
      setSearchInput('');
      // console.log('YES')
      }
      catch (err) {
        console.error(err.graphQLErrors);
      }

  }
  // create method to search for Breweries and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();


    if (!searchInput && !lastSearched) {
      return false;
    }

    try {
      if(searchInput.length){
        if(searchInput !== lastSearched) {
          pageNum = 1
        }
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
      }
      
      if(response.length){
        
        const breweryData = response.map((brewery) => (
          {
          breweryID: brewery.id,
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
        const filterData = []
        console.log(searchedBreweries)
        console.log(noIDBreweries.breweries)
        console.log(breweryData)

        setSearchedBrewery(breweryData);
        
        if(searchedBreweries){
            noIDBreweries.breweries.map(brewery => {
            
              console.log(brewery)
              const index = searchedBreweries.indexOf(brewery)
              console.log(index)
              // if (index > -1) {
              //   savedBreweries.splice(index, 1);
              // }
          })
        }
        
      console.log(breweryData)
      console.log(filterData)
      const saveToDB = response.map((brewery) => 
       addBrewery(
         {
           variables:
            {
              breweryID: brewery.id,
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
            }
           
         }
      
       ));
      console.log(breweryData)
      
    } else {
      setSearchedBrewery([])
    }
    
    setSearchInput('');
    // console.log('YES')
    }
    catch (err) {
      console.error(err.graphQLErrors);
    }

}


  // create function to handle saving a Brewery to our database
  const handleSaveBrewery = async (brewery) => {
    // debugger;
    if(brewery.length){

      try{
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        const brewId = data.brewery._id;
        console.log(data)
        console.log(brewId)
        if (!token) {
          return false;
        }
        const userID = Auth.getProfile().data._id;

        const response = await saveBrewery(
            { 
              variables:{
                brewId: brewId,
                id: userID
              }
            }
        );
        console.log(response)
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
      }catch (err) {
        console.error(err);
      }
  

    }
  };

  const handlePageChange =  async (e,name) => {
    if (name === "next") {
      //setPageNumber(pageNumber + 1)
      pageNum++
      if(!searchInput && !lastSearched){
        handleUserLoc(e)
      } else {
        handleFormSubmit(e)
      }
    } else {
      //setPageNumber(pageNumber - 1)
      pageNum--
      if(!searchInput && !lastSearched){
        handleUserLoc(e)
      } else {
        handleFormSubmit(e)
      }
    }
  }
 
  
  return (
    <>
    <section  id="about">
      <div className="columns main-col drinkbutton"> 
        </div>
          <Form onSubmit={handleFormSubmit} id='submit'>
            <Grid centered doubling stackable columns={3}>
              <Grid.Column>          
                <div class="ui segment contactform inverted" >
                  <h1 style={{textAlign: "center", color: '#ebba34'}}>Find Your Brewery</h1>
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
                  <br></br>
                <div className="columns main-col drinkbutton">
                  <Button 
                    // centered
                    id='city' 
                    type='submit'
                    // onClick={handleFormSubmit} 
                   
                    className="ui huge yellow button">
                    GET DRINKING!!
                  </Button>
               </div>
               <br></br>
               <div className="columns main-col drinkbutton">
                  <Button 
                    // centered
                    id='city' 
                    onClick={(e) => handleUserLoc(e)} 
                    className="ui huge yellow button">
                    FIND NEAREST BREWERY
                  </Button>

                </div>
              </div>
          </Grid.Column>
        </Grid>
      </Form>      

        <h2>
          {searchedBreweries.length
            ? `Viewing results ${1 + (20 * (pageNum -1))} - ${searchedBreweries.length + (20 * (pageNum - 1))}:`
            : ''}
        </h2>
        <Grid centered doubling stackable columns={3} >
          {searchedBreweries.length 
          ? 
          searchedBreweries.map((brewery) => {
            return (
              <GridColumn centered="true">  
              <Card centered key={brewery.breweryId}>
                <h2 style={{textAlign:'center', color:'#ebba34'}}>{brewery.name}</h2>
                <List>
                  <List.Item className='beercard-output'><strong>Type:  </strong> {brewery.breweryType}</List.Item>
                  {brewery.street ? 
                    <List.Item className='beercard-output'><strong> Street:  </strong>{brewery.street}</List.Item>
                  :""}
                  <List.Item className='beercard-output'><strong> City:  </strong>{brewery.city}</List.Item>
                  <List.Item className='beercard-output'><strong> State:  </strong>{brewery.state}</List.Item>
                  {brewery.phone ? 
                    <List.Item className='beercard-output'><strong> Phone Number:  </strong> {formatPhone(brewery.phone)}</List.Item>
                  : ""}
                  {brewery.websiteUrl ? 
                    <List.Item className='beercard-output'><strong> Website:  </strong> <a style={{color:'#2432d1'}} href={brewery.websiteUrl} target='_blank'  rel="noreferrer" >{brewery.websiteUrl}</a></List.Item>
                  : ""}
               <br></br>
                </List>
                  {/* {Auth.loggedIn() && ( */}
                    
                  <div className='ui large buttons'>
                    <Button className ='ui yellow button' style={{color:'#f2f0f0'}}
                      // disabled={savedBreweryIds?.some((savedBreweryId) => savedBreweryId === brewery.breweryId)}
                      onClick={() =>{
                        console.log(brewery.name)
                      setSavedBrewery(brewery.name)
                      handleSaveBrewery(brewery)

                      // saveToUser(brewery)
                      }}>
                      {savedBreweryIds?.some((savedBreweryId) => savedBreweryId === brewery.breweryId)
                        ? 'This Brewery has already been saved!'
                        : 'save brewery'}
                    </Button>
                    {brewery.latitude && brewery.longitude ? 
                      <>
                       
                       <Button className ='ui yellow button'
                         // disabled={savedBreweryIds?.some((savedBreweryId) => savedBreweryId === brewery.breweryId)}
                        >
                          <p ><Modal lat={brewery.latitude} lon={brewery.longitude} /></p>
                       </Button>
                       </>
                    :""}
                   
                  {/* )} */}
                  </div>
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
        </section>
    </>
  );
};

export default SearchBreweries;
