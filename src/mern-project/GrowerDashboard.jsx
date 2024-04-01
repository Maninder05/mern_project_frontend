import React from "react";
import "../index.css";
import {useNavigate} from 'react-router-dom';

function GrowerDashboard(){

    let navigate=useNavigate();

    function OpenGrowerProfile(){
        navigate("/GrowerProfile")
    }
    function OpenAvailProducts(){
        navigate("/AvailProducts")
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
                          <a href="/GrowerDashboard" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Dashboard</a>
                        </li>
                        <li>
                          <a href="/GrowerProfile" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-700 dark:text-white dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Profile</a>
                        </li>
                        <li>
                          <a href="/AvailProducts" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Avail Products</a>
                        </li>
                        <li>
                          <a href="/ItemsManager" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Manage Products</a>
                        </li>
                      </ul>
                  </div>
                  <a href="/">
                      <button type="button" onClick={doLogout} className="w-[120px] h-[40px] mr-3 mb-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                  </a>
                </div>
            </nav>
            {/* <a href="/WebTokenTest">Verify Token</a> */}
            <center>
                <b className="text-3xl/[90px] font-serif">Grower DashBoard</b>
            </center>
           {/*=================CARDS===========================*/}
            <div class="grid gap-2 mb-3 md:grid-cols-2">
                <div className="max-w-sm h-[520px] ml-[180px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:border-gray-700">
                    <a href="#">
                        <img class="rounded-t-lg" className="w-[400px] h-[250px] border-2 border-gray-300" src="/pics/grower-profile.jpg" alt="" />
                    </a> 
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-3 text-2xl font-bold text-gray-900 dark:text-black">Create Your Profile Here!!</h5>
                        </a>
                        <p class="mb-4 font-normal text-gray-700 dark:text-gray-500">"Be the craftsmen of the highest order and a handy man with a humus."</p>
                        <button type="button" onClick={OpenGrowerProfile} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Create Profile
                        </button>
                    </div>
                </div>
                <div class="max-w-sm h-[520px] ml-[60px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="rounded-t-lg" src="/pics/avail-products.jpg" alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Avail Your Products!!</h5>
                        </a>
                        <p class="mb-4 font-normal text-gray-700 dark:text-gray-500">"Help reach organic products to customers and contribute most to real wealth and happiness."</p>
                        <button type="button" onClick={OpenAvailProducts} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Avail Products
                        </button>
                    </div>
                </div>
            </div>
            {/* <a href="/ItemsManager">Manage Your Products</a><br/> */}
          </div>
        </div>
        </>
    )
}
export default GrowerDashboard;