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
    const [deleteId, setDeleteId] = useState('');
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
      const {loading: deleteLoad, error: deleteError, data: deleteData} = useQuery(QUERY_BREWERY_BY_ID, {
        variables:{ name: deleteId}
      })
    //   console.log(deleteThisBrewery)
    //   console.log(deleteData)
    // console.log(allData)
    // console.log(userData)

    useEffect(() => {
      if(deleteThisBrewery){
        const index = savedBreweries.indexOf(deleteThisBrewery)
        console.log(index)
        if (index > -1) {
          savedBreweries.splice(index, 1);
        }
        setSavedBreweries(savedBreweries)
          idbPromise('saved-brewery', 'delete', deleteThisBrewery);
      }
      if(!loading) {
        idbPromise('saved-brewery', 'get').then((brewery) => {
          setSavedBreweries(brewery)
         });
        };
      }, [deleteThisBrewery, loading]);
  
    const displayBreweries = async (event) => {
        event.preventDefault()
        if(userData.me.breweries){
            const savedBreweries = userData.me.breweries;
            console.log(savedBreweries)
            setSavedBreweries(savedBreweries)
        }
    }

    const handleDeleteBrewery = async (e,breweryId) => {

        if(breweryId.length){
            console.log(breweryId)
            const token = Auth.loggedIn() ? Auth.getToken() : null;
            if (!token) {
              return false;
            }
          try{
            const userId = Auth.getProfile().data._id
            const response = await deleteBrewery(
                { 
                  variables:{
                    brewId: breweryId,
                    id: userId
                  }
                }
            );
            displayBreweries(e)
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
          style={{ margin: "0 auto 40px auto"}}
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
      </div>
        <Grid centered doubling stackable columns={3} >
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
                        setDeleteId(brewery._id)
                        setDeleteBrewery(brewery)
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
                      :"Hello"}
                    {/* )} */}
                    </div>
                  </Card>
                </GridColumn>
              );
            })
            : <h3
              style={{color: 'white'}}
            >Your saved breweries will display here!</h3>
              }
          </Grid>
    </section>
  );

}

export default Dashboard;