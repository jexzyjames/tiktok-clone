import useAuthStore from "../store/Auth";
import { useEffect } from "react";
import { BiHome, BiDotsVertical, BiLogoTiktok, BiSearch, BiGroup, BiVideoRecording } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebaseConfig";

import {getRedirectResult} from 'firebase/auth'
// import '../index.css'
const Login = () => {
  const { user, googleSignIn, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  if (loading) return <div className=" flex justify-center items-center">Loading...</div>;

  return (
    <div className="flex flex-col w-full   ">
      {/* <h2 className="text-2xl text-sky-500 font-bold mb-4">Tiktok Clone</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">

        <h2 className="text-2xl font-bold mb-4">Login to Continue</h2>
        <button
          onClick={googleSignIn}
          className="  cursor-pointer bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div> */}

      <div className=" flex  py-2 items-center justify-between m-auto w-[100%]   gap-4  ">
        <div className="flex w-full m-auto  col-span-1 items-center justify-center">
          <BiLogoTiktok/>
        <span>Tiktok</span>
        </div>

        <div className="flex relative w-full m-auto col-span-2">
          <div className="bg-gray-200 search relative flex  items-center px-2 h-[30px]  rounded-xl w-[300px]">
           <input className='outline-none relative text-sm cursor-pointer ' type="search" placeHolder='Search accounts' />
           <BiSearch className='flex justify-flex-end  right-[-45%] z-3 absolute float-right items-flex-end w-full text-gray-500 '/>
          </div>
        </div>
        
        <div className="flex gap-3 m-auto w-full items-center justify-center col-span-2 max-h-[20px]">
        <div className="flex  items-center justify-center gap-1 ">
        <FaPlus/>
        <button
          onClick={googleSignIn}
          className="  cursor-pointer   text-black  w-[50px] h-[30px] text-sm rounded-lg hover:bg-blue-600"
        >
          Upload
        </button>
        </div>
        <button
          onClick={googleSignIn}
          className="  cursor-pointer  bg-red-500 text-white  w-[70px] h-[30px] text-sm rounded-lg hover:bg-blue-600"
        >
          Log in
        </button>
        <div className="flex">
          <BiDotsVertical/>
        </div>
        </div>
      </div>

      <div className="flex justify-center flex-col px-7 lg:px-45">
        <div className="flex gap-2 items-center">
          <BiHome />
          <p className='font-bold'>For You</p>
        </div>
        <div className="flex gap-2 items-center">
          <BiGroup/>
          <p className='font-bold'>Following</p>
        </div>
        <div className="flex gap-2 items-center">
          <BiVideoRecording/>
          <p className='font-bold'>Live</p>
        </div>

      </div>
    </div>
  );
};

export default Login;
