import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import './App.css' 
import VideoUpload from "./components/VideoUpload";
import Profile from "./pages/Profile";
import VideoPlayer from "./components/VideoPlayer";
import EditProfile from "./pages/EditProfile";
import Message from "./pages/Message";
import VideoFeed from "./components/VideoFeed";
function App() {
  return (
   
  <Router>
 <Routes>
  <Route path='/login' element={<Login/>} />
  <Route path='/profile' element={<Profile/>} />
  <Route path='/edit' element={<EditProfile/>} />
  <Route path='/chat' element={<Message/>} />

  <Route index path='/' element={<VideoPlayer/>} />
   </Routes>
  </Router>

  );
}

export default App;
