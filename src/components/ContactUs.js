import React, { Component } from 'react'
import { Form, TextArea, Button, Grid } from 'semantic-ui-react'

class FormCaptureValues extends Component {
  state = { firstName: '', lastName: '', email: '', message: '', submittedFirstName: '', submittedLastName: '', submittedEmail: '', submittedMessage: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { firstName, lastName, email, message } = this.state

    this.setState({ submittedFirstName: firstName, submittedLastName: lastName, submittedEmail: email, submittedMessage: message })
  }

  render() {
    const { firstName, lastName, email, message, submittedFirstName, submittedLastName, submittedEmail, submittedMessage } = this.state

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <div class="ui segment contactform inverted" >
          <h2 style={{textAlign: "center", color: '#ebba34'}}>Ask Us Anything</h2>
          <br></br>
          <Form onSubmit={this.handleSubmit} >
            <Form.Group >
              <Form.Input
                width={8}
                placeholder='First name'
                name='firstName'
                value={firstName}
                onChange={this.handleChange}
                />
              <Form.Input
                width={8}
                placeholder='Last Name'
                name='lastName'
                value={lastName}
                onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={16}
                placeholder='Email'
                name='email'
                value={email}
                onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={16}
                placeholder='Message'
                control={TextArea}
                name='message'
                value={message}
                onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Group>
            <Form.Button
              content='Submit'
              color='yellow'
              control={Button}
              style={{textAlign: "center"}}
              content='Submit'
              className=''
               />
            </Form.Group>      
          </Form>        
          </div>


        {/* <strong>onSubmit:</strong>
        {JSON.stringify({ submittedFirstName, submittedLastName, submittedEmail, submittedMessage }, null, 4)}
         */}

      </Grid.Column>
    </Grid>
    )
  }
}

export default FormCaptureValues