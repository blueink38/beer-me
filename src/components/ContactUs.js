import React from 'react'
import { Form, Input, TextArea, Button, Select, Container, Segment } from 'semantic-ui-react'

const FormExampleFieldControlId = () => (
  <div class="ui segment contactform" >

  <Segment  inverted>
  <h2 style={{textAlign: "center" ,color:'#f0f5f1'}}>Contact Us</h2>
  <br></br>
  <Form inverted>
    <Container>
    <Form.Group inverted >
      <Form.Field
        id='form-input-control-first-name'
        control={Input}
        label='First name'
        placeholder='First name'
        width={6}

      />
      <Form.Field
        id='form-input-control-last-name'
        control={Input}
        label='Last name'
        placeholder='Last name'
        width={6}

      />
    </Form.Group>
    <Form.Field
      id='form-textarea-control-opinion'
      control={TextArea}
      label='What do you want us to know?'
      placeholder='Tell us!'
      width={18}

    />
    <Form.Field
      id='form-input-control-error-email'
      
      control={Input}
      label='Email'
      placeholder='email@email.com'
      width={18}


      error={{
        content: 'Please enter a valid email address',
        pointing: 'below',
      }}
    />
    <Form.Field
      id='form-button-control-public'
      control={Button}
      style={{textAlign: "center" ,color:'#f0f5f1'}}
      class="fluid ui inverted white button large"
      content='Submit'
      width={2}
      // label='Submit'
    />
    </Container>
  </Form>
  </Segment>
  </div> 
)

export default FormExampleFieldControlId