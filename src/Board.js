
const Board =({ checkWinner, board, finished, userTurn}) => {
    return (
        <div className="grid grid-cols-3 gap-2 w-auto bg-white mt-16">
        {board.map((value, index) => (
            <button
                key={index}
                onClick={() => !finished && userTurn ? checkWinner(index): null}
                className="w-40 h-40 text-8xl font-bold flex items-center justify-center bg-blue-950 text-white "
            >
                {value}
            </button>
        ))}
        </div>
    );
};
      
export default Board;
