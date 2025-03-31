import React from 'react'
import { useNavigate } from 'react-router-dom'
import arrow from '../assets/Left arrow Icon.png'
import videoIcon from '../assets/Videcamera Stroke Icon.png'
import cameraIcon from '../assets/Camera Stroke Icon.png'
import copyIcon from '../assets/Clipboard Stroke Icon.png'
import userImg from '../assets/image.png'
const EditProfile = () => {
    const navigate = useNavigate()
  return (
    <div className='flex mx-auto max-w-[400px] shadow-md h-full  rounded-lg flex-col fadeIn  text-black '>

        <div className='flex w-full gap-30 p-4'>
            <img  onClick={()=> navigate('/profile')} className='cursor-pointer' src={arrow} alt="" />
             <h1 className='font-extrabold'> Edit profile</h1>
        </div>

        <div className='flex mt-3 justify-center relative gap-20 items-center'>
            <div className='flex flex-col items-center cursor-pointer bg-transparent relative'>
                <img className='w-17 h-17 rounded-full cursor-pointer' src={userImg} alt="" />
                <div className='absolute h-[70px]  w-[70px] flex justify-center cursor-pointer items-center rounded-full z-2 bg-stone-600  opacity-70  right-0 left-4 bottom-0 top-0'>

                <img className='cursor-pointer' src={cameraIcon} alt="" />
                </div>

            <p className='text-stone-500 font-semibold'>Change photo</p>
            </div>



             <div className="flex flex-col cursor-pointer items-center gap-2">

            <div className='bg-stone-200 cursor-pointer rounded-full p-5'>
                <img  className='cursor-pointer' src={videoIcon} alt="" />
            </div>
                <p className='text-stone-500 font-semibold'>Change video</p>
             </div>
        </div>


        <div className="flex mt-7 w-full p-3 justify-between items-center">
            <h2 className='font-semibold'>Name</h2>
            <p className='text-stone-400 '>Jacob West </p>
        </div>

        <div className="flex mt-4 w-full p-3 justify-between items-center">
            <h2 className='font-semibold'>Username</h2>
            <p className='text-stone-400 '>jacob-w </p>
        </div>

       <div className="flex mt-4  justify-end p-3 items-center gap-2">

        <p className='text-stone-400 cursor-pointer'>tiktok.com@jacob_w </p>
        <img className='cursor-pointer' src={copyIcon} alt="" />
       </div>

       <div className="flex mt-4 w-full p-3 justify-between items-center">
            <h2 className='font-semibold'>Bio</h2>
            <p className='text-stone-400 '>Add a bio to your profile </p>
        </div>

        
       <div className="flex mt-4 w-full p-3 justify-between items-center">
            <h2 className='font-semibold'>Instagaram</h2>
            <p className='text-stone-400 '>Add Instagram to your profile </p>
        </div>

        
       <div className="flex mt-4 mb-26 w-full p-3 justify-between items-center">
            <h2 className='font-semibold'>Youtube</h2>
            <p className='text-stone-400 '>Add Youtube to your profile </p>
        </div>

        


        



    </div>
  )
}

export default EditProfile