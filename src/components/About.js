import React, { Component } from 'react';
export default class About extends Component {
  render() {
    return (
      <section id="about">
         <div className="row">

            <div className="three columns">
            </div>

            <div className="columns main-col">

               <h1 style={{textAlign: "center" ,color:'#ebba34'}}>Whether You're Travelling Or A Local Find A Brewery Near You!</h1>
            </div>
            <br></br>
            <br></br>
            <div className="columns main-col drinkbutton">
            <button id="aboutButton" style={{textAlign: "center" ,color:'#ebba34'}} class="ui massive inverted yellow button">GET DRINKING!</button>
                     </div>
                     </div>
      </section>
    );
  }
}