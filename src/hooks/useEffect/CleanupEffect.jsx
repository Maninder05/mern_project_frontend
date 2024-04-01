import React, {useEffect,useState} from "react";

function Cleanup(){
    const [count,SetCount]=useState(0);

    useEffect(()=>{
        const interval=setInterval(()=>{     
            SetCount(count+1)                          //don't use c=>c+1 if not clearing pervious Intervals
            console.log(count)                         //without clearInt (0 01 012 0123 01234)   with clearInt(0 1 2 3 4)
        },1000);
        
        return(()=>
        clearInterval(interval));
    },[count]);
    return(
        <div>
            <center>
                {count}
            </center>
        </div>
    )
}
export default Cleanup;