import React, { useEffect, useState } from 'react'

//UseEffect works/initiates after rendering(i.e. updation of DOM)
function useEffectJSG(){
    const [fn,setFn]=useState("F.name");
    const [ln,setLn]=useState("L.name");
    
    function doUpdateFx(event){
        setFn(event.target.value);
    }
    /*
    useEffect(()=>{
        console.log("Side Effect")
    });                                         //No dependency array means side effect will take place on every re-render(i.e whenever the state changes)
    */
    /*
    useEffect(()=>{
        console.log("Side Effect")
    },[]);                                      //Empty array of dependencies means side effect will only take place once when comp is first rendered(mounted)
    */
    useEffect(()=>{
        console.log("Side Effect")
    },[fn]);                                     //Filtered/Occasional SE: Side effect will take place only when fn state changes 
    console.log("Comp Rendered");
    return(
        <>
            <div>
                <center style={{marginTop:"10px"}}> 
                <p>
                    <input type="text" value={fn} onChange={doUpdateFx}/>              
                </p>
                <p>
                    <input type="text" value={ln} onChange={(event)=>setLn(event.target.value)} /> 
                </p>
                <p>{fn+" "+ln}</p>
                </center>
            </div>
        </>
    )
}
export default useEffectJSG;