import React, { Component } from 'react';
export default class About extends Component {
  render() {
    return (
<section id="about">
         <div>
            <div className="breweryfinder">
            <h1 style={{textAlign: "center", color:'#EBBA34'}}>Find A Brewery Near You!</h1>
            </div>
            </div>
            <br></br>
            <br></br>
            <div>
            <div className="columns main-col drinkbutton">
            <button id="aboutButton"  class="ui huge yellow button">GET DRINKING</button>
                     </div>
                     </div>
      </section>
    );
  }
}