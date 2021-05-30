import React from 'react'
import { Form, Input, TextArea, Button, Select, Container, Segment } from 'semantic-ui-react'

const FormExampleFieldControlId = () => (
  // <div class="ui center aligned segment" >
  <Segment  inverted>
  <Form inverted>
    <Container>
    <Form.Group inverted >
      <Form.Field
        id='form-input-control-first-name'
        
        control={Input}
        label='First name'
        placeholder='First name'
        width={4}

      />
      <Form.Field
        id='form-input-control-last-name'
        control={Input}
        label='Last name'
        placeholder='Last name'
        width={4}

      />
    </Form.Group>
    <Form.Field
      id='form-textarea-control-opinion'
      control={TextArea}
      label='What do you want us to know?'
      placeholder='Tell us!'
      width={8}

    />
    <Form.Field
      id='form-input-control-error-email'
      
      control={Input}
      label='Email'
      placeholder='joe@schmoe.com'
      width={8}


      error={{
        content: 'Please enter a valid email address',
        pointing: 'below',
      }}
    />
    <Form.Field
      id='form-button-control-public'
      control={Button}
      style={{textAlign: "center" ,color:'#ebba34'}}
      class="ui inverted yellow button"
      content='Submit'
      // label='Submit'
    />
    </Container>
  </Form>
  </Segment>
  // </div> 
)

export default FormExampleFieldControlId