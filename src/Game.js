import { useState } from "react";
import Board from "./Board";
import Confetti from "react-confetti";

const Game = () => {
    const [board,setBoard] =useState(Array(9).fill(null));
    const [text, setText] = useState("X' Turn");
    const [current, setCurrent] = useState("X");
    const [finished, setFinished] = useState(false);
    const [winner, setWinner] = useState(false);
    const restart = () => {
        setBoard(Array(9).fill(null));
        setText("X' Turn");
        setCurrent("X");
        setFinished(false);
    }

    const checkWinner = (index) => {
        if(board[index] !== null) return null;

        if(current === "X"){
            let newBoard = board;
            newBoard[index] = "X";
            setBoard(newBoard);
            setCurrent("O");
            setText("O's Turn");
        }else{
            let newBoard = board;
            newBoard[index] = "O";
            setBoard(newBoard);
            setCurrent("X");
            setText("X's Turn");
        }

        if(board.includes(null) === false) {
            setText("It's a Draw!");
            setFinished(true);
            return "Draw";
        }

        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        
        for (let i = 0; i < winCombinations.length; i++) {
            const [a, b, c] = winCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setText(`${board[a]} Wins!`);
                setFinished(true);
                setWinner(true);
                return board[a];
            }
        }
        
        return null;
    };
    
    return (
        <div className="h-screen flex flex-col justify-center items-center p-4 md:p-8">
            <h1 className="text-2xl sm:text-6xl md:text-7xl text-white font-bold text-center">
                |O| TIC TAC TOE |X|
            </h1>
            <Board board={board} checkWinner={checkWinner} finished={finished} />
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mt-8 text-center">
                {text}
            </h1>
            {finished && (
                <button
                    className="text-lg sm:text-xl text-white font-bold p-3 mt-5 border-b-2 hover:bg-white hover:text-blue-950 transition-all duration-300"
                    onClick={() => restart()}
                >
                    Play Again
                </button>
            )}
            {finished && winner && (
                <Confetti width={window.innerWidth} height={window.innerHeight} />
            )}
        </div>
    );
    
};

export default Game;