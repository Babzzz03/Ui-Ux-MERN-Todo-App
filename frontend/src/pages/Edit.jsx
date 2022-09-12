import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import edit from "../assets/logo.png";
import { useStateContext } from "../contexts/ContextProvider";
import { MdDelete } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
const Edit = () => {
  const id = useParams()
     const { currentcolor, font, setData } = useStateContext();
     const navigate = useNavigate();
  const [completed, setCompleted] = useState('')
    let [edited, setEdited] = useState('');
      const [alertMessage, setAlertMessage] = useState("none");
     const [fetchEditSpecific, setFetchEditSpecific] = useState([]);
  const [currentState, setCurrentState] = useState('');
  const setMode = (e) => {
    setCurrentState(!currentState);

  } 

  useEffect(() => {
    fetchSpecificData();

  }, [])
  

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
         setFetchEditSpecific(response.data.cart);
          setCurrentState(response.data.cart.completed);
             setEdited(response.data.cart);
        })

        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

console.log(fetchEditSpecific);
  console.log(currentState);
  
 async function editName(e) {
   e.preventDefault();
   try {
     await axios
       .patch(
         `http://localhost:3000/api/v1/tasks/${id.id}`,
         { todo:edited, completed:currentState },
         config
       )
       .then(function (response) {
         console.log(response);
       });
    
   } catch (error) {
     console.log(error);
   }
 }

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
      setAlertMessage("block");
      fetchData();
      setTimeout(() => {
        setAlertMessage("none");
        navigate(`/`);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

console.log(edited);
  return (
    <Component>
      <img src={edit} alt="" />
      <GlassyBackground>
        <EditWrapper>
          <EditTodo>
            <textarea
              name=""
              id=""
              value={edited.todo}
              cols="30"
              rows="10"
              style={{
                border: `1px solid ${currentcolor}`,
                fontFamily: `${font}`,
              }}
              onChange={(e) => setEdited(e.target.value)}
            ></textarea>
            <Controls currentcolor={currentcolor}>
              <CompletedState>
                <input
                  type="radio"
                  id="dark"
                  name="theme"
                  value={true}
                  style={{ accentColor: `${currentcolor}` }}
                  onChange={setMode}
                  className="cursor-pointer"
                  checked={currentState === true}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="dark" className="labels">
                  Completed
                </label>

                <input
                  type="radio"
                  id="light"
                  name="theme"
                  value={false}
                  style={{ accentColor: `${currentcolor}` }}
                  className="cursor-pointer"
                  onChange={setMode}
                  checked={currentState === false}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="light" className="labels">
                  InCompleted
                </label>
              </CompletedState>

              <MdDelete
                style={{ fontSize: "24px", color: `${currentcolor}` }}
                onClick={() => postDelete(edited._id)}
              />
            </Controls>
            <Button>
              <button
                style={{
                  border: `1px solid ${currentcolor}`,
                  fontFamily: `${font}`,
                }}
                onClick={editName}
              >
                Edit
              </button>
            </Button>
          </EditTodo>
        </EditWrapper>
      </GlassyBackground>
      <DeleteAlert alertMessage={alertMessage}>
        <p>
          {" "}
          <FiAlertTriangle style={{ color: "red", marginRight: "10px" }} />{" "}
          Successfuly <span>Deleted </span>
        </p>
      </DeleteAlert>
    </Component>
  );
}

export default Edit


const Component = styled.div`
position: relative;
padding: 10rem;

img{
  height: 70vh;
  right: 20rem;
  object-fit: contain;
  position: fixed;
}
`

const GlassyBackground = styled.div`
position: absolute;
display: flex;
padding-top: 4rem;
align-items: flex-start;
justify-content: center;
top: 20px;
left: 20px;
right: 24px;
bottom: 20px;
border-radius: 20px;
min-height: 100vh;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(30px);
`;


const EditWrapper = styled.div`
  display: flex;
  padding-top: 4rem;
  align-items: flex-start;
  justify-content: center;

  width: 49vw;
  min-height: 40vw;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(30px);
`;


const Controls = styled.div`
  margin: 30px;
  display: flex;
  justify-content: space-between;
  padding: 7px;
  align-items: center;
  border-top: 1px solid ${(props) => props.currentcolor};
`;

const EditTodo = styled.div`
  display: flex;
  flex-direction: column;

  textarea {
    background-color: rgba(255, 255, 255, 0.4);
    outline: none;
    padding: 7px;
    width: 40vw;
    max-width: 40vw;
    border-radius: 7px;

    height: 40vh;
  }
  button {
    padding: 10px 4px;
    width: 10rem;
    font-size: 17px;
    font-weight: 700;
cursor: pointer;
    border-radius: 17px;
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const CompletedState = styled.div`
  .cursor-pointer {
    margin-right: 4px;
    cursor: pointer;
  }
  label {
    margin-right: 14px;
  }
 


`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

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