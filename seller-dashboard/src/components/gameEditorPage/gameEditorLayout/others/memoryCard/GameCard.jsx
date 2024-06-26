import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useMemoryContext } from "../../../../../contexts/MemoryContext";


function GameCard() {
    
    const {devMode} = useMemoryContext();

    // states
    const { cards,cardsState, setCardsState } = useMemoryContext();
    useEffect(() => {
        if (cards) {
            const cardsData = cards.map((card) => ({
                ...card,
                order: devMode.shuffle,
                isFlipped: devMode.cardFlip,
            }));
            setCardsState(cardsData);
        }
    }, [cards])

    // kep first card info
    let [firstCard, setFirstCard] = useState(null);
    // is it first click?
    let [secondClick, setSecondClick] = useState(false);
    // set flag to wait for 1500ms
    let [wait, setWait] = useState(false);
    // functions
    const checker = async (card) => {
        if (card.name === firstCard.name) {
            console.log("hellooo");
            card["passed"] = true;
            firstCard["passed"] = true;
            changeCardStatusHandler(card);
            changeCardStatusHandler(firstCard);
        } else {
            setWait(true);
            setTimeout(() => {
                changeCardStatusHandler(card);
                changeCardStatusHandler(firstCard);
                setWait(false);
            }, 1500);
        }
    };

    const changeCardStatusHandler = async (clickedCard) => {
        if (!clickedCard.passed) clickedCard.isFlipped = !clickedCard.isFlipped;
        let index = cardsState.findIndex((card) => card.id === clickedCard.id);
        let newState = [...cardsState];
        newState.splice(index, 1, clickedCard);
        await setCardsState(newState);
    };

    const handleClick = async (e, clickedCard) => {
        if (!devMode) {
            if (wait) {
                return;
            }
            if (!secondClick) {
                await setFirstCard(clickedCard);
                await setSecondClick(true);
                changeCardStatusHandler(clickedCard);
            } else {
                await setSecondClick(false);
                changeCardStatusHandler(clickedCard);
                checker(clickedCard);
                setFirstCard(null);
            }
        }
        else {
            return;
        }
    };

    return (
        <div className="memory-game h-fit p-4">
            {cardsState?.map((card) => {
                return (
                    <Card
                        key={card.id}
                        card={card}
                        onClick={(e) => handleClick(e, card)}
                    />
                );
            })}
            {/* <Card card={card} onClick={} /> */}
        </div>
    );
}

export default GameCard;
