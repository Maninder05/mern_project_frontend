import {useState} from "react";

function FullName(){

    console.log("rendered");
    const [fn,setFn]=useState("Fill Name");             //fxns must be in camelCase format
    const [ln,setLn]=useState("Fill Name");
    const [fullName,setFullName]=useState("Full Name");
    
    function updateLastName(event)                  //event works same as 'this'
    { 
        setLn(event.target.value);                  //event.target is a prop of event obj that refers to the element itself that triggered the event
    }
    function doJoin()
    {
        setFullName(fn+" "+ln);
    }
    return(
        <div>
            <center>
            <p>
                <h2>Full Name App</h2>
            </p>
            <p>
                F.name: <input type="text" onChange={(event)=>{setFn(event.target.value)}}/> *{fn}    {/*  event: an obj having ref of the element that will notify changes in it's environment */}
            </p>
            <p>
                L.name: <input type="text" onChange={updateLastName} /> *{ln}            {/*onChange is an event handler which calls the fxn receiving current input field ref as parameter once event(change) is triggered*/}
            </p>
            <p>
                <input type="button" value="Do Join" onClick={doJoin} />
            </p>   
            <p>
                Full Name: {fullName}
            </p>
            </center>
        </div>
    )
}
export default FullName;