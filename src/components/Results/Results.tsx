


function Results({wordCount}: {wordCount: number}) {
    

    return(
        <div className="results">
            <h1>Results</h1>
            <h2>WPM: {wordCount * 2}</h2>
        </div>
    )
}

export default Results;