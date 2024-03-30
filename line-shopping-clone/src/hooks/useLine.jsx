
import { useState, useEffect, useContext } from 'react';
import liff from '@line/liff';
import { useUserContext } from '../contexts/UserContext';

export const useLineIntegration = () => {
    const { userProfile, setUserProfile, isLogged, setIsLogged } = useUserContext();

    const logout = () => {
        liff.logout();
        window.location.reload();
    }

    const initLine = () => {
        liff.init({ liffId: import.meta.env.VITE_LIFF_ID }, () => {
            if (liff.isLoggedIn()) {
                LoadLineData();
            } else {
                if (import.meta.env.VITE_PRODUCTION === 'false') {
                    const templateProfile =
                    {
                        "userId": "Uf9717c59a80ce121e43bdeb84132adcd",
                        "displayName": "Kong Chayapol",
                        "pictureUrl": "https://profile.line-scdn.net/0h54lO-CdPahtBNn7fINgUZDFmaXFiRzMJaAByLycwMCx1ASQabwQsKnwzNC19USsdPVIte30wMS9NJR19X2CWL0YGNyp9BypNbVIs_w",
                        "statusMessage": "templateProfile!"
                    }
                    setUserProfile(templateProfile);
                }
                else {
                    liff.login();
                }
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
        if (!isLogged) {
            initLine();
        }
    }, []);

    return { logout };
}
