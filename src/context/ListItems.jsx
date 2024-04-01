import React, { useContext } from 'react';
import { contextJson } from './Home';

function ListItems() 
{
    var ary=useContext(contextJson);
    function genList(obj,index)
    {
        return(
            <div key={index} style={{width:"300px",border:"1px black solid",margin:"10px"}}>
                <center>
                <p>{obj.company}</p>
                <p>{obj.price}</p>
                </center>
            </div>
        )
    }
    return (
        <div style={{display:"flex"}}>
            {
                ary.map(genList)
            }
        </div>
    )
}

export default ListItems