import React, { useState } from 'react'
import styled from 'styled-components';
import {BsCheck2All} from  'react-icons/bs';
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { motion } from "framer-motion";
import axios from 'axios';

const Item = {
  hidden: {
    scale: 0,
  },
  show: {
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
    },
  },
};
const Card = ({data}) => {
  const { currentcolor, setSpecificId, setData, todoData } = useStateContext();
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

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



  async function postDelete(_id, e) {
    try {
      await axios
        .delete(`https://fierce-gray-turtleneck.cyclic.app/api/v1/tasks/${_id}`, config)
        .then(function (response) {
          console.log(response);
        });
    setData(todoData.filter(data => data._id !== _id));
     
    } catch (error) {
      console.log(error);
    }
  }


  function editPost(_id, e) {
    setSpecificId(_id);
navigate(`/edit/${_id}`);
  }

  function moreInfo (_id, e) {
    setSpecificId(_id);
    navigate(`/moreinfo/${_id}`);
  }

      async function completedTask(_id, e) {
             fetchData();

        try {
          setCompleted(!completed);
          await axios
            .patch(
              `https://fierce-gray-turtleneck.cyclic.app/api/v1/tasks/${_id}`,
              { completed },
              config
            )
            .then(function (response) {
              console.log(response);
          
            });
                 fetchData();
        } catch (error) {
          console.log(error);
        }
     
      }
function trauncate(string, n) {
  return string?.length > n ? string.substr(0, n - 1) + "..." : string;
}



  return (
    <ComponentWrapper variants={Item}>
      <Component
        currentcolor={currentcolor}
        // initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
        // animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      >
        <p
          style={{
            textDecoration: `${data.completed ? "line-through" : "none"}`,
          }}
        >
          {trauncate(`${data.todo}`, 300)}
        </p>

        <Control>
          <BiSearchAlt
            style={{ color: `${currentcolor}` }}
            className="control"
            onClick={() => moreInfo(data._id)}
          />
          <BsCheck2All
            style={{ color: `${currentcolor}` }}
            className="control"
            onClick={() => completedTask(data._id)}
          />{" "}
          <AiOutlineEdit
            style={{ color: `${currentcolor}` }}
            className="control"
            onClick={() => editPost(data._id)}
          />{" "}
          <MdDelete
            style={{ color: `${currentcolor}` }}
            className="control"
            onClick={() => postDelete(data._id)}
          />
        </Control>
      </Component>
    </ComponentWrapper>
  );
}

export default Card

const ComponentWrapper = styled(motion.div)`

`;

const Component = styled(motion.div)`
  width: 20rem;
  position: relative;
  height: 16rem;
  margin: 10px;
  border: 1px solid ${(props) => props.currentcolor};
  display: flex;
  flex-direction: column;

  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  @media (max-width: 480px) {
    width: 9.7rem;
    margin: 1.7px;
    height: 9rem;
  }
  p {
    padding: 14px;
    font-weight: 600;
    @media (max-width: 480px) {
      padding: 4px;
    }
  }
`;

const Control = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;

  position: absolute;
  bottom: 0;
  right: 0;
  .control {
    margin: 10px;
    font-size: 20px;

    cursor: pointer;
    @media (max-width: 480px) {
      margin: 4px;
      font-size: 14px;
    }
  }
  @media (max-width: 480px) {
    padding: 4px;
  }
`;