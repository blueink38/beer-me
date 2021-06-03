import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";
import { Form } from "semantic-ui-react";

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <section style={{height: '100vh'}} id='loginsignuppage'>
    <div className="loginsignupcontainers my-1">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 style={{color:'#ebba34'}}>Login</h1>
      <br></br>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label style={{color:'#ebba34'}}htmlFor="email">Email address:</label>
          <Form.Input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>

        <div className="flex-row space-between my-2">
          <label style={{color:'#ebba34'}}htmlFor="pwd">Password:</label>
          <Form.Input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {
          error ? <div>
            <p style={{color:'#ebba34'}} className="error-text" >The provided credentials are incorrect</p>
          </div> : null
        }
        <div className="flex-row flex-end">
          <br></br>
          <button class="ui yellow button">Submit</button>
          
        </div>
      </form>
    </div>
    </section>
  );
}


export default Login;