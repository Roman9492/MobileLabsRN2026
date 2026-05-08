import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCefhLIihzFEMwBf78da0igdmUO8v0LPhQ",
  authDomain: "lab6-293ec.firebaseapp.com",
  projectId: "lab6-293ec",
  storageBucket: "lab6-293ec.firebasestorage.app",
  messagingSenderId: "1004384069612",
  appId: "1:1004384069612:web:74f83bbfc62200e54c02c9"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db };
