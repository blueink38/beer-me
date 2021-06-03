import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { Form, TextArea, Button, Grid } from 'semantic-ui-react'


// class FormCaptureValues extends Component {
//   state = { userName: '', email: '', password: '', submittedUserName: '', submittedEmail: '', submittedPassword: ''}

//   handleChange = (e, { name, value }) => this.setState({ [name]: value })

//   handleSubmit = () => {
//     const { userName, email, password } = this.state

//     this.setState({ 
//       submittedUserName: userName, userName: "", 
//       submittedEmail: email, email: "",
//       submittedPassword: password, password: "" })
//   }
// }








function Signup() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email, password: formState.password,
        username: formState.username
      }
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

    // render() {
    // const { userName, email, password, submittedUserName, submittedEmail, submittedPassword } = this.state

  return (

<Grid id='contact-us' centered columns={4}>
      <Grid.Column>



    <div className="ui segment contactform inverted">
      <br></br>
      <br></br>
      <h2 style={{textAlign: "center", color: '#ebba34'}}>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <Form.Group>
        {/* <Form.Input
                width={8}
                placeholder='User Name'
                name='userName'
                value={userName}
                onChange={this.handleChange}
                /> */}




        <div className="flex-row space-between my-2">
          <label htmlFor="Name">Username:</label>
          <input
            placeholder="Username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">
            Submit
          </button>
        </div>
        </Form.Group>
      </form>
    </div>


    </Grid.Column>
    </Grid>




  );
}
// }



export default Signup;
