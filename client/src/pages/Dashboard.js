import React, { useState, useEffect } from "react";
import {Form, Button, Card, List, Grid, GridColumn, Menu} from 'semantic-ui-react'
import { useMutation, useQuery } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { formatPhone, idbPromise } from '../utils/helpers'
import Modal from '../components/Modal'
import {QUERY_ME, QUERY_ALL_BREWERIES, QUERY_BREWERY, QUERY_BREWERY_BY_ID} from '../utils/queries'
import {REMOVE_BREWERY_FROM_USER} from '../utils/mutations'

import { set } from "lodash";


function Dashboard() {
    const[deleteBrewery] = useMutation(REMOVE_BREWERY_FROM_USER)
    const [user, setUser] = useState('');
    const [savedBreweries, setSavedBreweries] = useState([]);
    const [savedBreweryIds, setSavedBreweryIds] = useState('1');
    const[deleteThisBrewery, setDeleteBrewery] = useState('')
    const userID = Auth.getProfile().data._id;
    const {loading: userLoading, error: userError, data: userData} = useQuery(QUERY_ME, {
        variables:{ id: userID}
      })
    const { data:allData} = useQuery(QUERY_ALL_BREWERIES, {

        pollInterval: 500,
    });
    const {loading, error, data} = useQuery(QUERY_BREWERY, {
        variables:{ name: deleteThisBrewery}
      })
    console.log(allData)
    console.log(userData)

    useEffect(() => {
      if(userData) {
        userData.me.breweries.forEach((brewery) => {
          console.log(brewery)
          idbPromise('saved-brewery', 'put', brewery);
        });
      } 
    }, [data, loading]);
  
    const displayBreweries = async (event) => {
        event.preventDefault()
        if(userData.me.breweries){
            const savedBreweries = userData.me.breweries;
            console.log(savedBreweries)
            setSavedBreweries(savedBreweries)

           

            
        }
    }

    const handleDeleteBrewery = async (breweryId) => {

        if(breweryId.length){
            console.log(breweryId)
          try{
            const token = Auth.loggedIn() ? Auth.getToken() : null;
            
            if (!token) {
              return false;
            }
            
            const userId = Auth.getProfile().data._id
            const response = await deleteBrewery(
                { 
                  variables:{
                    brewId: breweryId,
                    id: userId
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
    // displayBreweries()
  return (
    <section style={{height: '100vh'}} id='savedbrewpage'>
    <div className="dashboard">
       <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 style={{color:'#ebba34', textAlign:'center'}}>Your Saved Breweries</h1>
      <br></br>
      <div 
        className="columns main-col drinkbutton"
        style={{
            margin: "0 auto 40px auto"
        }}
            >
                  <Button 
                    
                    id='user-brewery' 
                    type='submit'
                    onClick={(e) => displayBreweries(e)} 
                    style={{textAlign: "center"}}
                    className="ui huge yellow button centered">
                    SHOW ME MY SAVED BREWS
                  </Button>
               </div>
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
                    //   disabled={savedBreweryIds?.some((savedBreweryId) => savedBreweryId === brewery.breweryId)}
                      onClick={() =>{
                      handleDeleteBrewery(brewery._id)

                      // saveToUser(brewery)
                      }}>
                      {/* {savedBreweryIds?.some((savedBreweryId) => savedBreweryId === brewery.breweryId) */}
                        delete 
                       
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
          : <h3></h3>
            }

        </Grid>

    </div>
    </section>
  );

}

export default Dashboard;