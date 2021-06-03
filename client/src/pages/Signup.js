import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

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

  return (
    <section style={{height: '100vh'}} id='loginsignuppage'>
    <div className="loginsignupcontainers my-1">
       <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 style={{color:'#ebba34'}}>Signup</h1>
      <br></br>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label style={{color:'#ebba34'}} htmlFor="firstName">Username:</label>
          <input
            placeholder="Username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label style={{color:'#ebba34'}} htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label style={{color:'#ebba34'}} htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div className="flex-row flex-end">
        <button class="ui yellow button">Submit</button>
        </div>
      </form>
    </div>
    </section>
  );

}

export default Signup;
