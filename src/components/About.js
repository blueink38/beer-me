import React, { Component } from 'react';
export default class About extends Component {
  render() {
    return (
      <section id="about">
         <div className="row">

            <div className="three columns">
            </div>

            <div className="columns main-col">

               <h1 style={{color:'#ebba34'}}>Whether you're travelling or a local, find a brewery or gastropub nearby...</h1>
            </div>
            <br></br>
            <div className="columns main-col drinkbutton">
            <button id="aboutButton" class="ui massive inverted yellow button">GET DRINKING!</button>
                     </div>
                     </div>
      </section>
    );
  }
}