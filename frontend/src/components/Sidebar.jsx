import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components';
import logo from '../assets/logo.png'
import { useStateContext } from "../contexts/ContextProvider";
import { Link, NavLink } from "react-router-dom";
import {BsFillSunFill} from 'react-icons/bs';
import { GiMoon } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import {
  AiTwotoneFilter, AiOutlineFontColors,
  AiOutlineBgColors,
} from "react-icons/ai";

import { BsCheck } from "react-icons/bs";
import Switch from './Switch';
import axios from 'axios';

const Sidebar = () => {
const [searchOption, setSearchOption] = useState(true)


  const {
    font,
    setFont,
    name,
    setName,
    currentcolor,
    setCurrentColor,
    isToggled,
    setIsToggled,
    todoData,
    setData,
    screenSize,
    setIsModalOpened,
    isModalOpened,
  } = useStateContext();

     const config = {
       headers: {
         Authorization: "Bearer " + localStorage.getItem("token"),
       },
     };

     const fetchData = async () => {
       try {
         axios
           .get("https://fierce-gray-turtleneck.cyclic.app/api/v1/tasks", config)
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

  const fetchPending = async () => {
       try {
         axios
           .get("https://fierce-gray-turtleneck.cyclic.app/api/v1/tasks", config)
           .then((response) => {
             const data = response.data.task;
             const filterPending = data.filter((pending) =>
               pending.completed.toString().includes("false")
             );

             setData(filterPending);
           })
           .catch((error) => {
             console.log(error);
           });
       } catch (e) {
         console.log(e);
       }
     };

  const fetchCompleted = async () => {
    try {
      axios
        .get("https://fierce-gray-turtleneck.cyclic.app/api/v1/tasks", config)
        .then((response) => {
          const data = response.data.task;
          const filterCompleted = data.filter((pending) =>
            pending.completed.toString().includes("true")
          );

          setData(filterCompleted);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const filters = [
    {
      name: "All",
    },
    {
      name: "Completed",
    },
    {
      name: "Pending",
    },
  ];

  const Fonts = [
    {
      name: "Cormorant Upright",
    },
    {
      name: "PT Serif",
    },

    {
      name: "Courgette",
    },
    {
      name: "Sirin Stencil",
    },
  ];

  const Colors = [
    {
      name: "#e62525",
    },
    {
      name: "#e8961a",
    },
    {
      name: "#1c33c7",
    },
    {
      name: "  #c71cb6",
    },
  ];

  const HandleFilter =(filterer) => {
 setName(filterer);
   
 if (filterer === "All") {
  fetchData();
 }


 if (filterer === "Completed") {
fetchCompleted();

 }
 
if (filterer === "Pending") {
fetchPending()

}


  }


  return (
    <Container font={font}>
      <Title>
        <Link to="/">
          {" "}
          <Heading currentcolor={currentcolor}>TODO</Heading>{" "}
        </Link>
        <Logo>
          {" "}
          <img src={logo} alt="logo" />{" "}
        </Logo>
        {screenSize < 1032 && (
          <Cancel>
            <MdOutlineCancel
              onClick={() => {
                setIsModalOpened(!isModalOpened);
              }}
            />
          </Cancel>
        )}
      </Title>
      <Line currentcolor={currentcolor}></Line>
      <Filtersettings>
        <FilterHeading>
          <h3>Filters</h3> <AiTwotoneFilter className="size" />
        </FilterHeading>
        <Filter>
          {filters.map((filter) => (
            <Button key={filter.name} onClick={() => HandleFilter(filter.name)}>
              {filter.name}

              <Circle
                currentcolor={currentcolor}
                className={` ${filter.name === name ? "block" : "hidden"}`}
              />
            </Button>
          ))}
        </Filter>
      </Filtersettings>
      <Line1 currentcolor={currentcolor}></Line1>
      <Settings>
        <FontSetting>
          <FilterHeading>
            <h3>Fonts</h3> <AiOutlineFontColors className="size" />
          </FilterHeading>
          <Font>
            {Fonts.map((filter) => (
              <FontButton
                key={filter.name}
                onClick={() => setFont(filter.name)}
                className="filter-button"
              >
                {filter.name}

                <FontCircle
                  currentcolor={currentcolor}
                  className={` ${filter.name === font ? "block" : "hidden"}`}
                />
              </FontButton>
            ))}
          </Font>
        </FontSetting>

        <LightSetting>
          <FilterHeading>
            <h3>Light</h3> <AiOutlineBgColors className="size" />
          </FilterHeading>
          <Font>
            {Colors.map((filter) => (
              <Palatte
                key={filter.name}
                onClick={() => setCurrentColor(filter.name)}
                className="filter-button"
                color={filter.name}
              >
                <BsCheck
                  currentcolor={currentcolor}
                  className={`check ${
                    filter.name === currentcolor ? "block" : "hidden"
                  }`}
                />
              </Palatte>
            ))}
          </Font>
        </LightSetting>

        <Mode>Mode</Mode>
        <ModeContainer>
          <BsFillSunFill />{" "}
          <Switch
            isToggled={isToggled}
            onToggle={() => setIsToggled(!isToggled)}
          />{" "}
          <GiMoon />
        </ModeContainer>
      </Settings>
    </Container>
  );
}

export default Sidebar

const Container = styled.div`
  width: 25vw;
  font-family: ${(props) => props.font};
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  position: relative;
  @media (max-width: 1032px) {
    width: 49vh;
  }
`;
const Cancel = styled.div`
position: absolute;
top: 6px;
right: 0;
svg {
  font-size: 24px;
  cursor: pointer;
}
`;

const move = keyframes`
0% { transform: translateY(-2px)}
50% { transform: translateY(7px) translateX(1px)}
100% { transform: translateY(-2px)}
`;



const Title = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10vh;
  align-items: center;
  padding: 20px;
 
`;


const Filtersettings = styled.div`
display: flex;
flex-direction: column;

`;


const Filter = styled.div`
 display   : flex;
 align-items: flex-end;
 flex-direction: column;
`;

const Button = styled.div`
  width: 30%;
  text-align: center;
  padding: 2px;
  border-radius: 4px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  .check {
    font-size: 22px;
  }

  .block {
    display: block;
  }

  .hidden {
    display: none;
  }
`;



const FontButton = styled.div`
  width: 100%;
  text-align: center;
  padding: 2px;
  font-size: 14px;
  font-weight: 400;
  
  margin: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;


  .check {
    font-size: 22px;
  }

  .block {
    display: block;
  }

  .hidden {
    display: none;
  }
`;




const FilterHeading = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 24px;
h3{
    padding-right: 4px;
}
.size {
    font-size: 24px;

}

`;


const Settings = styled.div`
display: flex;
flex-direction: column;
`;


const Heading = styled.h1`
  font-weight: 800;
  color: ${(props) => props.currentcolor};
`;

const Logo = styled.div`
  animation: ${move} 4s ease infinite;
  img {
    width: 40px;
  }
`;

const Circle = styled.div`
  height: 14px;
  width: 14px;
  border-radius: 50%;
  
  background-color: ${(props) => props.currentcolor};

  .block {
    display: block;
  }

  .hidden {
    display: none;
  }
`;


const FontCircle = styled.div`
  min-height: 10px;
  min-width: 10px;
  border-radius: 50%;
  margin: 4px;
  background-color: ${(props) => props.currentcolor};

  .block {
    display: block;
  }

  .hidden {
    display: none;
  }
`;




const FontSetting = styled.div`
    
`;


const LightSetting = styled.div`
`;


const Font = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;

const Palatte = styled.div`
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 2px;
  font-size: 14px;
  font-weight: 400;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  .check {
    font-size: 32px;
    color: white;
  }

  .block {
    display: block;
  }

  .hidden {
    display: none;
  }
`;


const Mode =  styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`

const Line = styled.div`
margin: auto;
  width: 30vh;
  height: 2px;
  background-color: ${(props) => props.currentcolor};
`;

const Line1 = styled.div`
  margin: auto;
  width: 20vh;
  height: 2px;
  background-color: ${(props) => props.currentcolor};
  border-radius: 12px;
`;

const ModeContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 14px;


`