import React, { useState } from 'react'
import styled from 'styled-components';

const Switch = ({ isToggled , onToggle}) => {


 

  return (
    <Container>
      <label>
        <input type="checkbox" checked={isToggled} onChange={onToggle} />
        <span />
      </label>
    </Container>
  );
};

export default Switch



const Container = styled.div`
transform: scale(0.7);
  label {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 26px;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #414841;
    transition: 0.4s;
    border-radius: 37px;
  }
  input {
    opacity: 0;
   
    width: 0;
    height: 0;
  }

  input:checked + span {
    background-color: #707074;
  }

  input:checked + span:before {
    transform: translateX(30px);
  }

  span:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
   
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;