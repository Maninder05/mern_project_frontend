import JsonArray from "./JSONAry";
import {useState} from "react";
import FilterButtonCards from "./FilterButtonCards";

function Filterbuttons(){
    
    const [filteredJsonArray,setFilter]=useState(JsonArray);

    const companySet=new Set();                                        //new Set(): creates a new Set (an array containing distinct vals) 
    JsonArray.map((obj)=>{
       return companySet.add(obj.company);
    })
    console.log(companySet);
    const companyAry=["All",...companySet];                             //Set must be destructured into an array so as to apply map() on it

    /*
    function genButtons(obj){  
        return(
           <input type="button" value={obj} style={{backgroundColor:"yellow",color:"black",height:"40px",width:"100px",marginLeft:"30px"}}></input>
        ) 
    }
    function fillCombo(obj){
        return(
            <>
                <select>
                <option value={obj.company}>{obj.company}</option>
                <option value={obj.price}>{obj.price}</option>
                <option value={obj.model}>{obj.model}</option>
                <option value={obj.owner}>{obj.owner}</option>
                </select>
            </>
        )
    }
    */
    function doFilter(event)
    {
        if(event.target.value==="All")
        {
            setFilter(JsonArray);
            return;
        }
        //alert(event.target.value);
        const dataSel= JsonArray.filter((obj)=>obj.company===event.target.value);
        console.log(dataSel)
        setFilter(dataSel);
    }
    return(
        <>
            {/*<div style={{backgroundColor:"purple",height:"40px"}}>
                {
                 companyAry.map(genButtons)
                }
            </div> 
            <p/> 
            <div>
               {
                JsonArray.map(fillCombo)
               }
            </div> */}
            <center>
               <CompanyCombo data={companyAry} filterFx={doFilter}></CompanyCombo>         {/*Parent Comp*/}
               <FilterButtonCards data={filteredJsonArray}></FilterButtonCards>
            </center> 
        </>
    )
}
function CompanyCombo(props)
{
    return(
        <>  
            {/* Here onChange ref of fxn will be passed from this Child comp to the Parent comp */}
            <select onChange={props.filterFx}>           {/*onChange={(event)=>{props.filterFx(event.target.value)}} */}
            {
                props.data.map((str,index)=>{
                    return(
                        <option key={index} value={str}>{str}</option>
                    )
                })
            }
            </select>
        </>
    )
}
export default Filterbuttons;
