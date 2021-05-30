import React, { Component } from 'react';
export default class Header extends Component {
  render() {
    return (
      <React.Fragment>
      
      <header id="home">
<nav id="nav-wrap">
           
<div class="ui inverted yellow three item huge menu">
  <a class="active item">Home</a>
  <a class="active item">Breweries</a>
  <a class="active item">Contact us</a>
</div>
<div>
<div class="large ui yellow buttons float-right">
  <button class="ui button">Sign Up</button>
  <button class="ui button">Login</button>

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