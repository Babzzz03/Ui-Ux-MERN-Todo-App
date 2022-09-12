import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { BsCheck2All } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";

import { useStateContext } from "../contexts/ContextProvider";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const Search = () => {
   const { currentcolor, setSpecificId, todoData, setData } = useStateContext();
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState('none')
   const [todo, setTodo] = useState("");
  const [fetchSpecific, setFetchSpecific] = useState([])
    const id = useParams();
      useEffect(() => {
        fetchSpecificData();
      }, []);

      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const fetchSpecificData = async () => {
        try {
          axios
            .get(`http://localhost:3000/api/v1/tasks/${id.id}`, config)
            .then((response) => {
              setFetchSpecific(response.data.cart);
            
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
                 .get(`http://localhost:3000/api/v1/tasks/${id.id}`, config)
                 .then((response) => {
                   setData(response.data.cart);
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
        .delete(`http://localhost:3000/api/v1/tasks/${_id}`, config)
        .then(function (response) {
          console.log(response);
        });
        setAlertMessage('block')
      fetchData();
     setTimeout(() => {
         setAlertMessage("none");
       navigate(`/`);
     }, 2000);  
    } catch (error) {
      console.log(error);
    }
  }

  function editPost(_id, e) {
    setSpecificId(_id);
    navigate(`/edit/${_id}`);
  }


  return (
    <Container>
      <SearchWrapper>
        <p>{fetchSpecific.todo}</p>
        <div className="icons">
          <BsCheck2All
            className="control"
            style={{ color: `${currentcolor}` }}
          />{" "}
          <AiOutlineEdit
            style={{ color: `${currentcolor}` }}
            className="control"
            onClick={() => editPost(fetchSpecific._id)}
          />{" "}
          <MdDelete
            style={{ color: `${currentcolor}` }}
            className="control"
            onClick={() => postDelete(fetchSpecific._id)}
          />
        </div>
      </SearchWrapper>
      <DeleteAlert alertMessage={alertMessage}>
        {" "}
        <p>
          {" "}
          <FiAlertTriangle style={{ color: "red", marginRight: "10px" }} />{" "}
          Successfuly <span>Deleted </span> '{fetchSpecific.todo}'
        </p>
      </DeleteAlert>
    </Container>
  );
}

export default Search


const Container = styled.div`

color: black;
background-color: #e6dbdb;
margin: 10vh;
width: 80%;
min-height: 100vh;
display: flex;
align-items: flex-start;
justify-content: center;
`

const SearchWrapper = styled.div`
position: relative;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(30px);
  border-radius: 10px;
  padding: 10px;
  margin: 14px;
  display: flex;
  flex-direction: column;
  min-height: 40vh;
  min-width: 50vh;
  p {
    margin: 14px;
  }

  .icons {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
  }
  .control {
    margin: 10px;
    font-size: 20px;
  }
`;

const DeleteAlert = styled.div`
  position: absolute;
  right: 30px;
  top: 20px;
  width: 100%;
  display: ${(props) => props.alertMessage};
  p {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(30px);
    padding: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    color: #df5c5c;
    margin: 0px 4px;
  }
`;
