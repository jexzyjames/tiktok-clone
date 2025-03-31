import { useRef, useState, useEffect } from "react";
import vid from "../assets/heal.mp4";
import { BiHeart, BiSolidHeart, BiPause, BiPlay } from "react-icons/bi";
import useAuthStore from "../store/Auth";
import useVideoStore from "../store/VideoStore";
import { useNavigate } from "react-router-dom";
import { FaArrowsTurnRight, FaMessage } from "react-icons/fa6";
import { BiSave, BiSolidSave } from "react-icons/bi";
import heart from "../assets/Union.svg";
import smallheart from "../assets/Broken Heart Icon.png";
import comments from "../assets/comments.png";
import whatsapp from "../assets/Whatsapp.png";
import Instagram from "../assets/Instagram Logo.png";
import WStatus from "../assets/Whatsapp Status.png";
import sms from "../assets/SMS Logo.png";
import message from "../assets/Message (1).png";
import messenger from "../assets/Messenger.png";
import report from "../assets/Report.png";
import download from "../assets/Download Icon.png";
import favourites from "../assets/Bookmark Icon.png";
import duet from "../assets/Duet Icon.png";
import react from "../assets/React Icon.png";
import smiley from "../assets/Emoji Stroke Icon.png";
import at from "../assets/Ad Sign Stroke Icon.png";
import share from "../assets/Share Icon.png";
import home from "../assets/Home.png";
import userImg from "../assets/Image.png";
import search from "../assets/Discover.png";
import uploadBtn from "../assets/Button Shape.png";
import inbox from "../assets/Message Stroke Icon.png";
import profileImg from "../assets/Me.png";
import useCommentStore from "../store/useCommentStore";
import {shallow} from 'zustand/shallow'
const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const fileRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  // const comments = useVideoStore((state) => state.comments[state.videoId] || []);
  // const { comments, videoId } = useVideoStore(
  //   (state) => ({ comments: state.comments[state.videoId] || [], videoId: state.videoId }),
  //   shallow
  // );
  const [text, setText] = useState('')
  const { videos,videoId, fetchComments, deleteComment, addComment, fetchVideos, uploadVideo, loading, toggleLike } =
    useVideoStore();
    // const{addComment, fetchComments,comments,replies, fetchReplies,fetchVideos, videos, addReply, deleteReply} = useCommentStore()
  const { user } = useAuthStore();
  const navigate = useNavigate();
  // const videoId= videoRef?.current?.id;
  useEffect(() => {
    if (videoId) {
      fetchComments();
      console.log("VideoPlayer: No videoId.". videoId);

    } else {
      console.warn("VideoPlayer: No videoId selected, skipping fetchComments.");
    }
  }, [videoId]);
  useEffect(() => {
    const updateProgress = () => {
      const Video = videoRef.current;
      if (Video) {
        const percent = (Video.currentTime / Video.duration) * 100;
        setProgress(percent);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [isPlaying, setIsPlaying]);
  
  const togglePlay = () => {
    if (videoRef?.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      
    } else {
      videoRef?.current?.pause();
      setIsPlaying(false);
    }
  };
  useEffect(()=>{
        

    togglePlay();
    fetchVideos()
  },[])
  
 
  const handleAddComment = () => {
    setCommentOpen(true);
    if (text.trim()) {
      addComment(videoId, user, text);
      setText("");
    }
  };
  const handleSeek = (e) => {
    const bar = e.currentTarget;
    const newTime =
      (e.nativeEvent.offsetX / bar.offsetWidth) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  const handleForward = () => {
    videoRef.current.currentTime += 5;
  };
  const handleBackward = () => {
    videoRef.current.currentTime -= 5;
  };
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top >= 0 && rect.top <= windowHeight / 2 ) {
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
    <div className="flex scroll  gap-3   lg:max-w-[400px] max-w-[400px] mx-auto  fadeIn flex-col h-screen  ">
     
     {videos?.map((video, index)=>{
      return (

        <div key={index} className=" h-[100vh] video-container  w-full relative">
          <video
            onDoubleClick={handleForward}
            key={video.id}
            onClick={() => {
              togglePlay();
              setShareOpen(false);
            }}
            ref={videoRef}
            src={video.videoUrl}
            className="video relative"
            playsInline
            autoPlay
          />
  
          {isPlaying ? (
            <button
              onDoubleClick={handleForward}
              onClick={togglePlay}
              className=" w-18 h-18 flex items-center justify-center  cursor-pointer rounded-full p-2 absolute top-55 items-center left-40"
            >
              <BiPause className="text-white z-2 text-7xl" />
            </button>
          ) : (
            <button
              onDoubleClick={handleForward}
              onClick={togglePlay}
              className=" w-18 h-18 flex items-center justify-center  cursor-pointer rounded-full p-2 absolute top-55 items-center left-40"
            >
              <BiPlay className="text-white z-2 text-7xl" />
            </button>
          )}
  
          <div className="progress-bar" onClick={handleSeek}>
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
  
          {/* icons for engagements */}
          <div className="  gap-2 h-full justify-center  rounded-md p-1   flex flex-col z-44 top-4 absolute right-[10px]">
            <div className="flex items-center justify-center">
              <img
                className="w-10 h-10  cursor-pointer rounded-full flex items-center justify-center"
                src={userImg}
                alt=""
              />
            </div>
            <div className="text-black text-center">
              <button
                className="cursor-pointer  p-2 "
                onClick={(e) => {
  
                }}
              >
                <BiSolidHeart size={40} className='text-white'  onClick={(e) => { 
                  e.currentTarget.style.color = 'red'}}  />
              </button>
              {/* <span className='text-black font-bold'>{video?.likes?.length}</span> */}
            </div>
            <div className="text-black text-center">
              <button
                onClick={() => setCommentOpen(!commentOpen)}
                className=" relative p-2  cursor-pointer"
              >
                <img
                  src={comments}
                  className={`text-black text-xl hover:text-[#3aaf9f]`}
                />
                {/* <span className='text-white'>{video.likes.length}</span> */}
              </button>
            </div>
            <button className=" flex flex-col text-white items-center justify-center cursor-pointer">
              <img
                onClick={() => {
                  setShareOpen(!shareOpen);
                }}
                src={share}
              />
              <h1>share</h1>
            </button>
            <div className="flex items-center justify-center">
              <img
                className="w-10 h-10  cursor-pointer rounded-full flex items-center justify-center"
                src={userImg}
                onClick={() => navigate("/profile")}
                alt=""
              />
            </div>
          </div>
          <style jsx>{`
            .play-btn,
            .forward-btn {
              position: absolute;
              bottom: 20px;
              background: rgba(255, 255, 255, 0.7);
              border: none;
              padding: 8px 16px;
              cursor: pointer;
              font-size: 14px;
              border-radius: 5px;
              left: 50%;
              transform: translateX(-50%);
            }
            .forward-btn {
              left: auto;
              right: 10px;
              transform: none;
            }
            .progress-bar {
              position: absolute;
              bottom: 1px;
              left: 4px;
              width: 99%;
              margin: 0 !important;
              z-index: 23;
              padding: 0 !important;
              height: 5px;
              background: rgba(255, 255, 255, 0.3);
              border-radius: 15px;
              cursor: pointer;
            }
            .progress {
              width: 0;
              height: 100%;
              box-sizing: border-box;
              position: absolute;
              left: 1px;
              background: red;
              border-radius: 0 10px 0 10px;
            }
          `}</style>
  
          {/* icons-tools  */}
          <div className=" rounded-lg bg-slate-950 text-white w-full right-0 left-0 absolute bottom-1">
            <div className="flex p-4  justify-between w-full ">
              <div className="cursor-pointer">
                <img src={home} />
              </div>
              <div className="cursor-pointer">
                <img src={search} />
              </div>
              <div className="cursor-pointer">
                <img
                  onClick={() => {
                    fileRef.current.click();
                  }}
                  src={uploadBtn}
                />
                <input ref={fileRef} type="file" hidden />
              </div>
              <div className="cursor-pointer flex flex-col items-center">
                <img
                  className="cursor-pointer"
                  onClick={() => navigate("/chat")}
                  src={inbox}
                />
  
                <h6 className="text-gray-500 text-[10px]">Inbox</h6>
              </div>
              <div className="cursor-pointer">
                <img onClick={() => navigate("/profile")} src={profileImg} />
              </div>
            </div>
          </div>
  
          {/* comment section */}
          {commentOpen && (
             
                <div className="absolute fadeIn w-full rounded-xl z-55  bottom-0 flex flex-col justify-self-end h-[70%]  right-0 bg-[#f5f5f4] p-2  left-0">
                  <h1 className="text-center font-extrabold mt-1 text-sm ">
                    1 comments
                  </h1>
                  <button
                    onClick={() => setCommentOpen(false)}
                    className="absolute cursor-pointer top-2 text-black font-extrabold right-4"
                  >
                    X
                  </button>
      
                  {/* comments viewer section  */}
                  <div className="flex gap-2 relative py-4 px-3 items-center">
                    <div clasName="w-full flex">
                      <img
                        className="w-10 h-10  cursor-pointer rounded-full flex items-center justify-center"
                        src={userImg}
                        alt=""
                      />
                    </div>
      
                    <div className="  flex flex-col">
                      <p className="text-gray-400">Lorem ipsum </p>
                      <h1 className="text-[14px]">
                        {" "}
                        Lorem ipsum metalodor tectamipoiusis{" "}
                        {/* {comment.title} */}
                        <span className="text-slate-500"> 1h</span>{" "}
                      </h1>
                    </div>
      
                    <div className="flex flex-col justify-end items-end absolute right-0 items-center ">
                      <img className="w-7 bg-transparent bg-slate-950" src={heart} />
                      <span className="text-gray-400"> 800</span>
                    </div>
                  </div>
      
                  <div className="flex gap-2 relative py-4 px-3 items-center">
                    <div clasName="w-full flex">
                      <img
                        className="w-10 h-10  cursor-pointer rounded-full flex items-center justify-center"
                        src={userImg}
                        alt=""
                      />
                    </div>
      
                    <div className="  flex flex-col">
                      <p className="text-gray-400">Lorem ipsum </p>
                      <h1 className="text-[14px]">
                        {" "}
                        Lorem ipsum metalodor tectamipoiusis{" "}
                        <span className="text-slate-500"> 1h</span>{" "}
                      </h1>
                    </div>
      
                    <div className="flex flex-col justify-end items-end absolute right-0 items-center ">
                      <img className="w-7 bg-transparent bg-slate-950" src={heart} />
                      <span className="text-gray-400"> 800</span>
                    </div>
                  </div>
      
                  {/* add new comments section */}
                  <div className="absolute w-full right-0 left-0 bottom-0 bg-white p-4 ">
                    <div className="flex items-center justify-between p-2 w-full">
                      <input
                        className="outline-none border-none "
                        type="text"
                        onChange={(e) => setText(e.target.value)}
                        // onKeyDown={handleAddComment}
                        placeHolder="Add comment..."
                      />
      
                      <div className="flex gap-5 justify-end items-center">
                        <img onClick={handleAddComment} className="cursor-pointer" src={at} />
                        <img className="cursor-pointer" src={smiley} />
                      </div>
                    </div>
                  </div>
                </div>
            
              )}
          {/* comment section-end */}
          {/* <div>
    {comments?.length === 0 ? (
      <p>No comments yet.</p>
    ) : (
      (comments?.[videoId] ?? []).map((comment) => (
        <div key={comment.id}>
          <p><strong>{comment.userName}:</strong> {comment.text}</p>
        </div>
      ))
    )}
  </div> */}
          {/* comment section-end */}

              
              
            


  
          {/* share section */}
          {shareOpen && (
            <div className="absolute fadeIn text-black w-full rounded-lg z-55  flex flex-col justify-end justify-self-end bottom-0  right-0 bg-[#f5f5f4] p-2  left-0">
              <h1 className="text-center flex justify-center items-center font-extrabold mt-1 text-sm ">
                Share to
              </h1>
  
              {/* share section-top */}
              <div className="mt-4 flex w-full justify-between">
                <div clasName="flex flex-col ">
                  <img className="cursor-pointer" src={whatsapp} />
                </div>
  
                <div clasName="flex flex-col ">
                  <img className="cursor-pointer" src={WStatus} />
                </div>
  
                <div clasName="flex flex-col ">
                  <img className="cursor-pointer" src={message} />
                </div>
  
                <div clasName="flex flex-col ">
                  <img className="cursor-pointer" src={messenger} />
                </div>
  
                <div clasName="flex gap-4 flex-col ">
                  <img className="cursor-pointer" src={sms} />
                  <p className="text-stone-400 mt-2 text-center font-bold text-[10px]">
                    SMS
                  </p>
                </div>
  
                <div clasName="flex flex-col cursor-pointer  ">
                  <img className="cursor-pointer" src={Instagram} />
                  <p className="text-[10px] mt-2 font-bold text-center text-gray-400">
                    Instagram
                  </p>
                </div>
              </div>
  
              {/* share section-bottom */}
              <div className="flex mt-10 mb-12  w-full justify-between">
                <div clasName="flex flex-col ">
                  <img src={report} />
                </div>
  
                <div className="flex flex-col gap-2 ">
                  <div className="bg-stone-200 p-2 flex items-center justify-center w-12 h-12 rounded-full ">
                    <img className=" cursor-pointer " src={smallheart} />
                  </div>
                  <p className="text-[10px] text-center font-bold text-gray-500">
                    Not <br /> interested
                  </p>
                </div>
  
                <div className="flex flex-col gap-2 ">
                  <div className="bg-stone-200 p-2 flex items-center justify-center w-12 h-12 rounded-full ">
                    <img className=" cursor-pointer " src={download} />
                  </div>
                  <p className="text-[10px] text-center font-bold text-gray-500">
                    Save to video
                  </p>
                </div>
  
                <div className="flex flex-col gap-2 ">
                  <div className="bg-stone-200 p-2 flex items-center justify-center w-12 h-12 rounded-full ">
                    <img className=" cursor-pointer " src={duet} />
                  </div>
                  <p className="text-[10px] text-center font-bold text-gray-500">
                    Duet
                  </p>
                </div>
  
                <div className="flex flex-col gap-2 ">
                  <div className="bg-stone-200 p-2 flex items-center justify-center w-12 h-12 rounded-full ">
                    <img className=" cursor-pointer " src={react} />
                  </div>
                  <p className="text-[10px] font-bold text-gray-500">React</p>
                </div>
  
                <div className="flex flex-col gap-2 ">
                  <div className="bg-stone-200 p-2 flex items-center justify-center w-12 h-12 rounded-full ">
                    <img className=" cursor-pointer " src={favourites} />
                  </div>
                  <p className="text-[10px] font-bold text-center text-gray-500">
                    Add to <br /> Favourites{" "}
                  </p>
                </div>
              </div>
  
              <div
                onClick={() => {
                  setShareOpen(false);
                }}
                className="absolute bottom-0 cursor-pointer flex items-center justify-center w-full right-0 left-0 bg-white p-4"
              >
                <p
                  className="cursor-pointer font-extrabold"
                  onClick={() => {
                    setShareOpen(false);
                  }}
                >
                  Cancel
                </p>
              </div>
            </div>
          )}
        </div>
      )
     })}

   



    


     
    </div>
  );
};

export default VideoPlayer;
