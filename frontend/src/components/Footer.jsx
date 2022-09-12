import React from 'react'
import styled from 'styled-components';

const Footer = () => {
  return <Container>footer</Container>;
}

export default Footer


const Container = styled.div`
  position: fixed;
  width: 75vw;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
 background-color: green;
`