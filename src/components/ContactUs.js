import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Container, Segment, Grid } from 'semantic-ui-react'

class FormCaptureValues extends Component {
  state = { firstName: '', lastName: '', email: '', message: '', submittedFirstName: '', submittedLastName: '', submittedEmail: '', submittedMessage: '' }


  handleSubmit = () => {
    const { firstName, lastName, email, message } = this.state

    this.setState({ submittedFirstName: firstName, submittedLastName: lastName, submittedEmail: email, submittedMessage: message })
  }

  render() {
    const { firstName, lastName, email, message, submittedFirstName, submittedLastName, submittedEmail, submittedMessage } = this.state

    return (
      <Grid centered columns={3}>
      <Grid.Column>

      <div class="ui segment contactform inverted" >

        {/* <Segment inverted              */}
{/* > */}
          <h2 style={{textAlign: "center", color: '#f0f5f1'}}>Contact Us</h2>
          <br></br>
        <Form onSubmit={this.handleSubmit} >
          <Form.Group >
            <Form.Input
            width={8}
              placeholder='First name'
              name='firstName'
              value={firstName}
              onSubmit={this.handleSubmit}
              />
            <Form.Input
                        width={8}

              placeholder='Last Name'
              name='lastName'
              value={lastName}
              onSubmit={this.handleSubmit}
              />
          </Form.Group>
          <Form.Group>
            <Form.Input
                        width={16}

              placeholder='Email'
              name='email'
              value={email}
              onChange={this.handleSubmit}
              />
          </Form.Group>
          <Form.Group>
            <Form.Input
              placeholder='Message'
              control={TextArea}
              name='message'
              value={message}
              onChange={this.handleSubmit}
                                      width={16}

              />
          </Form.Group>
          <Form.Group>
            <Form.Button content='Submit'
            control={Button}
            style={{textAlign: "center", color: '#f0f5f1'}}
            class="fluid ui inverted yellow button large"
            content='submit'
            width={2} />
          </Form.Group>


        {/* <pre>{JSON.stringify({ firstName, lastName, email, message }, null, 4 )}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ submittedFirstName, submittedLastName, submittedEmail, submittedMessage }, null, 4)}</pre>
        )  */}
      </Form>
    {/* </Segment> */}
    </div>

    </Grid.Column>
        </Grid>

    )
  }
  
}

export default FormCaptureValues