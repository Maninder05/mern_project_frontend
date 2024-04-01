import React,{useState} from "react";
import axios from "axios";
import "../index.css";

function Profile(){
    const [obj,setObj]=useState({emailid:"", 
    name:"", 
    contact:"", 
    address:"", 
    city:"", 
    state:"", 
    ppic:null, 
    hdn:"",
    message:""
    });
    const [prev,setPrev]=useState("");   
    //const [prev,setPrev]=useState({ppic:"",ppic2:""})                                      

    //=========Updating values of props in obj onChange event=================
    function doUpdate(event){

      var regex=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/ ;         //Regular expression to validate email
      var email=document.getElementById("emailid").value;
      if(regex.test(email)===true){

        var {name,value,type,files}=event.target
        setObj({...obj,[name]:value});
  
        if(type==="file"){
        console.log(files[0]);
        setObj({ ...obj,[name]: files[0]});                                   //files[0] is the first selected file obj containing all the info of a pic
  
        setPrev(URL.createObjectURL(files[0]));                               //Prev will only be shown in case of valid emailid
        //setPrev({...prev,[name]:URL.createObjectURL(files[0])});
      }
        document.getElementById("err").style.color = "green";
        document.getElementById("err").innerHTML ="Valid"; 
      }
      else{
        document.getElementById("err").style.color = "red";
        document.getElementById("err").innerHTML = "Invalid";
        setObj({...obj,"emailid":""})                                         //Must be set empty else previous state of obj will be initialised and saved when emailid was valid 
      }
    }

    //=============Sending Data to the Server(ControllerProfile.js)========================
    async function doSaveWithAxios()
    {
      const url = "http://localhost:2007/profile/add-profile"; 

      var formdata=new FormData();               
      for(var prop in obj)
      {
          //alert(obj[prop]);
          formdata.append(prop,obj[prop]);       
      }
      const serverMsg= await axios.post(url,formdata,{headers:{'Content-Type':'multipart/form-data'}});
      //alert(JSON.stringify(serverMsg));

      if(serverMsg.data.status===true)
        alert("Saved Successfully!!");
      else    
          alert(serverMsg.data.msg+"  "+serverMsg.data.err);
    }

    //===============Updating Profile=============================
    async function doUpdateWithAxios()
    {
      const url = "http://localhost:2007/profile/update-profile"; 

      var formdata=new FormData();               
      for(var prop in obj)
      {
          alert(prop+" "+obj[prop]);
          formdata.append(prop,obj[prop]);       
      }    
      const serverMsg= await axios.post(url,formdata,{headers:{'Content-Type':'multipart/form-data'}});
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

    //===============Fetching Data from the Server/Backend and Displaying it====================
    async function fetchProfileWithAxios()
    {
      const url = `http://localhost:2007/profile/one-profile?emailid=${obj.emailid}`;               

      const serverMsg= await axios.get(url);
      console.log(JSON.stringify(serverMsg));
      
      if(serverMsg.data.result.length!==0){
   
        alert(JSON.stringify(serverMsg.data.result[0]))                                     //serverMsg.data.result[0] will give the first obj from result array..chk in console 
        //alert(serverMsg.data.result[0].proofpic)
    
        setObj(serverMsg.data.result[0])                                                    //object fetched from db(having diff props) will be stored in obj state in place of our existing obj
        setPrev("http://localhost:2007/uploads/"+serverMsg.data.result[0].proofpic);
        //setPrev(`http://localhost:2007/uploads/${serverMsg.data.result[0].proofpic}`);

        //OR-- In case we wish to assign vals of obj received from db to props of our existing obj 
        //var {name,contact,address,city,state,proofpic,message}=serverMsg.data.result[0]                    //Destructured into props
        //setObj({...obj,"name":name,"contact":contact,"address":address,"city":city,"state":state,"hdn":proofpic,"message":message})
        //setPrev("http://localhost:2007/uploads/"+proofpic);

      }
      else
        alert("Invalid ID")
    }
    return(
        <div className="isolate bg-white px-6 py-4 sm:py-32 lg:px-8">
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}/>
            </div> 
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create Profile</h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Bring Your Presentation To Life..
              </p>
            </div>
            <form action="#" className="mx-auto mt-5 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
                    <div>   
                        <input type="hidden" id="hdn" name="hdn"/>  
                        <label htmlFor="emailid" className="text-sm font-semibold leading-6 text-gray-900">Email&nbsp;&nbsp;</label>
                        <span className="text:indigo-600" id="err"/>
                        <div className="mt-2.5 flex flex-wrap"> 
                          <input
                            type="email"
                            name="emailid"
                            id="emailid"
                            autoComplete="email"
                            onChange={doUpdate}
                            className="block w-[420px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />              
                          <button type="button" onClick={fetchProfileWithAxios} className=" block ml-[23px] w-[100px] rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2  focus-visible:outline-indigo-600">
                            Search
                          </button> 
                        </div>                                                                                                  
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Name</label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={obj.name}
                            autoComplete="given-name"
                            onChange={doUpdate}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="contact" className="block text-sm font-semibold leading-6 text-gray-900">Phone number</label>
                        <div className="relative mt-2.5">
                          <input type="tel"
                            name="contact"
                            id="contact"
                            value={obj.contact}
                            autoComplete="tel" 
                            onChange={doUpdate}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-900">Address</label>
                        <div className="relative mt-2.5">
                          <input type="text"
                            name="address"
                            id="address"
                            value={obj.address}
                            autoComplete="address"
                            onChange={doUpdate}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="city" className="block text-sm font-semibold leading-6 text-gray-900">City</label>
                        <div className="relative mt-2.5">
                          <input type="text"
                            name="city"
                            id="city"
                            value={obj.city}
                            autoComplete="city"
                            onChange={doUpdate}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="state" className="block text-sm font-semibold leading-6 text-gray-900">State</label>
                      <div className="mt-2.5">
                        <select id="state" name="state" value={obj.state} onChange={doUpdate} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="ppic" className="block text-sm font-semibold leading-6 text-gray-900">Proof Pic</label>
                      <div className="relative mt-2.5">
                        <input type="file"
                          name="ppic"
                          id="ppic"
                          //value={obj.ppic}
                          autoComplete="ppic"
                          onChange={doUpdate}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <img src={prev} alt="" id="prev" className="mt-[10px] w-[300px] h-[150px]"></img>   
                        {/* <img src={prev.ppic} alt="" className="mt-[10px] w-[300px] h-[150px]"></img>   If prev were an object like used in case of multiple imgs*/} 
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                          Message
                        </label>
                        <div className="mt-2.5">
                          <textarea
                            name="message"
                            id="message"
                            value={obj.message}
                            rows={4}
                            onChange={doUpdate}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                    </div>
                </div>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2">
                  <button type="button" onClick={doSaveWithAxios} className="block w-[150px] ml-[120px] rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2  focus-visible:outline-indigo-600">
                    Submit
                  </button>
                  <button type="button" onClick={doUpdateWithAxios} className="block w-[150px] rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2  ">
                    Update
                  </button>
                </div>
            </form>
        </div>
    )
}
export default Profile;