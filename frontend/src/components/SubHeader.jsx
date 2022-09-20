import React, { useState } from 'react'
import styled from 'styled-components';
import logo from "../assets/logo.png";
import hero from "../assets/hero1.png";
import { useStateContext } from "../contexts/ContextProvider";
import { Link} from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios";
import { AiOutlineMenu } from "react-icons/ai";


const SubHeader = () => {
  let [data2, setData] = useState([]);
  const {
    currentcolor,
    font,
    user,
    setUser,
    isToggled,
    setIsModalOpened,
    isModalOpened,
    screenSize,
    setScreenSize,
  } = useStateContext();
  useEffect(() => {
    fetchData();
    fetchUser();
  }, []);
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(screenSize);

  useEffect(() => {
    if (screenSize <= 1032) {
      setIsModalOpened(false);
    } else {
      setIsModalOpened(true);
    }
  }, [screenSize]);

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
      <HeaderWrapper isModalOpened={isModalOpened} screenSize={screenSize}>
        <img src={logo} alt="logo" />
        <Glass></Glass>

        <Visible>
          <Cancel
            isToggled={isToggled}
            onClick={() => {
              setIsModalOpened(!isModalOpened);
            }}
          >
            <AiOutlineMenu />
          </Cancel>
        
          <Link to="/login">
            <button
              style={{
                fontFamily: `${font}`,

                backgroundColor: `${currentcolor}`,
                borderRadius: "20px",
              }}
              onClick={handleAutentication}
              className="button"
            >
              {user ? "Sign Out" : "Sign In"}
            </button>
          </Link>
        </Visible>
      </HeaderWrapper>
    </Component>
  );
};

export default SubHeader



const Component = styled.div`
  background-color: ${(props) =>
    props.isToggled ? "#2f302c" : "antiquewhite"};

`;

const HeaderWrapper = styled.div`
  position: relative;

  height: 30vh;
 
  width: ${(props) =>
    props.isModalOpened && props.screenSize > 1032 ? "75vw" : "100vw"};
  @media (max-width: 480px) {
    height: 22vh;
  }
  img {
    height: 20vh;

    padding: 14px;
    float: right;
    @media (max-width: 480px) {
      height: 14vh;
      padding: 17px;
    }
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
  @media (max-width: 480px) {
    top: 7px;
    bottom: 7px;
    left: 7px;
    right: 7px;
  }
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
    @media (max-width: 480px) {
      left: -40px;
      top: 20px;
      height: 30vh;
    }
  }
  .button {
           font-weight: 700;
                font-size: 17px;
                cursor: pointer;
                float: right;
                padding: 10px 27px;
                margin: 40px;
                border: 1px solid black;
                color: white;
    @media (max-width: 480px) {
     font-size: 13px;
     padding: 7px 17px;
    }
  }
`;

const Cancel = styled.div`
  position: absolute;
  left: 30px;
  top: 34px;
  z-index: 10;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 480px) {
    left: 20px;
    top: 24px;
  }
  svg {
    font-size: 24px;
    cursor: pointer;
    @media (max-width: 480px) {
      font-size: 20px;
    }
  }
  &:hover {
    background: ${(props) => (props.isToggled ? "#2f302c" : "white")};
  }
`;

