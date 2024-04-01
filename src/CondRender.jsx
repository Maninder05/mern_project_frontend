/*function Item({name,importance,carry}){
    let resp=name;
    if(importance>0)
        resp=resp+"✅";                                               //Anything written inside JS must be in str format unlike HTML
    else
        resp=resp+"❌"
    return(
        <li>{resp}</li>
    )
}*/

/*function Item({name,importance,carry}){
    if(importance>0)
    {
        return(<li>{name} ✅</li>)                 
    }
    return(<li>{name} ❌</li>)
}*/

//Using Conditional Oprts
/*function Item({name,importance,carry}){
    return(<li> {name} {importance>0 ? "✅" : "❌"}</li>
    )
}*/

//Using && => if importance>0 then add ✔️...here else condition may not be given
/*function Item({name,importance,carry}){                            
   return(
    <li>
        {name}                                      
        {importance>0 && "✅"}                              
        {importance===0 && "❌"}
    </li>
   )
}*/

/*function Item({ name, importance,carry }){
    return(
        <>
          <li>
            <p/>
            {name} &nbsp;&nbsp;
            {importance>0 ? (<input type="button" value="Accept"/>)
            : (<input type="button" value="Reject"/>)}
          </li>
        </>
    )
}*/

/*function Item({ name, importance,carry }) 
{
    // if(carry===false ){
    //  return null;
    // }
    // return <li>{name} (Importance:{importance})</li>;
    
    return(
        <>
            {carry===true && (<li>{name} Importance:{importance}</li>)}
        </>
    )
}*/

function Item({name,importance,carry}){
    return(
        <li>
          {importance>0? (<u>{name+"("+carry+")"}</u>) 
           :(<strike>{name +"  "+carry}</strike>)}  
        </li> 
    ) 
}

export default function CondRender(){
    return(
        <>
           <h1>Packing List</h1>
           <ul>
               <Item carry={true}
                  importance={9}
                  name="Books"
               />
               <Item carry={false}
                  importance={0}
                  name="Laptop"
               />
               <Item carry={true}
                  importance={4}
                  name="Pen"
               />
               <Item carry={true}
                  importance={8}
                  name="Mobile"
               />
               <Item carry={false}
                  importance={0}
                  name="Glasses"
               />
           </ul>    
        </>
    )
}
