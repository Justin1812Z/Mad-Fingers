import { useEffect, useState } from "react";
import words from "../../data/wordlist.json";
import "./Game.css";
import { useNavigate } from "react-router-dom";

function Game({ wordCount, setWordCount }: { wordCount: number; setWordCount: (count: number) => void }) {
    const [loading, setLoading] = useState(true);
    const [currentWord, setCurrentWord] = useState(" ");
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

    const [futureWords, setFutureWords] = useState<string[]>(["loading..."]);
    const [newWords] = useState<string[]>([]);
    const [timer, setTimer] = useState(30.00);
    const [timerStarted, setTimerStarted] = useState(false);
    const navigate = useNavigate();


  



    //Update currentWord when wordCount or futureWords changes
    useEffect(() => {
        if (loading == false) {
            setCurrentWord(futureWords[wordCount] || "No words available");
        }
    }, [wordCount, futureWords]);



    //Handle key strokes and check if they match the current word
    useEffect(() => {
        const onKeyPress = (event: KeyboardEvent) => {
            if (timerStarted == false && wordCount == 0 && currentLetterIndex == 0) {
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


    //When page loads, populate array with 100 random words, setFutureWords = that array, setLoading to false
    useEffect(() => {
        //fetchAPI();

        setWordCount(0);

        for (let n = 0; n < 100; n++) {
            const randomIndex = Math.floor(Math.random() * words.words.length);
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

    useEffect(() => {
        if (timer === 0) {
            navigate("/results");
        }
    }, [timer, navigate]);

    return (
        <div className="game">
        
            <h3 className="timer">{timer}</h3>    

            <div className="word-container">
                {futureWords.map((word, index) => (
                    index === wordCount ? (
                        <div key={index} className="current-word">
                            {word.split("").map((letter, i) => (
                                <span key={i} className={`${currentLetterIndex === i ? "current-letter" : i < currentLetterIndex ? "correct-letter" : "future-letter"} ${i === 0 ? "first-letter" : ""}`}>{letter}</span>
                            ))}
                        </div>
                    ) : (
                        <span key={index} className="future-word">{word}</span>
                    )
                ))}
            </div>


          

        </div>
    );
}
export default Game;



