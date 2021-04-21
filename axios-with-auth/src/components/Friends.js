import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  background-color: #cfc44c;
  font-size: 0.8em;

  .friendCard {
    text-transform: uppercase;
    border: 5px solid #34d1bf;
    width: 100%;
    margin-top: 5%;
    margin-bottom: 5%;
    padding: 1%;
    text-align: center;
    border-radius: 2em;
    color: #f2ec33;
    font-weight: bold;
    background-color: #3b58cc;
    text-shadow: 9px 2px 9px;
  }

  button {
    background-color: #3b58cc;
    font-weight: bold;
    color: yellow;
    border-radius: 1em;
    font-size: 1em;
    justify-content: center;
  }

  input {
    background-color: #3b58cc;
    color: yellow;
    font-weight: bold;
    margin-top: 1%;
    text-align: center;
  }
`;

const newFriend = {
  name: " ",
  age: " ",
  email: " ",
};

export default function Friends() {
  const friendsList = [];
  const [friends, setFriends] = useState(friendsList);
  const [friend, setFriend] = useState(newFriend);

  const getData = () => {
    axiosWithAuth()
      .get("/api/friends")
      .then((response) => {
        setFriends(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(getData, [friends]);

  const handleChange = (e) => {
    setFriend({ ...friend, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newMember = {
      id: Date.now(),
      name: friend.name,
      age: friend.age,
      email: friend.email,
    };
    axiosWithAuth().post("/api/friends", newMember);
  };

  return (
    <StyledDiv>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          value={friend.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="age"
          value={friend.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <input
          type="email"
          name="email"
          value={friend.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <button>Add Friend</button>
      </form>
      <div>
        {friends.map((friend) => {
          return (
            <div className="friendCard" key={friend.id}>
              <p> id: {friend.id}</p>
              <p> name: {friend.name}</p>
              <p> age: {friend.age}</p>
              <p>email: {friend.email}</p>
            </div>
          );
        })}
      </div>
    </StyledDiv>
  );
}
