import React,{useState,useEffect} from "react";
import "../index.css";
import {useNavigate} from 'react-router-dom';

function ConsumerDashboard(){

    let navigate=useNavigate();

    function OpenConsumerProfile(){
        navigate("/ConsumerProfile")
    }
    function OpenFindGrower(){
        navigate("/FindGrower")
    }
    function doLogout(){
        localStorage.removeItem("token");
    }
    return(
        <>
        <div className="container">
          <div className="row-md-12">
            <nav class="navbar mt-2 navbar-expand-sm navbar-dark">   
              <div class="w-[1400px] h-[90px] flex flex-wrap items-center bg-gray-200 justify-between mx-auto p-3"> 
                <a href="" class="flex items-center space-x-3 mb-3 rtl:space-x-reverse"> 
                    <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-black">G2C</span>
                </a> 
                <div className="ml-[420px]">
                    <ul class="flex flex-col font-medium p-2 md:p-0 md:space-x-10 rtl:space-x-reverse border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-500 dark:border-gray-700">
                      <li>
                        <a href="/ConsumerDashboard" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Dashboard</a>
                      </li>
                      <li>
                        <a href="/ConsumerProfile" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-700 dark:text-white dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Profile</a>
                      </li>
                      <li>
                        <a href="/FindGrower" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Find Grower</a>
                      </li>
                      <li>
                        <a href="/WebTokenTest" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Verify Token</a>
                      </li>
                    </ul>
                </div>
                <a href="/">
                    <button type="button" onClick={doLogout} className="w-[120px] h-[40px] mr-5 mb-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                </a>
              </div>
            </nav>
            <center>
                <b className="text-3xl/[90px] font-serif">Consumer DashBoard</b>
            </center>
            {/*=======================CARDS=====================================*/}
            <div class="grid gap-2 mb-3 md:grid-cols-2">
                <div className="max-w-sm h-[520px] ml-[180px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:border-gray-700">
                    <a href="#">
                        <img class="rounded-t-lg" className="w-[400px] h-[250px] border-2 border-gray-300" src="/pics/consumer-profile.avif" alt="" />
                    </a> 
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-3 text-2xl font-bold text-gray-900 dark:text-black">Create Your Profile Here!!</h5>
                        </a>
                        <p class="mb-4 font-normal text-gray-700 dark:text-gray-500">"Let's take the lead in saving the environment by buying organic foods."</p>
                        <button type="button" onClick={OpenConsumerProfile} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Create Profile
                        </button>
                    </div>
                </div>
                <div class="max-w-sm h-[520px] ml-[60px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="rounded-t-lg"className="w-[400px] h-[250px] border-2 border-gray-300"  src="/pics/organic-groceries.jpg" alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Buy Products Now!!</h5>
                        </a>
                        <p class="mb-4 font-normal text-gray-700 dark:text-gray-500">"Purchase best organic products and feel the esscence of real happiness and growth."</p>
                        <button type="button" onClick={OpenFindGrower} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Find Grower
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
        </>
    )
}
export default ConsumerDashboard;