import * as firebase from "firebase/app";
import {
  signOut,
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import type { User } from "firebase/auth";
import {
  getFirestore,
  collection,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  Timestamp,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import Router from "next/router";

export const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

export const app = firebase.initializeApp(config);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const LoginWithGithub = async (): Promise<void> => {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // すでに登録済みかを確認
      const mailSnapshot = await getDocs(
        query(
          collection(db, "users"),
          where("name", "==", result.user.displayName),
          where("mail", "==", result.user.email)
        )
      );
      let isSignup = false;
      mailSnapshot.forEach((doc) => {
        if (doc.exists()) {
          return (isSignup = true);
        } else {
          return (isSignup = false);
        }
      });
      if (isSignup) {
        // サインアップしているのでこの先の処理は行わない
        Router.push("/demo");
      }
      const docSnap = await getDocs(
        query(collection(db, "users"), orderBy("created_at", "desc"), limit(1))
      );
      let id: number = 0; // 初期化
      docSnap.forEach((doc) => {
        id = Number(doc.data().id) + 1;
      });
      // users追加
      await addDoc(collection(db, "users"), {
        created_at: Timestamp.fromDate(new Date()),
        id: id === 0 ? 1 : id,
        name: result.user.displayName,
        photo: result.user.photoURL,
        role_id: 2,
        mail: result.user.email,
      });
      // location.assign('/')
    })
    .catch((error) => {
      console.error(error);
    });
};
