import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD7aoSA_lkJjmsS8AI7k2lAnNN4Eprcnu8",
    authDomain: "hi-social-media-4b4ae.firebaseapp.com",
    projectId: "hi-social-media-4b4ae",
    storageBucket: "hi-social-media-4b4ae.appspot.com",
    messagingSenderId: "465776830437",
    appId: "1:465776830437:web:18b6c5bc99e7c56b32b10c",
    measurementId: "G-DPTWYKV3M8"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

export const uploadProfileImage = async (file: File, userId: string) => {
  const storageRef = ref(storage, `profileImages/${userId}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};