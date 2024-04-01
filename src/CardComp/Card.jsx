/*function Card(){
    return(
        <div style={{width:"300px",border:"1px black solid",height:"400px"}}>   //Inline css
          <center><h2>Product Details</h2></center>
        </div>
    )
}
*/
/*function Card(){
    const styleObj={              //Embedded Css
        width:"300px",
        border:"1px black solid",
        height:"400px",
        backgroundColor:"cyan"
    }
    return(
        <div style={styleObj}>
            <center><h2>Product Details</h2></center>
        </div>
    )
}*/
import './CardStyle.css';                              //(.) symobolises cd i.e. CardComp folder
import style from "./card.module.css";
import style2 from "./diff.module.css";
import MyImage from "./Image";                         //Identifier's name after import may not be same as component's name in case of default export 

function Details()
{
    const website = "www.floralfantasy.com";
    return(
        <>
        <h2 style={{fontStyle:"italic"}}>Lily Bloom</h2>
        <h3>Floral Stylist</h3>
        <h5 style={{fontStyle:'oblique'}}>Contact: 96543-XXXXX</h5>
        <h5 style={{fontStyle:'oblique'}}>Website: {website}</h5>
        <p/>
        <div className="button">Order Now</div>
        {/* <div className={style.btn}>Next</div>   */}
        {/* <div className={style2.btn}>Prev</div> */}
        </>
    )
}
function Card(){
    return(
        <div className="card-outer card-brdr">
           <center>
            <p/>
            <p>
            <MyImage></MyImage>
            </p>
            <Details/>
           </center>
        </div>
    )
}
export default Card;
