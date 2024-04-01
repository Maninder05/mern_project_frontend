import React,{useState} from "react";
import axios from "axios";
import {baseURL} from "../services/axios-config";
import "../index.css";

function AvailProducts(){
  
    const [obj,setObj]=useState({emailid:"", 
    category:"", 
    product:"",
    selproduct:"",
    proofpic:null, 
    });
    const [prev,setPrev]=useState({proofpic:""});
    const [product,setProduct]=useState([]);
    const [selprod,setSelProd]=useState("");

    function doUpdate(event){
      var regex=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/ ;         
      var email=document.getElementById("emailid").value;
      if(regex.test(email)===true){

        var {name,value,type,files}=event.target;
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
        //===========Updating Pic Data=================
        if(type==="file"){
           console.log(files[0]);   
           setObj({...obj,[name]: files[0]});                                  
           setPrev({...prev,[name]:URL.createObjectURL(files[0])}); 
        }
        document.getElementById("err").style.color = "green";
        document.getElementById("err").innerHTML ="Valid"; 
      }
      else{
        document.getElementById("err").style.color = "red";
        document.getElementById("err").innerHTML = "Invalid";
        setObj({...obj,"emailid":""})                                         
      }
    }
    //============Updating Items TextBox=======================
    const doUpdate2=(event)=>{
      document.querySelector("#category").disabled=true;
      //alert(event.target.value);
      //console.log(selprod);
      let x= selprod+event.target.value+",";           //selected products of specific category will keep updating in selprod state and we'll append them to x var as const doesn't accept re-assignment
      setSelProd(x);
      setObj({...obj,"selproduct":x})
    }
    //================Avail Product=================================
    async function doSaveProduct()
    {
      const url = `${baseURL}/grower/save-product`; 

      var formdata=new FormData();               
      for(var prop in obj)
      {
        alert(obj[prop]);
        formdata.append(prop,obj[prop]);       
      }
      const serverMsg= await axios.post(url,formdata,{headers:{'Content-Type':'multipart/form-data'}});
      //alert(JSON.stringify(serverMsg));

      if(serverMsg.data.status===true){
        alert("Saved Successfully!!");
      }
      else    
        alert(serverMsg.data.msg+"  "+serverMsg.data.err);
    }

    return(
        <>
        <div className="container">
          <div className="row-md-12">
            <center><p className="text-3xl/[70px] font-serif">Avail Products Here</p></center>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
              <div>
                  <p className="flex flex-wrap">
                  <label htmlFor="emailid" className="block mb-2 text-base font-serif font-medium text-gray-900">Email Address&nbsp;&nbsp;</label>
                  <span className="text:indigo-600" id="err"/>
                  </p>
                  <input type="email" id="emailid" name="emailid" onChange={doUpdate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" required/>
              </div>
              <div>
                  <label htmlFor="category" className="block mb-2 text-base font-serif font-medium text-gray-900">Product Category</label>
                  <select id="category" name="category" onChange={doUpdate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="" required>
                    <option defaultValue={"Choose..."}>Choose..</option>
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
                      <option defaultValue={"Choose"}>Choose..</option>
                      {product.map((str,index)=>{
                          return <option key={index} value={str}>{str}</option>
                      })}
                  </select>
              </div>
              <div>
                  <label htmlFor="selproduct" className="block mb-2 text-base font-serif font-medium text-gray-900">Selected Products</label>
                  <input type="text" id="selproduct" name="selproduct" value={selprod} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="" required/>
              </div> 
            </div>
            <div className="mb-6">
                <label htmlFor="proofpic" className="block mb-2 text-base font-serif font-medium text-gray-900">Product Pic</label>
                <input type="file" id="proofpic" name="proofpic" onChange={doUpdate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500"  required/>
                <img src={prev.proofpic} alt="" className="mt-[10px] w-[300px] h-[150px]"></img>  
            </div>  
            <button type="button" onClick={doSaveProduct} className="ml-[600px] mb-[30px] w-[150px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publish</button>
          </div>
        </div>
        </>
    )
}
export default AvailProducts;