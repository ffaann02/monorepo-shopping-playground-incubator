import { createContext,useState } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [isLogged, setIsLogged] = useState(true);

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

export { UserProvider, UserContext };