import { createContext,useContext,useState } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

    const value = {
        userProfile,
        setUserProfile,
        isLogged,
        setIsLogged
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => useContext(UserContext);