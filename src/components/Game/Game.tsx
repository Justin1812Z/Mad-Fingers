import axios from "axios";
import { useEffect, useState, useRef } from "react";
import words from "../../data/wordlist.json";
import "./Game.css";

function Game() {
    const [loading, setLoading] = useState(true);
    const [currentWord, setCurrentWord] = useState(" ");
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [wordCount, setWordCount] = useState(0); 

    const [futureWords, setFutureWords] = useState<string[]>(["loading..."]);
    const [prevWords, setPrevWords] = useState<string[]>([]);
    const [newWords, setNewWords] = useState<string[]>([]);
    const [timer, setTimer] = useState(30.00);
    const [timerStarted, setTimerStarted] = useState(false);


    //*** Depricated ***Fetch words from API
    const fetchAPI = async () => {
        // await axios
        //     .get("https://random-word-api.herokuapp.com/word?number=42")
        //     .then((response) => {
        //         console.log(response.data);
        //         setFutureWords(response.data);

        //         // You should NOT log backendData here, it's not updated yet
        //         // // Log directly from the response
        //     })
        //     .then(() => setLoading(false));       
        
    };



    //Update currentWord when wordCount or futureWords changes
    useEffect(() => {
        if(loading == false){
            setCurrentWord(futureWords.shift() || "No words available");  
        }
    }, [wordCount, futureWords]);



    //Handle key strokes and check if they match the current word
    useEffect(() => {
        const onKeyPress = (event: KeyboardEvent) => {
            if(timerStarted == false && wordCount == 0 && currentLetterIndex == 0){
                 setTimerStarted(true);
                 startTime();
            }
            if (event.key === currentWord[currentLetterIndex]?.toLowerCase()) {
                setCurrentLetterIndex(currentLetterIndex + 1);

                if (currentLetterIndex == currentWord.length - 1) {
                    setCurrentLetterIndex(0); //Reset currentLetterIndex to start over with the next word
                    setWordCount(wordCount + 1); 
                }
            }
        };

        document.addEventListener("keydown", onKeyPress);

        return () => {
            document.removeEventListener("keydown", onKeyPress);
        };
    }, [currentWord, currentLetterIndex]);

    
    //When page loads, populate array with i random words, setFutureWords = that array, setLoading to false
    useEffect(() => {
        //fetchAPI();

        for (let n = 0; n < 10; n++) {
            const randomIndex = Math.floor(Math.random() * 8161);
            newWords.push(words.words[randomIndex]);
        }

        setFutureWords(newWords);
        setLoading(false);
    }, []);

    function startTime() {
    
        const intervalId = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 0.01) {
                    clearInterval(intervalId);
                    return 0;
                }
                return +(prevTimer - 0.01).toFixed(2);
            });
        }, 10);
    
}

    return (
        <div className="game">

            {/* <div className="prev-word-container">
                {prevWords.map((prevWord, index) => (
                    <span className="prev-word" key={index}>
                        {prevWord}
                    </span>
                ))}
            </div> */}

            <h3>{timer}</h3>

            <div className="current-word-container">
                <h2>{currentWord.split('').map((char, index) => (
                    <span
                        key={index}
                        className={currentLetterIndex === index ? "current-letter" : index < currentLetterIndex ? "correct-letter" : "future-letter"}
                    >{char}</span>

                )

                )}</h2>
            </div>


            <div className="future-word-container">
                {futureWords.map((word, index) => (
                    <span
                        className="future-word"
                        key={index}
                    >
                        {word}
                    </span>
                ))}
            </div>

        </div>
    );
}
export default Game;



