import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Container, Segment } from 'semantic-ui-react'

class FormCaptureValues extends Component {
  state = { firstName: '', lastName: '', email: '', message: '', submittedFirstName: '', submittedLastName: '', submittedEmail: '', submittedMessage: '' }


  handleSubmit = () => {
    const { firstName, lastName, email, message } = this.state

    this.setState({ submittedFirstName: firstName, submittedLastName: lastName, submittedEmail: email, submittedMessage: message })
  }

  render() {
    const { firstName, lastName, email, message, submittedFirstName, submittedLastName, submittedEmail, submittedMessage } = this.state

    return (
      <div class="ui segment contactform" >
        <Segment inverted>
          <h2 style={{textAlign: "center", color: '#f0f5f1'}}>Contact Us</h2>
          <br></br>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='First name'
              name='firstName'
              value={firstName}
              onSubmit={this.handleSubmit}
            />
            <Form.Input
              placeholder='Last Name'
              name='lastName'
              value={lastName}
              onSubmit={this.handleSubmit}
            />
            <Form.Group>
            <Form.Input
              placeholder='Email'
              name='email'
              value={email}
              onChange={this.handleSubmit}
            />
            <Form.Input
              placeholder='Message'
              name='message'
              value={message}
              onChange={this.handleSubmit}
            />
            <Form.Button content='Submit'
            control={Button}
            style={{textAlign: "center", color: '#f0f5f1'}}
            class="fluid ui inverted yellow button large"
            content='submit'
            width={2} />
            </Form.Group>
          </Form.Group>

          {/* WHERE DOES THIS CODE GO????}
          {/* WHERE DOES THIS CODE GO????}
          {/* WHERE DOES THIS CODE GO????}

        {/* <pre>{JSON.stringify({ firstName, lastName, email, message }, null, 4 )}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ submittedFirstName, submittedLastName, submittedEmail, submittedMessage }, null, 4)}</pre>
        ) */}
      </Form>
    </Segment>
  </div>
    )
  }
  
}

export default FormCaptureValues