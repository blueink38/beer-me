import React, { useState, UseEffect } from "react";
import {Form, Button, Card, List, Grid, GridColumn, Menu} from 'semantic-ui-react'
import { useMutation, useQuery } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { formatPhone } from '../utils/helpers'
import Modal from '../components/Modal'
import {QUERY_ME, QUERY_ALL_BREWERIES, QUERY_BREWERY, QUERY_BREWERY_BY_ID} from '../utils/queries'


function Signup() {
    const [user, setUser] = useState('');
    const [savedBreweries, setSavedBrewery] = useState([]);
    const [savedBreweryIds, setSavedBreweryIds] = useState('');
    const userID = Auth.getProfile().data._id;
    const {loading: userLoading, error: userError, data: UserBrews} = useQuery(QUERY_ME, {
        variables:{ id: userID}
      })
    const { data:allBreweries} = useQuery(QUERY_ALL_BREWERIES, {

        pollInterval: 500,
    });
    console.log(allBreweries)
    console.log(UserBrews)
    const displayBreweries = async () => {
        if(UserBrews.me.breweries){
            const brewIDs = UserBrews.me;
            console.log(brewIDs)
            const userBreweries = []
            for(let i = 0; i < brewIDs.length; i++){
                debugger;
                allBreweries.breweries.filter(brewery =>{
                    if(brewIDs[i] = brewery.id){
                        console.log('ok')
                    }
                })
                
            }
            
            
        }
    }
    displayBreweries()
  return (
    <section style={{height: '100vh'}} id='loginsignuppage'>
    <div className="dashboard">
       <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 style={{color:'#ebba34', textAlign:'center'}}>Your Saved Breweries</h1>
      <br></br>
      
      <Grid centered stackable columns={3} >
          {savedBreweries.length 
          ? 
          savedBreweries.map((brewery) => {
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
                      setSavedBrewery(brewery.name)

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
          : <h3
            style={{
                background: "rgba(0,0,0,.6)",
                color: 'white',
                margin: '0 20%'
                
            }}
          >Someone is due for a beer trip! Go check out some breweries!<br></br>
           Save the ones you like, and see them here!</h3>}

        </Grid>

    </div>
    </section>
  );

}

export default Signup;