import React, { useEffect, useId, useRef, useState } from 'react';

function ShockAndShake(){
    const[pwd,setPwd]=useState("");
    const [count,setCount]=useState(11);
    const refPwd=useRef();
    const refSpan=useRef();
    const id=useId();                                   //Both ids will be different
    const id2=useId();

    useEffect(()=>{

        console.log(refPwd);
        console.log(refSpan);

        if(count>=1){                            //11,10,....,1
            setCount((count)=>count-1);          //10,9,....,0
            refPwd.current.style.backgroundColor="white";
            refSpan.current.innerHTML="*";
        }
        else if(refPwd.current.value.length<=10)
        {
            refPwd.current.style.backgroundColor="lightgreen";
            refSpan.current.innerHTML="Valid";

        }
        else{
            //refPwd.current.disabled=true;
            refPwd.current.style.backgroundColor="red";
            refSpan.current.innerHTML="Invalid";
        }
    },[pwd,id]);
    return(
        <>
           Enter Password: <input type="text" id={id+"txt"} maxLength={11} value={pwd} onChange={(e)=>setPwd(e.target.value)} ref={refPwd} /> 
           Length={count}&nbsp;
            <span id={id2} /*id={id+"txt2"}*/ ref={refSpan}></span>
        </>
    )
}
export default ShockAndShake;