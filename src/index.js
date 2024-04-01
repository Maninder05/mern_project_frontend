//TO RUN- cd webpack-> npm start
/*All Componets(i.e. .jsx files) will be shown on a single webpage without the need to reload pg again n again
 as req is primarily sent using Ajax */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Card from "./CardComp/Card";            //(.) symbolises src directory/folder
import CardsShow from "./CardComp/CardsShow"
import Filterbuttons from './CardComp/FilterButtons';
import Counter from './hooks/useState/Counter';
import FullName from './hooks/useState/FullName';
import FullNameObj from './hooks/useState/FullNameObj';
import UseEffectJSG from './hooks/useEffect/UseEffectJSG';
import Cleanup from './hooks/useEffect/CleanupEffect';
import UseEffectRep from './hooks/useEffect/UseEffectRep';
import ShockAndShake from './hooks/ShockAndShake';
import ToDoList from "./todolist/ToDoList";
import CondRender from './CondRender';
import Home from './context/Home';
import BsCards from './bootstrapp/BsCards';
import ProfileForm from './bootstrapp/ProfileForm';
import NavBar from './bootstrapp/NavBar';
import JSG from './tailwnd/JSG';
import Curd from './axioss/Curd';
import Profile from './axioss/Profile';
import {BrowserRouter} from 'react-router-dom';
import Signup from './mern-project/Signup';
import GrowerDashboard from './mern-project/GrowerDashboard';
import GrowerProfile from './mern-project/GrowerProfile'
import AvailProducts from './mern-project/AvailProducts';
import ItemsManager from './mern-project/ItemsManager';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>                                           {/* Avoid using <React.StrictMode/> to prevent comp from rendering twice*/} 
    <BrowserRouter>                            {/* useNavigate() hook can only be used in context of BrowserRouter thus all the components must be enclosed within <BrowserRouter/> for Proper Navigation */}
    <App />   
    {/* <Card></Card>  */}
    {/* <CardsShow></CardsShow>   */}
    {/* <Filterbuttons></Filterbuttons>   */}
    {/* <Counter></Counter>    */}
    {/* <FullName></FullName>    */}
    {/* <FullNameObj></FullNameObj>    */}
    {/* <UseEffectJSG></UseEffectJSG>   */}
    {/* <Cleanup></Cleanup> */}
    {/* <UseEffectRep></UseEffectRep>   */}
    {/* <ShockAndShake></ShockAndShake>   */}
    {/* <ToDoList></ToDoList> */}
    {/* <CondRender></CondRender> */}
    {/* <Home></Home> */}
    {/* <BsCards></BsCards> */}
    {/* <ProfileForm></ProfileForm> */}
    {/* <NavBar></NavBar>      */}
    {/* <JSG></JSG>   */}
    {/* <Curd></Curd>      */}
    {/* <Profile></Profile>     */}
    {/* <GrowerProfile></GrowerProfile> */}
    {/* <GrowerProfile></GrowerProfile>  */}
    {/* <Signup></Signup>      */}
    {/* <AvailProducts></AvailProducts>   */}
    {/* <ItemsManager></ItemsManager>    */}
    </BrowserRouter>
  </>
);
