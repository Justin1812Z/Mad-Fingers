function Testing() {
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
                <h2>
                    <span
                        key={0}
                        className="current-letter"
                    >c</span>

                

                </h2>
            </div>


            <div className="future-word-container">
                
                    <span
                        className="future-word"
                        key={0}
                    >
                        word
                    </span>
               
            </div>

        </div>
    )
}

export default Testing;
