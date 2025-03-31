import React,{useEffect, useRef} from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import arrow from '../assets/Left arrow Icon.png'
import send from '../assets/Message Icon.png'
import plusIcon from '../assets/Plus Icon.png'
 
const Message = () => {
    const  navigate = useNavigate()
    
  return (
     <div className='flex flex-col sm:border-0 h-screen fadeIn shadow-md rounded-md  mx-auto items-center max-w-[400px]  text-black '>
    
            <div className='flex w-full   items-center  gap-25 p-4'>
                <img  onClick={()=> navigate('/profile')} className='cursor-pointer' src={arrow} alt="" />
                 <h1 className='font-extrabold w-full'> Direct messages</h1>
                 <img src={plusIcon} className='cursor-pointer' alt="" />
            </div>

            <div className="flex mt-40  items-center flex-col">
                <img src={send} alt="" />
                <h1 className='font-bold mt-4'>Message your friends</h1>
                <p className='text-stone-300 mt-1'>Share videos or start a conversation</p>
            </div>


    </div>
  )
}

export default Message