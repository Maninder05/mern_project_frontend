import { useState } from "react";                //useState is a React hook which allows us to add state(data/props) to a fxnal comp

function Counter()
{
    const [hcount,doUpdateCountFx]=useState(1);            //useState accepts an initial state and returns a curr state/state var(hcount) and a fxn that updates that state
    console.log("render-1");

    const doIncrement=()=>{
        doUpdateCountFx(hcount+1);
    }
    const doDecrement=()=>{
        doUpdateCountFx(hcount-1);
    }
    const doIncrement3=()=>{
        
        doUpdateCountFx((hcount)=>hcount+1);//2 i.e. updates actual/returned(1) val of hcount variable
        doUpdateCountFx((hcount)=>hcount+1);//3
        doUpdateCountFx((hcount)=>hcount+1);//4- rerendered
        //doUpdateCountFx(hcount+1);//2            /* Var will not be rerendered until the entire event gets completed 
        //doUpdateCountFx(hcount+1);//2
        //doUpdateCountFx(hcount+1);//2
    }
    return(
        <>
            <center>
            <div>
                <input type="button" value="Increment" onClick={doIncrement} style={{backgroundColor:"yellow",color:"black",height:"40px",width:"100px",marginLeft:"30px"}} />
                <input type="button" value="Decrement" onClick={doDecrement} style={{backgroundColor:"yellow",color:"black",height:"40px",width:"100px",marginLeft:"30px"}}/>
                <input type="button" value="Increment by 3" onClick={doIncrement3} style={{backgroundColor:"yellow",color:"black",height:"40px",width:"100px",marginLeft:"30px"}} />
            </div>
            <p>
            {hcount}
            </p>
            </center>
        </>
    )
}
export default Counter;

