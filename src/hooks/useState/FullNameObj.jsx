import React, { useState } from 'react'

function FullNameObj(){
    const [obj,setObj]=useState({
        fn:"F.name",
        ln:"L.name",
        fullName:"Full Name"
    })
    const doUpdateObj=(event)=>{
        console.log(event.target);
        //let name=event.target.name;
        //let value=event.target.value;
        //alert(name+"  "+value);
        //OR
        const {name,value}=event.target;
        setObj({...obj,[name]:value});                      //destructuring the obj and updating it's specific prop without changing the other props
    }
    function doJoin()
    {
        let joined=obj.fn+" "+obj.ln;
        setObj({...obj,["fullName"]:joined})
    }
    return(
        <div>
            <center>
            <h2>Full Name App</h2>
            <p>
                F.name: <input type="text" name="fn" onChange={doUpdateObj}/> *{obj.fn}     {/* name must be same as prop of obj*/}
            </p>
            <p>
                L.name: <input type="text" name="ln" onChange={doUpdateObj} /> *{obj.ln}       
            </p>
            <p>
                <input type="button" value="Do Join" onClick={doJoin} />
            </p>   
            <p>
                Full Name: {obj.fullName}
            </p>
            <p>
                {JSON.stringify(obj)}
            </p>
            </center>
        </div>
    )
}
export default FullNameObj;
