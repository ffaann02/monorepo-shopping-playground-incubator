
import { useState, useEffect, useContext } from 'react';
import liff from '@line/liff';
import { UserContext } from '../contexts/UserContext';

export const useLineIntegration = () => {
  const {userProfile, setUserProfile, isLogged, setIsLogged} = useContext(UserContext);

  const logout = () => {
    liff.logout();
    window.location.reload();
  }

  const initLine = () => {
    liff.init({ liffId: import.meta.env.VITE_LIFF_ID }, () => {
      if (liff.isLoggedIn()) {
        LoadLineData();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  const LoadLineData = () => {
    const token = liff.getIDToken();
    if (token) {
    //   setIdToken(token);
      liff.getProfile().then((profile) => {
        console.log(profile);
        setUserProfile(profile);
      }).catch((err) => console.error(err));
    } else {
      console.error("ID Token is null");
    }
  }

  useEffect(() => {
    if(!isLogged){
        initLine();
    }
  }, []);

  return { logout };
}
