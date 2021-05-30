import React, { Component } from 'react';
export default class Header extends Component {
  render() {
    return (
      <React.Fragment>
      
      <header id="home">
<nav id="nav-wrap">
           
<div class="ui huge inverted pointing menu">
  <a class="item">
    Home
  </a>
  <a class="item">
    Breweries
  </a>
  <a class="item">
    Contact Us
  </a>
  <div class="right menu">
  <div class="item">
        <div class="ui yellow button">Login</div>
        
    </div>
    <div class="item">
        <div class="ui yellow button">Sign Up</div>
        
    </div>
  </div>
</div>

</nav>





         <div className="row banner">
            <div className="banner-text">
               <h1 style={{color:'#ebba34'}} className="responsive-headline">Beer Me</h1>
               <hr/>

            </div>
         </div>



      </header>
      </React.Fragment>
    );
  }
}