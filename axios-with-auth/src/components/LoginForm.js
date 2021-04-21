import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const credentials = {
  username: "",
  password: "",
};
export default function LoginForm() {
  const [login, setLogin] = useState(credentials);

  let history = useHistory();

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios

      .post("http://localhost:5000/api/login", login)

      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        history.push("/encrypted");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <StyledDiv>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="username"
          value={login.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={login.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Login</button>
      </form>
    </StyledDiv>
  );
}
