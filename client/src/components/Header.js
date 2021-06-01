import React, { Component } from 'react'
import { Button, Segment, Menu } from 'semantic-ui-react'


export default class MenuExampleInvertedSecondary extends Component {
    state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment id="home" inverted>

      <Menu id="home" inverted fixed="top" size='huge' >
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

        <Menu.Menu position='right'>
        <Menu.Item>
            
            <Button color='yellow'>Login</Button>
          </Menu.Item>
          <Menu.Item>
            
            <Button color='yellow'>Sign Up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      </Segment>

    )
  }
}