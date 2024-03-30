import { useState, useEffect } from 'react';
import Card from './Card';
import './card.css';
import { useMemoryContext } from '../../../../../contexts/MemoryContext';

function CardGroup() {
    const { gameSetting ,items, setItems} = useMemoryContext();
    const [twiceRenderItems, setTwiceRenderItems] = useState([]);
    const [prev, setPrev] = useState(-1);

    useEffect(() => {
        // Define cards based on the difficulty level
        const cardCount = getCardCount(gameSetting.difficultyLevel);
        const halfCardCount = Math.ceil(cardCount / 2);
        const cards = generateCards(halfCardCount);
        // Duplicate the cards to create pairs for rendering
        const duplicateCards = [...cards, ...cards];
        setItems(cards.sort(() => Math.random() - 0.5));
        console.log(cards);
        setTwiceRenderItems(duplicateCards.sort(() => Math.random() - 0.5));
        setPrev(-1);
    }, [gameSetting.difficultyLevel]);

    function getCardCount(difficultyLevel) {
        switch (difficultyLevel) {
            case 'very_easy':
                return 8;
            case 'easy':
                return 12;
            case 'medium':
                return 24;
            case 'hard':
                return 32;
            default:
                return 8; // Default to easy level
        }
    }

    function generateCards(count) {
        const cards = [];
        for (let i = 1; i <= count; i++) {
            cards.push({ id: i, img: `https://obs.line-scdn.net:443/r/ect/ect/image_170903179823226637722dd8141t1319e866`, stat: "" });
        }
        return cards;
    }

    function check(current) {
        if (items[current].id === items[prev].id) {
            items[current].stat = "correct";
            items[prev].stat = "correct";
            setItems([...items]);
            setPrev(-1);
        } else {
            items[current].stat = "wrong";
            items[prev].stat = "wrong";
            setItems([...items]);
            setTimeout(() => {
                items[current].stat = "";
                items[prev].stat = "";
                setItems([...items]);
                setPrev(-1);
            }, 1000);
        }
    }

    function handleClick(id) {
        if (prev === -1) {
            items[id].stat = "active";
            setItems([...items]);
            setPrev(id);
        } else {
            check(id);
        }
    }

    return (
        <div className="container p-4 h-fit">
            {twiceRenderItems.map((item, index) => (
                <Card key={index} item={item} id={index} handleClick={handleClick} />
            ))}
        </div>
    );
}

export default CardGroup;
