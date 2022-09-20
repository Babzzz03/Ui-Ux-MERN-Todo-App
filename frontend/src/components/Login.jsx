import React, { useState } from 'react'
import styled from 'styled-components'
import hero from "../assets/hero2.png";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
const Login = () => {
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");
       const [error, setError] = useState("");
       const [error2, setError2] = useState("");
       const [error3, setError3] = useState("");
      

       async function signIn(e) {
         e.preventDefault();

         axios
           .post(
             `https://fierce-gray-turtleneck.cyclic.app/api/v1/tasks/login`,
             {
               email,
               password,
             }
           )
           .then((response) => {
             localStorage.setItem("token", response.data.token);
             alert("Welcome back");
           })
           .catch((err) => {
             // The request was made and the server responded with a status code
             // that falls out of the range of 2xx
             if (err.response) {
               setError(err.response.data.msg);
               setError2(err.response.data.msg1);
               setError3(err.response.data.msg2);
             }
           });
       }
  return (
    <Container>
      <img src={hero} alt="" />
      <FormTable>
        <h1>Sign In</h1>
        <p className="tag">E-mail</p>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="tag">Password</p>
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>
          <button onClick={signIn}>Sign In</button>
        </Button>
        <p className="create">
          Dont have an accout yet ?{" "}
          <Link className="Link" to="/signup">
            Create Account
          </Link>{" "}
        </p>
      </FormTable>
    </Container>
  );
}

export default Login

const Container = styled.div`
    position: fixed;
    background: antiquewhite;
    height: 100vh;
    width: 100vw;
    font-weight: 700;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        height: 20rem;
        position: absolute;
        left: -10px;
        bottom: -10px;
    }
`

const FormTable = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 24rem;
  border: 1px solid green;
  border-radius: 10px;
  h1 {
    padding: 10px;
    padding-bottom: 17px;
  }
  input {
    width: 80%;
    
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid black;
    background-color: antiquewhite;
    padding: 10px;
    outline: none;
    margin: 10px auto;
    font-size: 14px;
  }
  .tag {
    margin-top: 20px;
    margin-left: 14px;
  }
  button {
    margin-top: 20px;
    padding: 10px 4px;
    width: 14rem;
    outline: none;
    border-radius: 10px;
    background-color: #b180de;
    border: 1px solid black;
  }
  .create {
    margin: 30px auto;
  }

  .Link {
    text-decoration: none;
    color: #2d1941;
  }
`;

const Button = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;

`