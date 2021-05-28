import React, { Component } from 'react';
export default class Header extends Component {
  render() {
    return (
      <React.Fragment>
      
      <header id="home">
         <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
          <a className="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>
            <ul id="nav" className="nav">
               <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
               <li><a className="smoothscroll" href="#about">About</a></li>
             <li><a className="smoothscroll" href="#resume">Breweries</a></li>
               <li><a className="smoothscroll" href="#contact">Questions</a></li>
       
        <li><button type="button" class="btn btn-secondary" href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</button></li>
        <li><button type="button" class="btn btn-secondary" href="#"><span class="glyphicon glyphicon-log-in"></span> Login</button></li>
      </ul>

         </nav>

         <div className="row banner">
            <div className="banner-text">
               <h1 style={{color:'#ebba34'}} className="responsive-headline">Beer Me</h1>
               <h2 style={{color:'#ebba34'}}>Find A Brewery Near You</h2>
               <hr/>

            </div>
         </div>



      </header>
      </React.Fragment>
    );
  }
}