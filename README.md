# Beer Me

> This is an application that allows a user to locate and save nearby breweries.

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [To-Do](#to-do)
* [Status](#status)
* [Inspiration](#inspiration)
* [Licenses](#licenses)
* [Contact](#contact)

## General info
General Overview

## Screenshots
![beermegif](https://user-images.githubusercontent.com/72768374/120387092-15952400-c2ef-11eb-9d1f-16f5b8fc376d.gif)
## Technologies
* HTML5
* CSS3
* JavaScript
* MongoDB
* GraphQL
* Semantic UI
* EmailJS

## Setup


## Code Examples
Show examples of usage:
```
const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})
```

## Features
* Find Breweries by proximity, city, state, or style
* Log in to create a profile
* Save breweries to your profile
* Message Beer Me directly

## To-Do
* Add a donation platform
* Allow users to add new and upcoming breweries

## Status
>This project is in progress.  As new technologies and client needs evolve, so will this application.

## Inspiration
>Our previous collaboration, Eat Out, Austin, allowed users to find a curated list of restaurants in Austin, TX.  Using that inspiration we created Beer Me to cater to the beer enthusiast.

## Licenses
[![License: ICL](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)    ![badge](https://img.shields.io/badge/Created_With-LOVE-pink.svg)

## Contact
[![Ask Anything !](https://img.shields.io/badge/Ask%20Us-Anything-1abc9c.svg)](https://github.com/blueink38/beer-me)   

Created by: <br>
[Frank Depaolo](https://dragoonkite.github.io/portfolio/nk) - feel free to contact me!<br>
[Jason Fletcher](https://blueink38.github.io/new-portfolio/) - feel free to contact me!<br>
[Ramon Flowers](https://rocketorangemen.github.io/Portfolio/) - feel free to contact me!<br>
[Cory Neel](https://cocobeware83.github.io/coryneel) - feel free to contact me!<br>
[Juan Nunez](https://jnunez1229.github.io/juan-nunez/#) - feel free to contact me!<br>
