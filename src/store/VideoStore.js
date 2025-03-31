import { create } from "zustand";
import { db } from "../auth/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";

const useVideoStore = create((set, get) => ({
  videos: [],
  videoId: null,
  comments: {}, // Ensure comments is an object mapping videoId -> array
  loading: false,

  fetchVideos: () => {
    console.log("Fetching videos...");
    const q = query(collection(db, "videos"));
  
    return onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        console.warn("No videos found in Firestore!");
      }
  
      const videoList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log("Videos fetched:", videoList);
  
      set({ videos: videoList });
  
      // ✅ Auto-select the first video if no video is selected
      if (!get().videoId && videoList.length > 0) {
        set({ videoId: videoList[0].id });
        console.log("Auto-selected first video:", videoList[0].id);
      }
    }, (error) => {
      console.error("Error fetching videos:", error);
    });
  },

  // setSelectedVideo: (videoId) => set({ videoId }),

  fetchComments: async () => {
    const videoId = get().videoId;
    console.log("Fetching comments for video:", videoId); // Debug log
  
    if (!videoId) {
      console.error("fetchComments: No video selected (videoId is undefined)");
      return;
    }
  
    try {
      const commentsRef = collection(db, "videos", videoId, "comments");
      const q = query(commentsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
  
      const comments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log("Comments fetched:", comments);
      
      set((state) => ({
        comments: { ...state.comments, [videoId]: comments },
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  },

  addComment: async (text, user) => {
    const videoId = get().videoId;
    if (!videoId || !text.trim()) return;

    const newComment = {
      text,
      userId: user.uid,
      userName: user.displayName,
      userPhoto: user.photoURL,
      createdAt: serverTimestamp(),
    };

    try {
      const commentRef = await addDoc(collection(db, "videos", videoId, "comments"), newComment);
      set((state) => ({
        comments: {
          ...state.comments,
          [videoId]: [{ id: commentRef.id, ...newComment }, ...(state.comments[videoId] || [])],
        },
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  },

  deleteComment: async (commentId) => {
    const videoId = get().videoId;
    if (!videoId || !commentId) return;

    try {
      await deleteDoc(doc(db, "videos", videoId, "comments", commentId));
      set((state) => ({
        comments: {
          ...state.comments,
          [videoId]: state.comments[videoId].filter((comment) => comment.id !== commentId),
        },
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  },
}));

export default useVideoStore;
