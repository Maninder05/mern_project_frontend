import React, { useEffect } from "react";
function UseEffectRep(){
    const [fn,setFn]=React.useState("fn");
    const [ln,setLn]=React.useState("ln");

    useEffect(()=>{
        console.log("Use Effect Worked");
    },[ln])
    
    useEffect(()=>{
        let ref=setInterval(()=>{
        console.log(fn)
        },1000);
        
        return(()=>{
            clearInterval(ref);
        })
    },[fn]);
    console.log("Comp rendered");
    return(
        <div>
            <p>
                <input type="text" value={fn} onChange={(event)=>setFn(event.target.value)} />
            </p>
            <p>
                <input type="text" value={ln} onChange={(event)=>setLn(event.target.value)} />
            </p>
            {fn+"   "+ln}
        </div>
    )
}
export default UseEffectRep;