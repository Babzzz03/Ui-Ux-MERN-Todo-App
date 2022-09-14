
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import styled from 'styled-components';
import GlobalStyle from './globalStyles';
import Home from './pages/Home';
import Edit from './pages/Edit';
import { useStateContext } from "./contexts/ContextProvider";
import Search from './components/Search';
import Login from './components/Login';

import CreateAccount from './components/CreateAccount';

function App() {
    const {
      font,

      isToggled,

      isModalOpened,
      screenSize,
    } = useStateContext();
  return (
    <>
      <GlobalStyle isToggled={isToggled} />

      <BrowserRouter>
        <Container font={font} isToggled={isToggled}>
          <Sidebarcontainer
            isToggled={isToggled}
            isModalOpened={isModalOpened}
            screenSize={screenSize}
          >
            <Sidebar />
          </Sidebarcontainer>

          <Maincontainer isModalOpened={isModalOpened} screenSize={screenSize}>
            <Routes>
              {/* Home  */}
              <Route path="/" element={<Home />} />
              {/* Edit  */}
              <Route path="/edit/:id" element={<Edit />} />
              {/* info  */}
              <Route path="/moreinfo/:id" element={<Search />} />
            </Routes>
          </Maincontainer>
        </Container>
        <Routes>
          {/* info  */}
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100vw;
  font-family: ${(props) => props.font};
 
  color: ${(props) => (props.isToggled ? "white" : "")};
  .open {
    width: 100vw!important;
  }
`;

const Sidebarcontainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  z-index: 1000;

  overflow-y: scroll;
  overflow-x: hidden;
  bottom: 0;


  width: ${(props) =>
    props.isModalOpened ? `${props.screenSize > 1032 ? "25vw" : "52vh"}` : "0"};
  height: 100vh;
  background-color: ${(props) => (props.isToggled ? "#262724" : "whitesmoke")};
`;

const Maincontainer = styled.div`


  width: ${(props) =>
    props.isModalOpened && props.screenSize > 1032 ? "75vw" : "100vw"};

  position: relative;
  right: 0px;
  left: 0;
`;

