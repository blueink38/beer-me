import React from 'react'
import { Form, TextArea, Button, Input, Grid } from 'semantic-ui-react'

import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

const SERVICE_ID = "service_5qal2uo";
const TEMPLATE_ID = "contact_form";
const USER_ID = "user_RASvx8iXKQ0HpCYLic6sz";


const App = () => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then((result) => {
        console.log(result.text);
        Swal.fire({
          // icon: 'success',
          title: 'Message Sent Successfully'
        })
      }, (error) => {
        console.log(error.text);
        Swal.fire({
          // icon: 'error',
          title: 'Ooops, something went wrong',
          text: error.text,
        })
      });
    e.target.reset()
  };


return (
  <Grid centered columns={2}>
       <Grid.Column>
    <div className="App ui segment contactform inverted">
    <h2 style={{textAlign: "center", color: '#ebba34'}}>Ask Us Anything</h2>
    <br></br>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
        <Form.Field 
          control={Input}
          label='Name'
          color='yellow'
          
          name='user_name'
          placeholder='Name…'
          required
          width={8}
        />
        <Form.Field
          control={Input}
          label='Email'
          name='user_email'
          placeholder='Email…'
          required
          width={8}
        />
        </Form.Group>

        <Form.Field
          control={TextArea}
          label='Message'
          name='user_message'
          placeholder='Message…'
          required
        />
        <Button type='submit' color='yellow'>Submit</Button>
      </Form>
    </div>
    </Grid.Column>
    </Grid>
  );
}
export default App;
