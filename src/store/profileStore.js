import { create } from "zustand";
import { db } from "../auth/firebaseConfig";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const useProfileStore = create((set) => ({
  userVideos: [],
  loading: false,

  fetchUserVideos: async (userId) => {
    set({ loading: true });
    try {
      const q = query(collection(db, "videos"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const videos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      set({ userVideos: videos, loading: false });
    } catch (error) {
      console.error("Error fetching user videos:", error);
      set({ loading: false });
    }
  },

  updateProfile: async (userId, newDetails) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, newDetails);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  },
}));

export default useProfileStore;
