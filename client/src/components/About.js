import React, { Component } from 'react';
export default class About extends Component {
  render() {
    return (
      <section id="about">
         <div className="row">

            <div className="three columns">
            </div>

            <div className="columns main-col">
            <h1 style={{textAlign: "center", color:'#ebba34'}}>Find A Brewery Near You!</h1>
            </div>
            </div>
            <br></br>
            <br></br>
            <div>
            <div className="columns main-col drinkbutton">
            <button id="aboutButton" style={{textAlign: "center" ,color:'#ebba34'}} class="ui huge inverted yellow button">GET DRINKING!</button>
                     </div>
                     </div>
      </section>
    );
  }
}