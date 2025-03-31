import { create } from "zustand"; 
import { auth } from "../auth/firebaseConfig";
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import {getRedirectResult} from 'firebase/auth'

const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  googleSignIn: async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

// Listen for auth changes
onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
  useAuthStore.getState().setLoading(false);
});

export default useAuthStore;
