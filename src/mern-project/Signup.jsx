import React,{useState} from "react";
import axios from "axios";
import "../index.css";      //FOR STYLING
import { doSignupMVC ,doLoginMVC } from "../services/users-controller";
import {useNavigate} from 'react-router-dom';

export default function Signup(){

  let navigate=useNavigate();
  const [obj,setObj]=useState({emailid:"", 
  pwd:"", 
  type:"" 
  });   
  const [showSignupModal, setShowSignupModal] =useState(false);
  const [showLoginModal, setShowLoginModal] =useState(false);   

  //=========Updating values of props in obj onChange event=================
  function doUpdate(event){
    var regex=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/ ;         //Regular expression to validate email
    var email=document.getElementById("emailid").value;
    if(regex.test(email)===true){
      var {name,value}=event.target
      setObj({...obj,[name]:value});
      document.getElementById("err").style.color = "green";
      document.getElementById("err").innerHTML ="Valid"; 
    }
    else{
      document.getElementById("err").style.color = "red";
      document.getElementById("err").innerHTML = "Invalid";
      setObj({...obj,"emailid":""})                                         
    }
  }
  //============POST JSON REQ(i.e. of Content-type-"application/json")========================
  async function doSignup()
  {
    //const url = "https://g2c-mern-project.onrender.com/user/do-signup"; 
    //const serverMsg= await axios.post(url,obj)

    const serverMsg= await doSignupMVC(obj);                            //MVC- Industry Style
    
    console.log(JSON.stringify(serverMsg));
    if(serverMsg.data.status===true)
      alert("Signup Successful!!");
    else    
      alert(serverMsg.data.msg+"  "+serverMsg.data.err);
  }
  //==============JSON Web Token Used Below================
  async function doLogin()
  {
    //const url = "http://localhost:2007/user/do-login" 
    //const serverMsg= await axios.post(url,obj);
    
    const serverMsg= await doLoginMVC(obj);
    console.log(JSON.stringify(serverMsg));
    
    if(serverMsg.data.msg==="User Exists"){

      localStorage.setItem("token",serverMsg.data.jtoken)          //val generated token(i.e. jtoken) will be stored in token var/key
      console.log(serverMsg.data.jtoken);

      if(serverMsg.data.retDoc.type==="Grower"){
        alert("Login Successful!!")
        setShowLoginModal(false);
        navigate("/GrowerDashBoard");
      }
      else{
        alert("Login Successful!!")
        setShowLoginModal(false);
        navigate("/ConsumerDashBoard");
      }
    }
    else    
      alert("Kindly Check ID/Password");
  }
  
  return(  
      <>  
        <div class="container">
          {/* ===============Navbar=========================== */}
          <nav class="navbar mt-2 navbar-expand-sm bg-blue navbar-dark">   
            <div class="w-[1400px] h-[90px] flex flex-wrap items-center bg-gray-200 justify-between mx-auto p-3"> 
              <a href="" class="flex items-center space-x-3 mb-3 rtl:space-x-reverse">
                  <img src="pics/farmer-pic.jpg" class="h-[60px] w-[70px]" alt="Agriculture Logo"/>  
                  <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-black">www.growertoconsumer.com</span>
              </a> 
              <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ml-[140px]"> 
                <ul class="flex flex-col font-medium p-2 md:p-0 md:space-x-10 rtl:space-x-reverse border border-gray-100 rounded-lg bg-gray-50  md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-500 dark:border-gray-700">
                  <li>
                    <a href="/" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                  </li>
                  <li>
                    <a href="#Services" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-700 dark:text-white dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                  </li>
                  <li>
                    <a href="#Developers" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Developers</a>
                  </li>
                  <li>
                    <a href="#Reach-Us" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                  </li>
                </ul>
              </div> 
            </div>
          </nav>
          <a href="#"> 
            <img src="/pics/wheat-bloom.webp" className="w-full h-[620px] border-2 border-gray-300" alt=""/>
            <div class="carousel-caption d-none d-md-block mb-3 flex md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse mr-3">
              <button type="button" onClick={() => setShowSignupModal(true)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[120px] px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signup</button>
              <button type="button" onClick={() => setShowLoginModal(true)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[100px] px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
              <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
              </button> 
            </div>
          </a> 
          <div class="col-md-12">
            <nav class="navbar navbar-expand-lg navbar-dark bg-gray-300"> 
              <div class="mx-auto">
                <div class="navbar-brand text-dark" id="Services">O U R&nbsp;&nbsp;&nbsp;&nbsp;S E R V I C E S</div>
              </div>
            </nav>
          </div> 
        </div>
        {/*======================OUR SERVICES===========================*/}
        <div class="container">
          <div class="row mt-2">
            <div class="col-md-3">
              <div className="w-[300px] h-[500px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:border-gray-700">
                <a href="#">
                    <img src="/pics/grower.jpeg" className="w-[400px] h-[250px] border-2 border-gray-300" alt="" />
                </a> 
                <div class="p-5">
                    <a href="#">
                        <h5 className="mb-3 text-2xl font-bold text-gray-900 dark:text-black">BEST GROWERS</h5>
                    </a>
                    <p className="mb-4 font-normal text-gray-700 dark:text-gray-500">"Set Profile at our platform and be the craftsmen of the highest order"</p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div className="w-[300px] h-[500px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:border-gray-700">
                <a href="#">
                    <img className="w-[400px] h-[250px] border-2 border-gray-300" src="/pics/organic-shop.jpg" alt="" />
                </a> 
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-3 text-2xl font-bold text-gray-900 dark:text-black">ORGANIC SHOP</h5>
                    </a>
                    <p class="mb-4 font-normal text-gray-700 dark:text-gray-500">"Platform providing organic products to customers and contributing most to real wealth."</p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div className="w-[300px] h-[500px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:border-gray-700">
                <a href="#">
                    <img src="/pics/consumer.webp" className="w-[400px] h-[250px] border-2 border-gray-300" alt="" />
                </a> 
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-3 text-2xl font-bold text-gray-900 dark:text-black">RELIABLE CONSUMERS</h5>
                    </a>
                    <p class="mb-4 font-normal text-gray-700 dark:text-gray-500">"Take the lead in saving the environment by buying organic foods."</p>
                </div>
              </div>
            </div> 
            <div class="col-md-3">
              <div className="w-[300px] h-[500px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:border-gray-700">
                <a href="#">
                    <img src="/pics/fix-deal.jpg" className="w-[400px] h-[250px] border-2 border-gray-300" alt="" />
                </a> 
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-3 text-2xl font-bold text-gray-900 dark:text-black">FIX THE DEAL</h5>
                    </a>
                    <p class="mb-4 font-normal text-gray-700 dark:text-gray-500">"Purchase best organic products and experience real happiness & growth."</p>
                </div>
              </div>
            </div>  
          </div>
        </div>
        {/*===================DEVELOPERS========================*/}
        <div className="container">
          <div className="row-md-12 mt-2">
            <nav className="navbar navbar-expand-lg navbar-dark bg-gray-300"> 
              <div className="mx-auto">
                <div className="navbar-brand text-dark" id="Developers">D E V E L O P E R S</div>
              </div>
            </nav>
            {/* ====================CARDS=========================== */}
            <div className="flex flex-wrap mt-2"> 
              <div class="col-md-6">
                <div className="w-[600px] h-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:border-gray-700">
                  <div className="flex flex-wrap">
                    <a href="#">
                        <img src="/pics/my-pic.jpg" className="w-[270px] h-[250px] mt-4 ml-2 rounded-full border-gray-300" alt="" />
                    </a> 
                    <div className="p-4 mt-3">
                      <h5>Name&nbsp;:&nbsp;Maninder Kaur</h5><br/>
                      <h5>Email&nbsp;:&nbsp;maninderkaur211205<br/>&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@gmail.com</h5><br/>
                      <h5>College&nbsp;:&nbsp;SAIT College</h5><br/>
                      <h5>Contact&nbsp;:&nbsp;88470-97570</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div className="h-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:border-gray-700">
                <div className="flex flex-wrap">
                  <a href="#">
                      <img src="/pics/Rajesh-sir.jpg" className="w-[270px] h-[250px] mt-4 ml-2 rounded-full border-gray-300" alt="" />
                  </a> 
                  <div class="p-4 mt-3">
                    <h5>Completed Under the able <br/>
                    guidance of Mr. Rajesh K. Bansal<br/>
                    (Author Of Real Java)</h5><br/>
                    <h5>Email&nbsp;:&nbsp;bcebti@gmail.com</h5><br/>
                    <h5>Website&nbsp;:&nbsp;realjavaonline.com</h5><br/>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*===================REACH US========================*/}
        <div className="container">
          <div className="row-md-12 mt-2">
            <nav className="navbar navbar-expand-lg navbar-dark bg-gray-300"> 
              <div className="mx-auto">
                <div className="navbar-brand text-dark" id="Reach-Us">R E A C H&nbsp;&nbsp;&nbsp;&nbsp;U S</div>
              </div>
            </nav>
            <div class="col-md-12 mt-2">
              <iframe className="w-[1295px] h-[350px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.8805715959834!2d74.94975317528181!3d30.21195591061514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391732a4f07278a9%3A0x4a0d6293513f98ce!2sBanglore%20Computer%20Education!5e0!3m2!1sen!2sin!4v1700889085303!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
        {/*===================COPYRIGHT========================*/}
        <div className="container">
          <div className="row-md-12 mt-2">
            <nav className="navbar navbar-expand-lg navbar-dark bg-gray-300"> 
              <div className="navbar-brand text-dark ml-3">C O P Y R I G H T </div>
            </nav>
          </div>
        </div>
        {/*==============SignUp Modal Toggle==========================*/}  
        {/*Main Modal*/}   
        {showSignupModal ? (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-4 w-full max-w-md max-h-full">
                {/*Modal Content*/}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/*Modal Header*/}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-serif text-gray-900 dark:text-dark">
                            Sign Up to our platform
                        </h3>
                        <button type="button" onClick={() => setShowSignupModal(false)} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-dark">
                            <span className="text-xl font-serif text-red-600 dark:text-dark">Close</span> 
                        </button> 
                    </div>
                    {/*Modal Body*/}
                    <div className="p-4 md:p-5">
                        <form action="#">
                            <div>
                                <label htmlFor="emailid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Your email</label>
                                <span className="text:indigo-600" id="err"/>
                                <input type="email" name="emailid" id="emailid" onChange={doUpdate} className="bg-gray-50 mb-2 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-500 dark:text-black" required/>
                            </div>
                            <div>
                                <label htmlFor="pwd" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Your password</label>
                                <input type="password" name="pwd" onChange={doUpdate} className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" required/>
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                 <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Category</label>
                                 <select name="type" onChange={doUpdate} class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                     <option selected="">Select category</option>
                                     <option value="Grower">Grower</option>
                                     <option value="Consumer">Consumer</option>
                                 </select>
                            </div>
                            {/*Modal Footer*/}
                            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="button" onClick={doSignup} className="ms-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signup</button>
                                <button  type="button" onClick={() => setShowSignupModal(false)} class="ms-3 text-gray-500 bg-blue-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-300 dark:text-gray-900 dark:border-red-500 dark:hover:text-dark dark:hover:bg-red-600 dark:focus:ring-gray-600">Decline</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div> ) 
        : null}  
        {/*====================LOGIN MODAL===========================*/}
        {showLoginModal ? (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-4 w-full max-w-md max-h-full">
                {/*Modal Content*/}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/*Modal Header*/}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-serif text-gray-900 dark:text-dark">
                            Login in to our platform
                        </h3>
                        <button type="button" onClick={() => setShowLoginModal(false)} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-dark">
                            <span className="text-xl font-serif text-red-600 dark:text-dark">Close</span> 
                        </button> 
                    </div>
                    {/*Modal Body*/}
                    <div className="p-4 md:p-5">
                        <form action="#">
                            <div>
                                <label htmlFor="emailid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Your email</label>
                                <span className="text:indigo-600" id="err"/>
                                <input type="email" name="emailid" id="emailid" onChange={doUpdate} className="bg-gray-50 mb-2 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-500 dark:text-black" required/>
                            </div>
                            <div>
                                <label htmlFor="pwd" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Your password</label>
                                <input type="password" name="pwd" onChange={doUpdate} className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" required/>
                            </div>
                            {/*Modal Footer*/}
                            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="button" onClick={doLogin} className="ms-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                                <button  type="button" onClick={() => setShowLoginModal(false)} class="ms-3 text-gray-500 bg-blue-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-300 dark:text-gray-900 dark:border-red-500 dark:hover:text-dark dark:hover:bg-red-600 dark:focus:ring-gray-600">Decline</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div> ) 
        : null}  
      </>
  ) 
}