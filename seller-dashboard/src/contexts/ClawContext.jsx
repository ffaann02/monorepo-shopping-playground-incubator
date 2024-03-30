import { createContext,useState ,useContext} from "react";
const ClawContext = createContext();

const ClawProvider = ({ children }) => {
    const [giftList, setGiftList] = useState(null);
    const [gameName ,setGameName] = useState(null);

    const value = {
        giftList,
        setGiftList,
        gameName,
        setGameName
    }

    return(
        <ClawContext.Provider value={value}>
            {children}
        </ClawContext.Provider>
    )
};

export { ClawProvider, ClawContext };
export const useClawContext = () => useContext(ClawContext);