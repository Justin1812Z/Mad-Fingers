import axios from "axios";
import { useEffect, useState } from "react";
import words from "../../data/wordlist.json";
import "./Game.css";

function Game() {
    const [loading, setLoading] = useState(true);
    const [currentWord, setCurrentWord] = useState(" ");
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [wordCount, setWordCount] = useState(0);

    const [futureWords, setFutureWords] = useState<string[]>(["loading..."]);
    const [prevWords, setPrevWords] = useState<string[]>([]);


    //Fetch words from API
    const fetchAPI = async () => {
        await axios
            .get("https://random-word-api.herokuapp.com/word?number=42")
            .then((response) => {
                console.log(response.data);
                setFutureWords(response.data);

                // You should NOT log backendData here, it's not updated yet
                // // Log directly from the response
            })
            .then(() => setLoading(false));
        
    };

    

    //Update currentWord
    useEffect(() => {
        if (futureWords.length > 0 && loading === false) {
            setPrevWords([...prevWords, currentWord]);
            setCurrentWord(futureWords.shift() || "No words available");
        }
    }, [wordCount]);

    useEffect(() => {
        if(loading == false){
            setCurrentWord(futureWords.shift() || "No words available");
        }
    }, [futureWords]);



    //Handle key strokes and check if they match the current word
    useEffect(() => {
        const onKeyPress = (event: KeyboardEvent) => {
            if (event.key === currentWord[currentLetterIndex]?.toLowerCase()) {
                setCurrentLetterIndex(currentLetterIndex + 1);

                if (currentLetterIndex == currentWord.length - 1) {
                    setCurrentLetterIndex(0); // Reset currentLetterIndex to start over with the next word
                    setWordCount(wordCount + 1); // Get a new random word
                }
            }
        };

        document.addEventListener("keydown", onKeyPress);

        return () => {
            document.removeEventListener("keydown", onKeyPress);
        };
    }, [currentWord, currentLetterIndex]);

    //Run when component mounts (page loads)
    useEffect(() => {
        console.log("Component mounted");
        fetchAPI();
        console.log(words)
    }, []);


    return (
        <div className="game">

            {/* <div className="prev-word-container">
                {prevWords.map((prevWord, index) => (
                    <span className="prev-word" key={index}>
                        {prevWord}
                    </span>
                ))}
            </div> */}

            <div className="current-word-container">
                <h2>{currentWord.split('').map((char, index) => (
                    <span
                        key={index}
                        className={currentLetterIndex === index ? "current-letter" : index < currentLetterIndex ? "correct-letter" : "future-letter"}
                    >{char}</span>

                )

                )}</h2>
            </div>


            {/* <div className="future-word-container">
                {futureWords.map((word, index) => (
                    <span
                        className="future-word"
                        key={index}
                    >
                        {word}
                    </span>
                ))}
            </div> */}

        </div>
    );
}
export default Game;
