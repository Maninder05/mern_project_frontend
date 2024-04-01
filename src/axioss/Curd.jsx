import React,{useState} from "react";
import axios from "axios";      //Axios is a JS library used in ReactJS to make Ajax calls/requests to server to perform CRUD operations, axios allows us to send pic data too even when sending ajax call

function Curd(){
    console.log("Component Rendered");
    const [obj,setObj]=useState({
        uid:"",
        item:"",
        category:"",
        price:0,
        dop:"",
        pic:null,
    })
    const [prev,setPrev]=useState("");

    function doUpdate(event){
       var {name,value}=event.target;
       setObj({...obj,[name]:value});
    }
    function doUpdatePic(event)
    {
        //alert(JSON.stringify(event.target.files[0].size));
        setObj({ ...obj,["pic"]: event.target.files[0]});                  //files[0]: first selected file obj which contains all the info of pic like its name,type,size,etc..
    }
    //=====SENDING GET REQEST alongwith URL Query Parameters(key-value pairs attached to end of URL)============         //GET req doesn't have any Content-Type as its data is not sent within request body
    async function doSaveWithAxios(){
        // const objdata=JSON.stringify(obj);
        // alert(objdata); 
        
        const url = `http://localhost:2007/product/add-product?uid=${obj.uid}&item=${obj.item}&category=${obj.category}&price=${obj.price}&dop=${obj.dop}`;    
        
        const serverMsg= await axios.get(url);                             //Sending GET req(data alongwith URL) to backend & receiving JSON response from server in serverMsg 
        console.log(JSON.stringify(serverMsg));                            //chk in console on Inspect  
        if(serverMsg.data.status===true)
            alert("Saved Successfully!!");
        else    
            alert(serverMsg.data.msg+" "+serverMsg.data.err);

    }
    //=============SENDING POST JSON REQUEST=================
    async function doSaveWithAxiosPost()                                   //By default POST Ajax req sent using axios is of Content-Type-"application/json"
    {
        const url = "http://localhost:2007/product/add-product";
        
        const serverMsg= await axios.post(url,obj);                        //Sending POST request(url and json data in obj separately) to backend & receiving JSON response from server in serverMsg 
        if(serverMsg.data.status===true)                                   
            alert("Saved Successfully!!");
        else    
            alert(serverMsg.data.msg+"  "+serverMsg.data.err);
    }
    //===========SENDING POST FORM REQUEST =================
    async function doSaveWithAxiosPostWithPic()
    {
        const url = "http://localhost:2007/product/add-product";
        
        var formdata=new FormData();               //FormData is an inbuilt class used to send data along with uploaded file in formdata obj in form of key-value pairs
        for(var prop in obj)
        {
            formdata.append(prop,obj[prop]);       //formdata.append(name,value)

        }
        const serverMsg= await axios.post(url,formdata,{headers:{'Content-Type':'multipart-form-data'}});
        //alert(JSON.stringify(serverMsg));
        if(serverMsg.data.status===true)
            alert("Saved Successfully!!");
        else    
            alert(serverMsg.data.msg+"  "+serverMsg.data.err);
    }
    //============Sending Get Req====================
    async function doFetchProductWithAxios()
    {
      const url = `http://localhost:2007/product/one-product?uid=${obj.uid}`;               

      const serverMsg= await axios.get(url);
      console.log(JSON.stringify(serverMsg));
      
      if(serverMsg.data.length!==0){
   
        alert(JSON.stringify(serverMsg.data[0]))                                       
        setObj(serverMsg.data[0])                                                    
        setPrev("http://localhost:2007/uploads/"+serverMsg.data[0].ppic);
      }
      else
        alert("Invalid ID")
    }
    return(
        <>
        <center>
        <h2 className="mt-2">CURD App</h2>
            <form>
                <p>
                    Uid: <input type="text" value={obj.uid} name="uid" className='border border-black mt-2' onChange={doUpdate} />
                </p>
                <p>
                    Item: <input type="text" name="item" value={obj.item} className='border border-black mt-2' onChange={doUpdate} />
                </p>
                <p>
                    Category: <input type="text" name="category" value={obj.category} className='border border-black mt-2' onChange={doUpdate} />
                </p>
                <p>
                    Price: <input type="text" name="price" value={obj.price} className='border border-black mt-2' onChange={doUpdate} />
                </p>
                <p>
                    DOP: <input type="date" name="dop" value={obj.dop} className='border border-black mt-2' onChange={doUpdate} />
                </p>
                <p>
                    Profile Pic : <input type="file" name="pic" onChange={doUpdatePic} />
                    <img src={prev} alt="" id="prev" className="mt-[10px] w-[300px] h-[150px]"></img> 
                </p> 
                <p>
                    <input type="button" onClick={doSaveWithAxios} className='border border-black p-2 mt-2'  value="Do Save with Get"/><br/>
                    <input type="button" onClick={doSaveWithAxiosPostWithPic} className='border border-black p-2 mt-2'  value="Do Save with Post"/><br/>     
                    <input type="button" onClick={doFetchProductWithAxios} className='border border-black p-2 mt-2'  value="Do Fetch with Post"/>     
                </p>   
            </form>
            <p>
                Result
            </p>
            </center>
        </>
    )
}
export default Curd;

/*
//update profile route handler
exports.updateProfile = async (req, resp) => {

    //fetching the data from the request body
    const { firstname, lastname, contact, email, gender ,address, city, state } = req.body;

    //fetching the files from the req.files object
    const profilepic = req?.files?.profilepic;
    const idproof = req?.files?.idproof;
    let profilepicPath = "";
    let idproofPath = "";

    //checking if the profilepic is present
    if (profilepic) {

        profilepicPath = ${__dirname}/../uploads/profile/${email}-${profilepic.name};

        profilepic.mv(profilepicPath, (err) => {
            if (err) {
                console.log("Error uploading the profile pic ", err);
            }
        })

    }
    else{
        profilepicPath = req.body.hdn;
        console.log(profilepicPath);
    }

    //checking if the idproof is present
    if (idproof) {

        idproofPath = ${__dirname}/../uploads/proof/${email}-${idproof.name};

        idproof.mv(idproofPath, (err) => {
            if (err) {
                console.log("Error uploading the idproof ", err);
            }
        })

    }


    //updating the data in the database
    Profile.findOneAndUpdate({ email }, {
        firstname, lastname, contact, email, address, city, state, gender,
        profilepic: profilepicPath, idproof: idproofPath
    }, { new: true })
        .then((doc) => {
            return resp.status(200).json({
                success: true,
                message: "Profile updated successfully !!",
                profile: doc
            })
        }).catch((err) => {
            return resp.status(500).json({
                success: false,
                message: "Error updating the profile !!",
                error: err
            })
        })

}
//update form update handler
const formUpdateHandler = async (e) => {

    console.log(profileData.profilepic);
    //return;
   
    console.log(profileData);

    const formData = new FormData();
    for (let key in profileData) {
        formData.append(key, profileData[key]);
    }

    //sending the formData to the backend
    let url = "http://localhost:4000/api/v1/update-profile"

    const response = await axios.post(url, formData, { headers: { 'Content-Type': "multipart/form-data" } });

    const data = await response.data;

    if (data.success === true) {
        alert("Profile Updated Successfully");
    }
    else {
        alert("Something went wrong ", data.error);
    }
}
//fetching the profile data from the backend
const fetchProfileData = async () => {

    let url = "http://localhost:4000/api/v1/fetch-profile?email=" + profileData.email;

    const response = await axios.get(url);

    const data = await response.data;

    console.log(data);

    if (data.profile) {
        setProfileData(
            data.profile
        )

        if (data.profile.profilepic) {
            setProfilePrev("http://localhost:4000/");
        }

        if (data.profile.idproof) {
            setIdPrev(data.profile?.idproof.split("/").at(-1).split("-")[1]);
        }
        profileData.hdn=profileData.profilepic;
        profileData.profilepic=null;

    }

}
*/
