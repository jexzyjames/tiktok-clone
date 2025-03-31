import { useState } from "react";
import useAuthStore from "../store/Auth";
import useVideoStore from "../store/VideoStore";

const VideoUpload = () => {
  const { user } = useAuthStore();
  const { uploadVideo, loading } = useVideoStore();
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (file && user) {
      uploadVideo(file, user);
      setFile(null);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-2">Upload Video</h2>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 cursor-pointer px-4 py-2 rounded disabled:bg-gray-500"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default VideoUpload;
