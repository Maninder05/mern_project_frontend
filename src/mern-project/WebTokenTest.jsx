import React from 'react'
import {doValidateTokenWithAxios} from "../services/users-controller";

function WebTokenTest() {
    async function clickHandler(){

      var serverMsg=await doValidateTokenWithAxios();
      alert(JSON.stringify(serverMsg));

      if(serverMsg.data.status===true){

        let ud=JSON.stringify(serverMsg.data.userDetails);
        alert("User Authorized!!"+"  "+"UserDetails="+ud);
      }
      else    
      alert(serverMsg.data.err);
    }
  return (
    <div>
        <button type="button" onClick={clickHandler} className="mt-3 ml-[650px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Do Validate Token</button>
    </div>
  )
}

export default WebTokenTest
