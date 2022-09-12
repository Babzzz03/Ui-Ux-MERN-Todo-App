import React, { useState } from 'react'
import styled from 'styled-components';
import logo from "../assets/logo.png";
import hero from "../assets/hero1.png";
import { useStateContext } from "../contexts/ContextProvider";
import { Link} from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios";



const Header = () => {
  let [data2, setData] = useState([]);
  const { currentcolor, font, user, setUser, isToggled } = useStateContext();
  useEffect(() => {
fetchData();
fetchUser()
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
   const fetchUser = async () => {
     try {
       axios
         .get("http://localhost:3000/api/v1/tasks/user", config)
         .then((response) => {
           const data = response.data.username;
           setUser(data);
         })
         .catch((error) => {
           console.log(error);
         });
     } catch (e) {
       console.log(e);
     }
   };

   const fetchData = async () => {
     try {
       axios
         .get("http://localhost:3000/api/v1/tasks", config)
         .then((response) => {
           const data = response.data.task;
           setData(data);
         })
         .catch((error) => {
           console.log(error);
         });
     } catch (e) {
       console.log(e);
     }
   };

   console.log(user);
   const handleAutentication = () => {
     localStorage.clear();
     fetchData(); 
   
   };


  return (
    <Component isToggled={isToggled}>
      <HeaderWrapper>
        <img src={logo} alt="logo" />
        <Glass></Glass>

        <Visible>
          <img src={hero} alt="" />
          <Link to="/login">
            <button
              style={{
                fontFamily: `${font}`,
                fontWeight: `700`,
                fontSize: `17px`,
                cursor: "pointer",
                float: "right",
                padding: "10px 27px",
                margin: "40px",
                border: "1px solid black",
                backgroundColor: `${currentcolor}`,
                borderRadius: "20px",
              }}
              onClick={handleAutentication}
            >
              {user ? "Sign Out" : "Sign In"}
            </button>
          </Link>
        </Visible>
      </HeaderWrapper>
    </Component>
  );
}

export default Header



const Component = styled.div`
  background-color: ${(props) =>
    props.isToggled ? "#2f302c" : "antiquewhite"};

`;

const HeaderWrapper = styled.div`
  position: relative;

  height: 30vh;
  width: 75vw;
  img {
    height: 20vh;

    padding: 14px;
    float: right;
  }
`;
const Glass = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  border-radius: 10px;
 

  z-index: 2;
  top: 10px;
  bottom: 10px;
  left: 10px;
  right: 14px;
  backdrop-filter: blur(0.3rem);
`;

const Visible = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  img {
    height: 60vh;
    position: absolute;
    left: 0px;
    top: -37px;
  }
`;