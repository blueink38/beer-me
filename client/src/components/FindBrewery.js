import React, { Component } from 'react';
import SearchBreweries from './SearchBreweries'

export default class FindBrewery extends Component {
  render() {
    return (
      <section id="about">
         <div>
            <div id='brewfind'className="breweryfinder">
            <h1 style={{textAlign: "center", color:'#EBBA34'}}>Find A Brewery Near You!</h1>
            </div>
            <SearchBreweries />
            </div>
            <br></br>
            <br></br>
            <div>
            
                     </div>
      </section>
    );
  }
}