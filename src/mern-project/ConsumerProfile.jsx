import React,{useState} from "react";
import {doSaveCPWithAxiosMVC,doUpdateCPWithAxiosMVC,doFetchCPWithAxiosMVC} from "../services/users-controller";
import "../index.css";

function ConsumerProfile(){
  
    const [obj,setObj]=useState({emailid:"", 
    name:"", 
    contact:"", 
    address:"", 
    city:"", 
    state:"",
    aadharNo:"",
    proofpic:null, 
    });
    const [prev,setPrev]=useState("");                                       

    //=========Updating values of props in obj onChange event=================
    function doUpdate(event){

      var regex=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/ ;         //Regular expression to validate email
      var email=document.getElementById("emailid").value;
      if(regex.test(email)===true){

        var {name,value,type,files}=event.target
        setObj({...obj,[name]:value});
  
        if(type==="file"){
           console.log(files[0]);
           setObj({ ...obj,[name]: files[0]});                                   
           setPrev(URL.createObjectURL(files[0]));                               //Prev will only be shown in case of valid emailid 
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
    //================Saving Profile========================
    async function doSaveWithAxios()
    { 
      var formdata=new FormData();               
      for(var prop in obj)
      {
        formdata.append(prop,obj[prop]);       
      }
      //MVC- Industry Style
      const serverMsg= await doSaveCPWithAxiosMVC(formdata,{headers:{'Content-Type':'multipart/form-data'}})
      alert(JSON.stringify(serverMsg));

      if(serverMsg.data.status===true)
        alert("Saved Successfully!!");
      else    
        alert(serverMsg.data.msg+"  "+serverMsg.data.err);
    }

    //===============Updating Profile=============================
    async function doUpdateWithAxios()
    {
      var formdata=new FormData();               
      for(var prop in obj)
      {
        formdata.append(prop,obj[prop]);       
      } 
      const serverMsg= await doUpdateCPWithAxiosMVC(formdata,{headers:{'Content-Type':'multipart/form-data'}})   
      //alert(JSON.stringify(serverMsg.data));

      if(serverMsg.data.msg==="Updated"){
        alert("Profile Updated Successfully!!");
      }
      else if(serverMsg.data.msg==="Invalid"){
        alert("Invalid Profile")
      }
      else    
        alert(serverMsg.data.msg+"  "+serverMsg.data.err);
    }

    //===============Fetching Data========================
    async function fetchProfileWithAxios()
    {
      const serverMsg= await doFetchCPWithAxiosMVC(obj.emailid);                          //obj.emailid is sent to doFetchConsumerProfileWithAxiosMVC
      console.log(JSON.stringify(serverMsg));
      
      if(serverMsg.data.result!=null){                                                    //if result is an obj use null otherwise use length if array

        alert(JSON.stringify(serverMsg.data.result));                                     
        setObj(serverMsg.data.result);                                                   
        setPrev(`http://localhost:2007/uploads/${serverMsg.data.result.proofpic}`);
      
      }
      else
        alert("Invalid ID");
    }
    return(
    <>  
        <div className="container">
          <div className="row-md-12">
            <center><p class="text-3xl/[70px] font-serif">Profile Form</p></center>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <p className="flex flex-wrap">
                    <label for="emailid" class="block mb-2 text-base font-serif font-medium text-gray-900">Email Address&nbsp;&nbsp;</label>
                    <span className="text:indigo-600" id="err"/>
                    </p>
                    <input type="email" id="emailid" name="emailid" onChange={doUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" required/>
                </div>
                <div>
                    <button type="button" onClick={fetchProfileWithAxios} className=" block mt-[33px] mt-5 ml-[23px] w-[100px] rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2  focus-visible:outline-indigo-600">
                        Search
                    </button> 
                </div>
                <div>
                    <label for="name" class="block mb-2 text-base font-serif font-medium text-gray-900">Name</label>
                    <input type="text" id="name" name="name" onChange={doUpdate} value={obj.name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="" required/>
                </div>  
                <div>
                    <label for="contact" class="block mb-2 text-base font-serif font-medium text-gray-900">Phone number</label>
                    <input type="tel" id="contact" name="contact" value={obj.contact} onChange={doUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="12345-67890" pattern="[0-9]{5}-[0-9]{5}" required/>
                </div>
                <div>
                    <label for="address" class="block mb-2 text-base font-serif font-medium text-gray-900">Address</label>
                    <input type="text" id="address" name="address" value={obj.address} onChange={doUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="Shop/Home" required/>
                </div> 
                <div>
                    <label for="city" class="block mb-2 text-base font-serif font-medium text-gray-900">City</label>
                    <input type="text" id="city" name="city" value={obj.city} onChange={doUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="" required/>
                </div> 
                <div>
                    <label for="state" class="block mb-2 text-base font-serif font-medium text-gray-900">State</label>
                    <select id="state" name="state" value={obj.state} onChange={doUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="" required>
                        <option defaultValue={"Choose..."}>Choose..</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                    </select>
                </div> 
                <div>
                    <label for="aadharNo" class="block mb-2 text-base font-serif font-medium text-gray-900">Aadhar Card Number</label>
                    <input type="text" id="aadharNo" name="aadharNo" value={obj.aadharNo} onChange={doUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="Must be of 12 digits" required/>
                </div>
            </div>
            <div class="mb-6">
                <label for="proofpic" class="block mb-2 text-base font-serif font-medium text-gray-900">ID Proof</label>
                <input type="file" id="proofpic" name="proofpic" onChange={doUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="john.doe@company.com" required/>
                <img src={prev} alt="" id="prev" className="mt-[10px] w-[300px] h-[150px]"></img>  
            </div> 
            <button type="button" onClick={doSaveWithAxios} class="text-white ml-[500px] mr-[20px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            <button type="button" onClick={doUpdateWithAxios} class="text-white mb-[30px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
          </div>
        </div>
     </>   
    )
}
export default ConsumerProfile;