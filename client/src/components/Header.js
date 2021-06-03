import React, { Component } from 'react'
import { Button, Segment, Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import Auth from "../utils/auth"


export default class MenuExampleInvertedSecondary extends Component {
    state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment id="home" inverted>

      <Menu id="home" inverted fixed="top" size='huge' >
        {activeItem === "login" || activeItem === "signup" ? 
        <Menu.Menu>
           <Link to="/"><Menu.Item 
              name='home'
              background='yellow'
              onClick={this.handleItemClick}
            /></Link>
        </Menu.Menu>
        :
        <Menu.Menu>
          <Menu.Item 
              href="#home"
              name='home'
              color='yellow'
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              href="#about"
              name='breweries'
              color='yellow'
              active={activeItem === 'breweries'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              href="#contact-us"
              name='contact us'
              color='yellow'
              active={activeItem === 'contact us'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        }
        {!Auth.loggedIn() ? 
          <Menu.Menu position='right'>
            <Menu.Item
              name="login"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            >
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item
              name="signup"
              active={activeItem === 'signup'}
              onClick={this.handleItemClick}
            >
            <Link to="/signup">Sign Up</Link>
            </Menu.Item>
          </Menu.Menu>
        : 
          <Menu.Menu position='right'>
            <Menu.Item
              name="logout"
              active={activeItem === 'home'}
              onClick={() => Auth.logout()}
            >
              <Link to="/">Logout</Link>
            </Menu.Item>
          </Menu.Menu>
        }
      </Menu>
      </Segment>

    )
  }
}