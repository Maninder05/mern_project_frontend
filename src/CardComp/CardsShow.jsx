import './CardStyle.css';              
import JsonArray from "./JSONAry.jsx";

function ProductCard(props){                                //props: JSX obj used to import properties from one cmp to another
  return(
    <div className="card-outer card-brdr">
      <p style={props.design}>
        Company:{props.company}                                  {/* props.company=DELL,HP,etc / obj.prop=value */}
      </p>
      <p>
        Price:{props.price}                                      {/*Alt Way: {props.obj.price} if obj={obj} is received in props*/}
      </p>
      <p>
        Model:{props.model}
      </p>
      <p>
        Owner:{props.owner}                       
      </p>
      <p>
        <b>Details: {props.children}</b>                          {/*children prop is used to enter text*/}
      </p>
      <p> 
        <center> 
          <img src={props.path} alt="" width={200} height={150} /> 
        </center> 
      </p> 
     </div>
  )
}

/*
function ProductCard2({company,price,owner,model,children,design})
{
  console.log(design);  
    return(
      <div className="card-outer card-brdr">
        <p style={design}>
          Company:{company}
        </p>
        <p>
          Price:{price}
        </p>
        <p>
          Model:{model}
        </p>
        <p>
          Owner:{owner}
        </p>
        <p>
          <b style={{color:"blue",backgroundColor:design.backgroundColor,padding:design.padding}}>Details:</b>  {children}     
        </p>
      </div>
    )
}
*/
function CardsShow() 
{
  function genCard(obj)
  {
    return(

      <ProductCard {...obj}  key={obj.id} design={{color:"yellow",backgroundColor:"purple",padding:"10px"}}> {/*{...obj} -> to receive all properties*/}
      <h6 style={{fontStyle:'italic'}}>It's Perfect and Speedy Model.Must Purchase at the Earliest!!!</h6>
      </ProductCard>
      
    ) 
  }
  return(                                                          //( ) is to use HTML within JS fxn
    <div style={{display:"flex","flex-wrap":"wrap"}} >
      {                                                            //{ } is to use JS within HTML area
        JsonArray.map(genCard)
      }
    </div>    
  )
}
export default CardsShow;

/*
Note:- Alternate of line no. 72;
    JsonArray.map((obj)=>{
        return(  
          <ProductCard obj={obj} key={obj.id} company={obj.company} price={obj.price} model={obj.model}>
          </ProductCard>    //key prop is necessary while rendering objs/lists in react to help identify individual element efficiently 
        )
      }
    )
*/

//Code for ProductCard2()
/*
  <ProductCard2 {...obj} key={obj.id} design={{color:"red",backgroundColor:"yellow",padding:"10px"}} >
    <h4 style={{fontStyle:'italic'}}>
    It's Perfect and Speedy Model.
    Must Purchase at the Earliest!!!
    </h4>
  </ProductCard2>
*/