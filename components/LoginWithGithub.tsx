import { GithubAuthProvider, signInWithPopup } from '@firebase/auth';
import React from 'react'
import { auth, db } from '../firebase';

export const LoginWithGithub = async (): Promise<void> => {
  const github = new GithubAuthProvider();
  signInWithPopup(auth, github).then(result => {
    
  })
}
