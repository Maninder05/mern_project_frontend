import React,{useEffect,useState} from "react";
import axios from "axios";
import {baseURL} from "../services/axios-config";
import "../index.css";

function FindGrower(){

    const [obj,setObj]=useState({category:"", 
    product:"",
    selprod:"",
    city:"",
    });
    const [showFindGrowerPg,setFindGrowerPg]=useState(true);       //FindGrowerPg will hide on click of Search Grower Btn and Cards will be shown 
    const [product,setProduct]=useState([]);
    const [selprod,setSelProd]=useState("");
    const [city,setCity]=useState([]);
    const [showGrowerCards,setGrowerCards]=useState(false);
    const [result,setResult]=useState();                           //No need for prior initialisation as map over result state will only be traversed once setGrowerCards is set true i.e. serverMsg.result is received in form of Array
    const [prev,setPrev]=useState();

    function doUpdate(event){

      var {name,value}=event.target;
      setObj({...obj,[name]:value});

      //============Filling Product Combo=============
      var milkProduct=["Milk","Butter","Paneer","Buttermilk","Curd"];
      var vegProduct=["Carrots","Okra","Beans","Cabbage","Peas"];
      var fruitProduct=["Apple","Mango","Banana","Orange","Grapes"];
      var nutProduct=["Almond","Cashew","Walnut","Peanut","Pistachio"];
      var oilProduct=["Mustard","Sesame","Olive","Sunflower","Soyabean"];
      
      if(value==="Dairy Products"){
        setProduct(milkProduct);
      }
      else if(value==="Veggies"){
        setProduct(vegProduct);
      }
      else if(value==="Fruits"){
        setProduct(fruitProduct);
      }
      else if(value==="Nuts"){
        setProduct(nutProduct);
      }
      else if(value==="Edible Oil"){
        setProduct(oilProduct);
      }
    }
    //==============Updating Selected Product====================
    const doUpdate2=(event)=>{

      setSelProd(event.target.value);
      setObj({...obj,"selprod":event.target.value})

    }
    //========Filling City Combo as per Selected Product=======
    async function doUpdateCity(){

      const url = `${baseURL}/grower/fetch-city`;  
      //alert(JSON.stringify(obj));
      
      const serverMsg= await axios.post(url,obj);
      //alert(JSON.stringify(serverMsg));

      if(serverMsg.data.result.length!==0){ 

        const citySet=new Set();  
        serverMsg.data.result.map((obj)=> {
          return citySet.add(obj.city);
        })
        console.log(citySet);
        const citiesAry=[...citySet]; 
        setCity(citiesAry);

      }
      else{
        const citiesAry=[]; 
        setCity(citiesAry);
      }
    }
    useEffect(()=>{                                             //it will initialise whenever val of selprod state will get updated
      doUpdateCity();
    },[selprod])   

    async function doFindGrower(){

      const url = `${baseURL}/consumer/find-grower`;  
      // alert(JSON.stringify(obj));

      const serverMsg= await axios.post(url,obj);  
      alert(JSON.stringify(serverMsg));
 
      if(serverMsg.data.result.length!==0){

        alert("Grower Found!!");
        //alert(JSON.stringify(serverMsg.data.result));
        setFindGrowerPg(false);
        setResult(serverMsg.data.result);
        setPrev(`https://g2c-mern-project.onrender.com/uploads/${serverMsg.data.result.proofpic}`);
        setGrowerCards(true);

      }
      else    
        alert("No Such Grower Found!");
    }
    return(
        <>
          <div className="container">
          <div className="row-md-12">
            <center><p className="text-3xl/[70px] font-serif">Find Grower</p></center>
            {showFindGrowerPg ? 
            <div className="grid gap-6 mb-6 md:grid-cols-1">
              <div>
                  <label htmlFor="category"  id="category" className="block mb-2 text-base font-serif font-medium text-gray-900">Product Category</label>
                  <select id="category" name="category" onChange={doUpdate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="" required>
                    <option defaultValue={"Choose..."}>Choose..</option>            {/*Here onChange={doUpdate} val of category will be updated in obj state and relative products will be updated in prod combo*/}
                    <option value="Dairy Products">Dairy Products</option>
                    <option value="Veggies">Veggies</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Nuts">Nuts</option>
                    <option value="Edible Oil">Edible Oil</option>
                  </select>
              </div> 
              <div>
                <label htmlFor="product" className="block mb-2 text-base font-serif font-medium text-gray-900">Products</label>
                    <select name="product" id="product" onChange={doUpdate2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="" required>    
                        <option defaultValue={"Choose"}>Choose..</option>           {/*Here onChange={doUpdate2} value of selprod will be updated in obj state as well as selprod state invoking useEffect and filling corresponding city combo*/}
                        {product.map((str,index)=>{
                            return <option key={index} value={str}>{str}</option>
                        })}
                    </select>
              </div>
              <div>
                <label htmlFor="city" className="block mb-2 text-base font-serif font-medium text-gray-900">Products</label>
                    <select name="city" id="city" onChange={doUpdate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="" required>    
                        <option defaultValue={"Choose"}>Choose..</option>          {/*Here onChange={doUpdate} only value of selected city will get updated in obj state*/}
                        {city.map((str,index)=>{
                            return <option key={index} value={str}>{str}</option>
                        })}
                    </select>
              </div>
              <button type="button" onClick={doFindGrower} className="ml-[600px] mb-[30px] w-[150px] mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search&nbsp;Grower</button>
            </div> 
            : null }
            {/* ==============GROWERS AVAILABLE==================== */}
            <div className="flex flex-wrap">
              {showGrowerCards ? 
                result.map((obj,index)=>{               
                  return (
                    <div key={index} className="max-w-sm w-[350px] mb-10 h-[400px] ml-[100px] mt-10 border border-gray-200 rounded-lg shadow dark:bg-green-100 dark:border-gray-700"> 
                      <div className="p-2">
                          <center>
                            <p className="mb-6 mt-3 font-lg text-2xl font-serif text-black dark:text-black">Grower Details</p>
                          </center>
                          <p className="mb-3 text-base font-serif">Email : {obj.emailid}</p>
                          <p className="mb-3 text-base font-serif">Category : {obj.category}</p>
                          <p className="mb-3 text-base font-serif">Products Available : {obj.selproduct}</p>
                          <p className="mb-3 text-base font-serif">City : {obj.city}</p>
                          <p className="mb-3 text-base font-serif">Contact : {obj.contact}</p>
                          {/* <center><img src={prev} width="150" height="50" alt=""/></center> */}
                          <button type="button" className="w-[140px] mt-3 ml-[90px] px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Contact&nbsp;Grower
                          </button>
                      </div>
                    </div>
                  )})
              : null }
            </div>
          </div>
        </div>
        </>
    )
}
export default FindGrower;