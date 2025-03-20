
const Board =({ checkWinner, board, finished, userTurn}) => {
    return (
        <div className="grid grid-cols-3 gap-2 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-16">
            {board.map((value, index) => (
                <button
                    key={index}
                    onClick={() => !finished && userTurn ? checkWinner(index) : null}
                    className="w-full h-full text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold flex items-center justify-center bg-blue-950 text-white transition-all duration-300"
                >
                    {value}
                </button>
            ))}
        </div>
    );
    
};
      
export default Board;
