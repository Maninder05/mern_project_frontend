import React,{useState} from "react";
import axios from "axios";
import "../index.css";

function ItemsManager(){

  const [obj,setObj]=useState({emailid:""});
  const [result,setResult]=useState([]);      //result state must be initialised as an empty err else map won't be able to traverse it till serverMsg.result is received
  //const [prev,setPrev]=useState();

  function doUpdate(event){

    var {name,value}=event.target;
    setObj({...obj,[name]:value});

  }
  async function doFetchProduct()
  {
    const url = `https://g2c-mern-project.onrender.com/grower/fetch-product?emailid=${obj.emailid}`; 

    const serverMsg= await axios.get(url);
    console.log(JSON.stringify(serverMsg));
    
    if(serverMsg.data.result.length!==0){

      alert(JSON.stringify(serverMsg.data.result));                 //Result Array will be fetched from DB                                  
      setResult(serverMsg.data.result);  
      //setPrev(`https://g2c-mern-project.onrender.com/uploads/${serverMsg.data.result.proofpic}`); 
    }
    else
      alert("Invalid ID")
  }
  async function doDeleteProduct(product)
  {
    const url = `https://g2c-mern-project.onrender.com/grower/delete-product?selproduct=${product}`; 

    const serverMsg= await axios.get(url);
    console.log(JSON.stringify(serverMsg));
    
    if(serverMsg.data.msg==="Removed"){
      alert("Product Removed Successfully!!")
    }
    else
      alert("Invalid ID")
  }
  return(
    <>
      <div className="container">
        <div className="row-md-12">
          <center><p className="text-3xl/[70px] font-serif">Manage Products Here</p></center>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <p className="flex flex-wrap">
                <label htmlFor="emailid" className="block mb-2 text-base font-serif font-medium text-gray-900">Email Address&nbsp;&nbsp;</label>
                </p>
                <input type="email" id="emailid" name="emailid" onChange={doUpdate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" required/>
            </div>
            <div>
              <button type="button" onClick={doFetchProduct} className=" block mt-5 ml-[23px] w-[100px] rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2  focus-visible:outline-indigo-600">
                  Search
              </button> 
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-1 table table-info table-striped-columns" style={{marginTop:"20px"}}>
            <table>
              <tr align="center">
                <th>Sr. No.</th>
                <th>Category</th>
                <th>Product</th>
                <th>Picture</th>
                <th>Manage Products</th>
              </tr>
              {result.map((obj,index)=>{             
                return (
                  <tr key={index}>    
                    <td>{index+1}</td> 
                    <td>{obj.category}</td>
                    <td>{obj.selproduct}</td>
                    <td align="center">
                      {obj.proofpic}
                      {/* <img src={prev} width="150" height="50" alt=""/> */}
                    </td> 
                    <td align="center">
                      <button onClick={()=>{doDeleteProduct(obj.selproduct)}} class="btn btn-outline-danger text-dark">Delete</button>
                    </td>
                  </tr>
              )})} 
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
export default ItemsManager;
