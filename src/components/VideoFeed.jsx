import { useEffect, useState, useRef } from "react";
import useVideoStore from "../store/VideoStore";
import useAuthStore from "../store/Auth";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaHome, FaPlay, FaPlus, FaUpload, FaUser } from "react-icons/fa";
import { FaArrowsTurnRight, FaMessage } from "react-icons/fa6";
import { BiSave, BiSolidSave } from "react-icons/bi";

const VideoFeed = () => {
  const navigate = useNavigate(null);
  const [file, setFile] = useState(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);
  const { videos, fetchVideos, uploadVideo, loading, toggleLike, addComment } =
    useVideoStore();
  const { user } = useAuthStore();
  const [commentText, setCommentText] = useState("");
  const handleUpload = async () => {
    fileRef.current.click();

    if (file && user) {
      uploadVideo(file, user);
      console.log("filenname", file);
      setFile(null);
    }
  };
  useEffect(() => {
    const unsubscribe = fetchVideos();
    return () => unsubscribe();
  }, [fetchVideos]);
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top >= 0 && rect.top <= windowHeight / 2) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount to check initial visibility
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className=' mx-auto relative'>

        {videos.length === 0
          ? "No videos"
          : videos.map((video, index) => (      
                       
                    <div className=' mx-auto flex  justify-center items-center relative ' >
                        <div className="video-container">
            <video ref={videoRef} src={video.videoUrl} controls playsInline  muted    />
                        </div>

                    {/* icons for navigation */}
                    {user && 
                    
                  <div className="flex  w-full justify-center items-center gap-14 cursor-pointer bottom-10   absolute ">
                    <FaHome className=" hover:text-[#3aaf9f] text-white" />
                    <FaMessage className='hover:text-[#3aaf9f] text-white' />

                    <span>
                      <input
                        accept="video/*"
                        hidden
                        ref={fileRef}
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                      />
                      {!loading ? (
                        <FaPlus
                          onClick={handleUpload}
                          className="text-white hover:bg-[#3aaf9f]  bg-purple-500 rounded-full text-md p-1 "
                        />
                      ) : (
                        <FaUpload className="text-white bg-purple-500 rounded-full text-md p-1 " />
                      )}
                    </span>
                    <FaUser
                      onClick={() => navigate("/profile")}
                      className=" hover:text-[#3aaf9f] text-gray-200"
                    />
                </div>
                    }
               
                {/* icons for engagements */}

                <div className="z-9 justify-center items-center gap-5 h-full top-28  rounded-md p-1  flex flex-col  relative">
                  <div className="text-black text-center">
                    <button className='cursor-pointer bg-gray-200 p-2 rounded-full' onClick={() => toggleLike(video.id, user.uid)}>
                      <FaHeart className={` ${video.likes.length  ? 'text-black ' : ''} text-xl  p-1 text-black hover:text-[#3aaf9f]`} />
                    </button>
                    <span className='text-black font-bold'>{video.likes.length}</span>
                  </div>
                  <div className="text-black text-center">
                    <button className=' bg-gray-200 p-2 rounded-full cursor-pointer' onClick={() => toggleLike(video.id, user.uid)}>
                      <BiSolidSave className={` ${video.likes.length  ? 'text-black ' : ''}text-black text-xl hover:text-[#3aaf9f]`} />
                    {/* <span className='text-white'>{video.likes.length}</span> */}
                    </button>
                  </div>
                  <button className=' bg-gray-200 p-2 rounded-full'>

                  <FaMessage className={ `text-black font-bold text-2xl p-1 hover:text-[#3aaf9f]  cursor-pointer`} />
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(video.videoUrl);
                      alert("Video link copied to clipboard!");
                    }}
                    className=" bg-gray-200 p-2 rounded-full cursor-pointer"
                  >
                    <FaArrowsTurnRight className=" text-2xl hover:text-[#3aaf9f] p-1 cursor-pointer text-black" />
                  </button>
                  <div className='cursor-pointer bg-gray-200 p-1 rounded-full'>
                    <img className='   rounded-full w-10 h-10' src={user?.photoURL || <FaUser/>} alt="user" />
                  </div>
                </div>
                </div>






            ))}
    </div>
  );
};

export default VideoFeed;
