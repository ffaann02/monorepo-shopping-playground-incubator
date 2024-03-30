import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context
const MemeryContext = createContext();

// Create a provider component
export const MemoryProvider = ({ children }) => {
  const [gameConditionData, setGameConditionData] = useState(null);
  const [updateMemoryState, setUpdateMemoryState] = useState({}); // Initial state
  const [giftList, setGiftList] = useState(null); // Initial state
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [conditions, setConditions] = useState([]); // State to store conditions
  const [conditionsAttempt, setConditionsAttempt] = useState([]); // State to store conditions
  const [gameName, setGameName] = useState("");

  let [cardsState, setCardsState] = useState();

  const [devMode,setDevMode] = useState({
    cardFlip:true,
    shuffle:false,
  });

  const [decoration, setDecoration] = useState(
    {
      border_color:"#000000",
      background_color:"#ffffff",
      back_logo_url:""
    }
  );


  const [gameSetting, setGameSetting] = useState({
    difficultyLevel: "very_easy",
    conditions:{
      time: true,
      attempt: false
    } 
  });

  const flipAllCards = (state) => {
    if (cardsState) {
      const cardsData = cardsState.map((card) => ({
          ...card,
          isFlipped: state,
      }));
      setCardsState(cardsData);
    }
};

    // Function to get the number of cards based on the difficulty level
    function getCardCount(difficultyLevel) {
      switch (difficultyLevel) {
        case 'very_easy':
          return 4;
        case 'easy':
          return 6;
        case 'medium':
          return 12;
        case 'hard':
          return 16;
        default:
          return 4; // Default to very easy level
      }
    }

    function generateCards(difficultyLevel, existingCards) {
      const uniqueCardCount = getCardCount(difficultyLevel); // Calculate the number of unique cards (pairs)
      const existingCardPairs = existingCards.map(card => card.pairId);
      let nextCardId = existingCardPairs.length > 0 ? Math.max(...existingCardPairs) + 1 : 1;
      const generatedCards = [];
  
      // Generate cards with existing image URLs
      for (const existingCard of existingCards) {
          generatedCards.push({ ...existingCard }); // Copy existing card with image URL
      }
  
      // Generate cards with blank image URLs
      for (let i = nextCardId; i <= uniqueCardCount; i++) {
          // For each unique card without an existing image URL, create two identical cards
          const cardId = i;
          const cardName = `Card ${i}`;
          const urlType = "link";
          // Push two identical cards to the generated cards array with blank image URLs
          generatedCards.push({ id: (cardId - 1) * 2 + 1, name: cardName, url_type: urlType, image: "", pairId: cardId });
          generatedCards.push({ id: (cardId - 1) * 2 + 2, name: cardName, url_type: urlType, image: "", pairId: cardId });
      }
  
      // If the new card count is less than the existing card count, remove excess cards
      const excessCardsCount = generatedCards.length - 2 * uniqueCardCount;
      if (excessCardsCount > 0) {
          generatedCards.splice(-excessCardsCount);
      }
  
      return generatedCards;
  }

  // Generate cards when the difficulty level changes
  useEffect(() => {
    const generatedCards = generateCards(gameSetting.difficultyLevel, cards);
    setCards(generatedCards);
}, [gameSetting]);

  useEffect(() => {
    console.log(updateMemoryState);
  }, [updateMemoryState])

  return (
    <MemeryContext.Provider
      value={{
        gameConditionData,
        setGameConditionData,
        giftList,
        setGiftList,
        gameSetting,
        setGameSetting,
        cards,
        setCards,
        currentCard, 
        setCurrentCard,
        conditions, 
        setConditions,
        conditionsAttempt, 
        setConditionsAttempt,
        decoration, 
        setDecoration,
        devMode,
        setDevMode,
        cardsState, 
        setCardsState,
        flipAllCards,
        gameName, 
        setGameName,
        updateMemoryState,
        setUpdateMemoryState
      }}
    >
      {children}
    </MemeryContext.Provider>
  );
};

// Custom hook to use the context
export const useMemoryContext = () => useContext(MemeryContext);
