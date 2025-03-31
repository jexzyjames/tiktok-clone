import {useState, useRef} from 'react';
import useAuthStore from "../store/Auth";
import VideoUpload from "../components/VideoUpload";
import VideoFeed from "../components/VideoFeed";
import { useEffect } from "react";
import { BiHome, BiDotsVertical, BiLogoTiktok, BiSearch, BiGroup, BiVideoRecording, BiUser, BiDotsHorizontalRounded, BiArrowToBottom, BiArrowFromTop, BiArrowToTop } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useVideoStore from "../store/VideoStore";
import VideoPlayer from '../components/VideoPlayer';
import heal from '../assets/heal.mp4'

const Home = () => {
  const { user, logout,googleSignIn } = useAuthStore();
  const[modal,setModal] = useState(false)
  const{videos,fetchVideos} = useVideoStore()
  let video = videos;
  const navigate = useNavigate()
  const[index] = useState(0)
  useEffect(()=>{

  },[])
  return (
  <div className='video-feed'> 
  <video controls autoplay muted   src={heal}>
   </video>
   <video controls autoplay muted   src={heal}>
   </video>
  </div>
  );
};

export default Home;
