//Context is way for React to manage state globally without using props drilling
import React,{createContext} from 'react'
import Dashboard from './Dashboard';
import jsonAry from "../CardComp/JSONAry";


var contextEmail= createContext();                                  //createContext() is a fxn returning an obj context which acts as ref to global state 
//var Provider=contextEmail.Provider;                               //Provider is a comp of context obj which provides the state/data to its Child Comps
var contextJson= createContext();
function Home() {
    const activeUser="maninder@gmail.com";
  return (
    <>
      <contextEmail.Provider value={activeUser}>                        
      {/* <Provider value={activeUser}>  */}
      <contextJson.Provider value={jsonAry}> 
         <Dashboard></Dashboard>                                        {/*all components created above dashboard comp  will be available at dashbrd */}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
      </contextJson.Provider> 
      {/* </Provider> */}
      </contextEmail.Provider>
    </>
  )
}

export default Home;
export {contextEmail,contextJson}