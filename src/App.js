//write rfce
import Contact from "./Contact"
import {Routes,Route} from 'react-router-dom';
import Signup from './mern-project/Signup';                     //Signup + Login
import GrowerDashboard from "./mern-project/GrowerDashboard";
import GrowerProfile from './mern-project/GrowerProfile';
import AvailProducts from './mern-project/AvailProducts';
import ItemsManager from './mern-project/ItemsManager';
import ConsumerDashboard from "./mern-project/ConsumerDashboard";
import ConsumerProfile from './mern-project/ConsumerProfile';
import FindGrower from "./mern-project/FindGrower";
import WebTokenTest from './mern-project/WebTokenTest';

function App() {
  return (
    <>
    {/*===================NAVIGATION===========================*/}
      <Routes>
          <Route path="/" element={<Signup></Signup>}></Route>
          <Route path="/GrowerDashboard" element={<GrowerDashboard></GrowerDashboard>}></Route>
          <Route path="/GrowerProfile" element={<GrowerProfile></GrowerProfile>}></Route>
          <Route path="/AvailProducts" element={<AvailProducts></AvailProducts>}></Route> 
          <Route path="/ItemsManager" element={<ItemsManager></ItemsManager>}></Route> 
          <Route path="/ConsumerDashboard" element={<ConsumerDashboard></ConsumerDashboard>}></Route>
          <Route path="/ConsumerProfile" element={<ConsumerProfile></ConsumerProfile>}></Route>
          <Route path="/FindGrower" element={<FindGrower></FindGrower>}></Route>
          <Route path="/WebTokenTest" element={<WebTokenTest></WebTokenTest>}></Route>
      </Routes>
    {/* <h1>
      Ready To Learn React
    </h1>
    <h3><Contact/></h3> */}
    </>
  );
}
export default App;                              //Only one cmp can be exported at a time using default exp
