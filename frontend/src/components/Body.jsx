import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components';
import plus from "../assets/add.png";
import add from "../assets/logo.png";
import Card from './Card';
import CardWidth from './CardWidth';
import { useStateContext } from "../contexts/ContextProvider";
import axios from 'axios';
import { motion } from 'framer-motion';


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,

    transition: {
      staggerChildren: 0.7,
      duration: 0.5,
    },
  },
};
const Body = () => {
   const [todo, setTodo] = useState("");


   const { currentcolor, font, todoData, setData, user,  isToggled  } = useStateContext();

useEffect(() => {
 fetchData()
}, [])

   
     const config = {
       headers: {
         Authorization: "Bearer " + localStorage.getItem("token"),
       },
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

          async function postName(e) {
            e.preventDefault();

            try {
              await axios.post(
                "http://localhost:3000/api/v1/tasks",
                {
                  todo,
                },
                config
              );

              fetchData();
            } catch (error) {
              console.log(error);
            }
            setTodo("");
          }


     

          console.log(todoData);

          console.log(todo);
  return (
    <Component isToggled={isToggled}>
      <img className="background-image" src={add} alt="" />
      <Glass> </Glass>
      <BodyWrapper>
        <p>
          Hello <span> {user}</span> What do we have today
        </p>
        <InputWrapper>
          <input
            style={{
              border: `1px solid ${currentcolor}`,
              fontFamily: `${font}`,
            }}
            type="text"
            placeholder="Add Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />{" "}
          <button
            style={{ border: `1px solid ${currentcolor}` }}
            onClick={postName}
          >
            {" "}
            <img src={plus} alt="add" />{" "}
          </button>
        </InputWrapper>
        <CardWrapper variants={container} initial="hidden" animate="show">
          {todoData
            .slice(0)
            .reverse()
            .map((data) => (
              <Card data={data} key={data.todo._id} />
            ))}
        </CardWrapper>
      </BodyWrapper>
    </Component>
  );
}

export default Body

const glow = keyframes`
0% { transform: translateY(-2px)}
50% { transform: translateY(7px) translateX(1px)}
100% { transform: translateY(-2px)}
`;

const Component = styled(motion.div)`
  position: relative;

  z-index: 200;
  background-color: ${(props) => (props.isToggled ? "#2f302c" : "white")};

  height: auto;
  .background-image {
    position: fixed;
    top: 50%;
    left: 40%;
    right: 0%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    z-index: 2;
    @media (max-width: 480px) {
      height: 30vh;
    }
  }
`;



const BodyWrapper = styled.div`
  position: absolute;
  padding: 3vh;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  
  justify-content: center;
  justify-content: flex-start;
  z-index: 30;
  top: 10px;
  left: 10px;
  border-radius: 10px;
  right: 14px;
  background: rgba(255, 255, 255, 0.2);

  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(30px);
  height: auto;

  p {
    @media (max-width: 480px) {
      font-size: 13px;
    }
  }

  span {
    font-size: 20px;
    font-weight: 800;
  }
  @media (max-width: 480px) {
   padding: 1vh;
  }
`;

const InputWrapper = styled.div`
  padding: 2vh;
  display: flex;
  align-items: center;
  width: 60%;
  justify-content: space-between;

  @media (max-width: 480px) {
    width: 90%;
  }
  input {
    padding: 10px;
    outline: none;
    font-size: 17px;
    font-weight: 500;
    width: 84%;
    border-radius: 3px;
    @media (max-width: 480px) {
      width: 82%;
      padding: 4px;
      font-size: 14px;
    }
    :focus {
      border-color: #0049e7;
      box-shadow: 0 0 3px 2px rgba(17, 80, 228, 0.5);
    }
  }
  button {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #a1a1e2;

    z-index: 1;
    outline: none;
    @media (max-width: 480px) {
      width: 30px;
      height: 30px;
    }
    img {
      width: 30px;

      @media (max-width: 480px) {
        width: 20px;
      }
    }
  }
`;

const Glass = styled.div`
  position: absolute;

  top: 10px;
  bottom: 10px;
  left: 10px;
  top: 10px;

  right: 10px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(30px);
  border-radius: 4px;
  z-index: 20;
 
`;

const CardWrapper = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 20px;
  @media (max-width: 480px) {
    padding: 4px;
    padding-top: 20px;
  }
`;