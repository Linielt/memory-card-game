import { useState, useEffect } from "react";
import GameState from "./GameState";

export default function CardGrid({score, setScore, highScore, setHighScore}) {

    const [clickedCards, setClickedCards] = useState([]);
    const [shuffledCards, setShuffledCards] = useState([]);
    const [cardData, setCardData] = useState({});

    const [gameState, setGameState] = useState('');
    const [gameStateColor, setGameStateColor] = useState('');

    const cardNames = [
        "pikachu",
        "bulbasaur",
        "piplup",
        "geodude",
        "onix",
        "beedrill",
        "bidoof",
        "ditto",
        "mew",
        "chimchar"
    ]

    // Runs when score changes
    useEffect(() => {
        const cardDataArray = Object.keys(cardData).map((cardName) => ({
            cardName: cardName,
            imageUrl: cardData[cardName],
        }));
        setShuffledCards(shuffleCardArray(cardDataArray));

        if (clickedCards.length === 10) {
            setScore(0);
            setHighScore(0);
            setClickedCards([]);
            setGameState('You win!');
            setGameStateColor('lime');
            setTimeout(() => {
                setGameState('');
                setGameStateColor('');
            }, 3000);
        }
    }, [score, cardData, clickedCards.length, setHighScore, setScore])

    async function getImage(cardName) {
        let url = `https://pokeapi.co/api/v2/pokemon/${cardName}`;
        const response = await fetch(url);
        const jsonData = await response.json();
        return jsonData.sprites.other["official-artwork"].front_default;
    }

    function handleCardClick(cardName) {
        if (clickedCards.includes(cardName)) {
            if (score > highScore) {
                setHighScore(score);
                console.log("New high score!");
            }
            setScore(0);
            setClickedCards([]);
            setGameState('You lose!');
            setGameStateColor('red');
            setTimeout(() => {
                setGameState('');
                setGameStateColor('');
            }, 3000);
        } else {
            setClickedCards([...clickedCards, cardName]);
            setScore(score + 1);
        }
    }

    function shuffleCardArray(cards) {
        // https://stackoverflow.com/a/46545530
        return cards
            .map(card => ({ card, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ card }) => card);
    }

    useEffect(() => {
        async function mapCardToObjectData() {
            for (const cardName of cardNames) {
                const imageUrl = await getImage(cardName);
                setCardData((currentCardData) => ({
                    ...currentCardData,
                    [cardName]: imageUrl
                }));
            }
        }

        mapCardToObjectData();
    }, [JSON.stringify(cardNames)]);

    return (
        <>
        <section className='card-grid'>
            {
                shuffledCards.map(({cardName, imageUrl}) => {
                    return (
                        <div className='card' key={cardName} onClick={() => handleCardClick(cardName)}>
                            <img src={imageUrl} alt='' />
                            <p>{cardName}</p>
                        </div>
                    )
                })
            }
        </section>
        <GameState gameState={gameState} color={gameStateColor}></GameState>
        </>
    )
}