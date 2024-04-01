import {ProductCard} from "./FilterButtonCards"                              

const HOC_Promoted=()=>{                        
    return (props)=>{                           //Props will be received from PromotedCard Comp
        console.log(props.company);             //Only Promoted Company's name will come 
        const styl={
          position:"absolute",
          padding:"8px",
          backgroundColor:"black",
          color:"white",
          marginLeft:"80px",
        }
        return(
            <div>
                <div style={styl}>Promoted</div>
                <ProductCard {...props}></ProductCard>             {/*Destructuring props and sending them to ProductCard Comp*/}
            </div>
        )
    } 
}
export default HOC_Promoted;