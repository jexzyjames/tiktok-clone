import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useProfileStore from "../store/profileStore";
import useAuthStore from "../store/Auth";
import { FaArrowLeft } from "react-icons/fa";
import userImg from "../assets/Me.png";
import addAccount from "../assets/Add Account Icon.png";
import favourites from "../assets/Bookmark Icon.png";
import tab from "../assets/Tab.png";
import home from "../assets/Home.png";
import profileImg from "../assets/Image.png";
import ellipses from "../assets/Menu Icon.png";
import search from "../assets/Discover.png";
import uploadBtn from "../assets/Button Shape.png";
import inbox from "../assets/Message Stroke Icon.png";
import msgStroke from "../assets/Heart Hide Stroke Icon.png";
const Profile = () => {
  const { user } = useAuthStore();
  const fileRef = useRef(null);
  const { userVideos, fetchUserVideos, loading } = useProfileStore();
  const navigate = useNavigate();
const location = useLocation()
    const iconRef = useRef(null)
    useEffect(()=>{
        if(location.pathname.includes('profile')){
          iconRef.current.classList.add('active');
          console.log(location) 

            
        }
    },[location])
  useEffect(() => {
    if (user) {
      fetchUserVideos(user.uid);
    }
  }, [user, fetchUserVideos]);

  if (!user) {
    return (
      <div className="text-center text-white p-6">
        <p>You need to be logged in to view your profile.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 rounded"
        >
          Go to Home
        </button>
      </div>
    );
  } 

  return (
    <div className="max-w-[400px] fadeIn w-full shadow-md h-screen md:shadow-md rounded-lg flex flex-col items-center  relative  py-2   mx-auto  text-black">
      <div className="flex w-full h-4 items-center  p-3 justify-between">
        <div>
          <img className="cursor-pointer" src={addAccount} alt="" />
        </div>
        <h1 className="text-black font-extrabold">Jacob West</h1>
        <div className="flex items-center justify-center  flex-col">
          <img
            className="cursor-pointer font-extrabold"
            src={ellipses}
            alt=""
          />
        </div>
      </div>

      <img
        className="rounded-full mb-3  mt-[30px] w-35 h-35 "
        src={profileImg}
      />
      <p className="font-semibold">@jacob_w</p>

      <div className="mt-5 flex justify-between gap-10  items-center">
        <div className="flex  items-center flex-col gap-1 ">
          <h1 className=" text-xl font-extrabold">14</h1>
          <p className="text-stone-400">Following</p>
        </div>

        <div className="flex  items-center flex-col gap-1 ">
          <h1 className=" text-xl font-extrabold">38</h1>
          <p className="text-stone-400">Followers</p>
        </div>

        <div className="flex  items-center flex-col gap-1 ">
          <h1 className=" text-xl font-extrabold">91</h1>
          <p className="text-stone-400">Likes</p>
        </div>
      </div>

      <div className="mt-4 flex cursor-pointer justify-center gap-2 items-center">
        <h1 onClick={()=> navigate('/edit')} className="font-extrabold border border-stone-300 text-center p-2 rounded-sm w-[200px]">
          Edit profile
        </h1>
        <div className="border border-stone-300 rounded-sm p-2 ">
          <img  className="font-extrabold  " src={favourites} alt="" />
        </div>
      </div>

      <p className="text-stone-400 mt-4">Tap to add bio</p>

      <div className="mt-8">
        <div className="flex justify-center gap-40 items--center w-full">
          <div>
            <img src={msgStroke} alt="" />
          </div>
          <div className="flex gap-2  flex-col items-center justify-center text-center">
            <img className="w-5 h-5" src={msgStroke} alt="" />
            <span className="border-b border-slate-900 relativve block h-1 w-13 bg-black rounded-sm"></span>
          </div>
        </div>
      </div>

      <div className=" bg-slate-900  w-full right-0 left-0 absolute bottom-0">
        <div className="flex p-4  justify-between w-full ">
          <div className="cursor-pointer">
            <img onClick={() => navigate("/")} src={home} />
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
            <img className="cursor-pointer" onClick={()=> navigate('/chat')} src={inbox} />
            <h6 className="text-gray-500 text-[10px]">Inbox</h6>
          </div>
          <div className="cursor-pointer">
            <img ref={iconRef} onClick={() => navigate("/profile")} src={userImg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
