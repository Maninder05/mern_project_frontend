import "./CardStyle.css";
import HOC_Promoted from "./HOC_Promoted";

//exports are useful when exporting multiple vals & importing 'em together with their specific names, aka concise/named export
export function ProductCard(props){                                                        
  return(
    <div className="card-outer card-brdr">
        <p style={props.design}>
            Company:{props.company}                              
        </p>
        <p>
            Price:{props.price}                                   
        </p>
        <p>
            Model:{props.model}
        </p>
        <p>
            Owner:{props.owner}                    
        </p>
        <p>
            Details: {props.children}
        </p>                   
        <center> 
        <p> 
            <img src={props.path} alt="" width={200} height={150} />  
        </p> 
        </center> 
     </div>
  )
}
//export {ProductCard};

function FilterButtonCards({data:dataJsonArray}) 
{
    //Here High Ordered Component(HOC_Promoted) is used to restructure initial ProductCard cmp into PromotedCard cmp
    const PromotedCard=HOC_Promoted(ProductCard);                    //Passing comp/fxn as an arg in another cmp 
    function genCard(obj)
    {
        return(
               
            obj.promoted?<PromotedCard {...obj}  key={obj.id} design={{color:"yellow",backgroundColor:"purple",padding:"10px"}}><h6 style={{fontStyle:'italic'}}>It's Perfect and Speedy Model.Must Purchase at the Earliest!!!</h6></PromotedCard>
                        :<ProductCard {...obj}  key={obj.id} design={{color:"yellow",backgroundColor:"purple",padding:"10px"}}><h6 style={{fontStyle:'italic'}}>It's Perfect and Speedy Model.Must Purchase at the Earliest!!!</h6></ProductCard>
        )
    }
    return(                                                          
        <div style={{display:"flex","flexWrap":"wrap"}} >
        {                                                            
            dataJsonArray.map(genCard)
        }
        </div>    
    )
}
export default FilterButtonCards;
//export defaults are handy for exporting a single cmp & giving it a custom/any name when importing
