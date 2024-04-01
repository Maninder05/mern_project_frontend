import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Routes,Route,useNavigate} from 'react-router-dom';
import Home from '../context/Home';
import ProfileForm from './ProfileForm';
import BsCards from './BsCards';
import Filterbuttons from '../CardComp/FilterButtons';
import JSG from '../tailwnd/JSG';
import NavDetails from './NavDetails';
import Footer from './Footer';
import React, { useState, useEffect } from "react";

function NavBar() { 
  let navigate=useNavigate();
  function openDash()
  {
    navigate("/TailwindDash");
  }  

  function openDetailsWithId()
  {
    let pid=10000872;
    navigate("/showDetailsWithIdPage/"+pid);
  }

  //Alternatively react-detect-offline package can be installed 
  const [isOnline, setIsOnline] = useState(navigator.onLine);           //navigator.onLine prop is used to chk the network connection which returns a boolean indicating whether browser is curr online or not

  useEffect(() =>{

    function onlineHandler() {
      setIsOnline(true);
    }
    function offlineHandler() {
      setIsOnline(false);
    }
    console.log(isOnline ? "Online" : "Offline");
    window.addEventListener("online", onlineHandler);                   //online event is added to window obj which'll be triggered as soon as device/browser detects active intr conn and isOnline state will be updated to true
    window.addEventListener("offline", offlineHandler);
  
    return(() => {
      console.log("State Updated");
      window.removeEventListener("online", onlineHandler);               //this method removes the event listener that was added earlier for the online event to ensure evnt is no longer listened once comp gets re-rendered
      window.removeEventListener("offline", offlineHandler);             //helps prevent memory leaks
    })
  },[isOnline]);
	
  return (
    <>
      <Navbar expand="lg" className="bg-info" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Profile">Profile</Nav.Link>
              <Nav.Link href="/Cards">Bootstrap&nbsp;Cards</Nav.Link>
              <Nav.Link href="/Filter">Filter&nbsp;Data</Nav.Link>
              {/* Opening a Component without using <Nav.Link/> */}
              <input type="button" value="Tailwind" style={{border:"1px black solid",padding:"10px"}} onClick={openDash} ></input>
              <input type="button" value="Details With Id" style={{border:"1px black solid",padding:"10px",marginLeft:"10px"}} onClick={openDetailsWithId} ></input>
              <Nav.Link  style={{marginLeft:"700px"}}>
                {isOnline 
                  ? <b>Online :)</b> 
                  : <b>Offline :(</b>
                }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="Profile" element={<ProfileForm></ProfileForm>}></Route>
        <Route path="/Cards" element={<BsCards></BsCards>}></Route>
        <Route path="/Filter" element={<Filterbuttons></Filterbuttons>}></Route>
        <Route path="/TailwindDash" element={<JSG></JSG>}></Route>
        <Route path='/showDetailsWithIdPage/:productid' element={<NavDetails></NavDetails>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default NavBar;

  	