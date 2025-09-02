import { Link } from "react-router-dom";



function Results({ wordCount }: { wordCount: number }) {


    return (
        <>
            <div className="results">
                <h1>Results</h1>
                <h2>WPM: {wordCount * 2}</h2>
            </div>
            <Link to="/game">
                <button>Start Game</button>
            </Link>
        </>
    )
}

export default Results;