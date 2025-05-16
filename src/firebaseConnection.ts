import { initializeApp } from "firebase/app"
import { initializeAuth, 
  // @ts-ignore
  getReactNativePersistence,
  connectAuthEmulator, 
} from "firebase/auth"
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
  apiKey: "AIzaSyAs31WaKX7H33VEnKTEeseCkk2ybT72IAg",
  authDomain: "biblia-ai-983db.firebaseapp.com",
  projectId: "biblia-ai-983db",
  storageBucket: "biblia-ai-983db.firebasestorage.app",
  messagingSenderId: "41197945039",
  appId: "1:41197945039:web:5f23637b3d95ecd734b7ba",
  measurementId: "G-E8FSPYHS1D"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
//connectAuthEmulator(auth, 'http://localhost:9099')
const db = getFirestore(app)
const storage = getStorage(app)

export { app, auth, db, storage }