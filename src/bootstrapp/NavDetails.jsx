import React from 'react'
import {useNavigate, useParams} from 'react-router-dom';

function NavDetails() 
{
   var navigate=useNavigate();
   var parms= useParams();
   //alert(parms.productid);
    return (
    <>
       <div>NavDetails of Product id={parms.productid}</div>
       <center> 
        <input type='button' value="Back" onClick={()=>navigate(-1)} style={{border:"1px black solid",padding:"10px"}}></input>
       </center>
    </>
  )
}
export default NavDetails;