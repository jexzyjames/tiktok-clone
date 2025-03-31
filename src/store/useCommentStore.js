import { create } from "zustand";
import { db } from "../auth/firebaseConfig";
import { collection, addDoc,getDocs, serverTimestamp, query, orderBy, onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";


const useCommentStore = create((set, get) => ({
  comments: {}, // Stores comments per video
  videos: [],
  selectedVideoId: null, // Initial state

  // Fetch all videos
  fetchVideos: () => {
    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      set({
         videos: snapshot.docs.map((doc) => ({ 

        id: doc.id, ...doc.data()
       }))
       });

      set({selectedVideoId: snapshot.id})
      console.log(snapshot.id, selectedVideoId)
    });
  },
  // Set selected video
  // setSelectedVideo: (videoId) => set({ selectedVideoId: videoId }),

  // Fetch Comments
  fetchComments: async () => {
    const videoId = get().selectedVideoId;
    if (!videoId) {
      console.error("fetchComments: selectedVideoId is undefined");
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

      set((state) => ({
        comments: { ...state.comments, [videoId]: comments },
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  },

  // Add Comment
  addComment: async (text, user) => {
    const videoId = get().selectedVideoId;
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

  // Delete Comment
  deleteComment: async (commentId) => {
    const videoId = get().selectedVideoId;
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
export default useCommentStore;
