import React, { useEffect, useState } from "react";
import Board from "./Board";
import Confetti from "react-confetti";
import axios from 'axios';

const GameAI = () => {
    const [board,setBoard] =useState(Array(9).fill(null));
    const [text, setText] = useState("Your Turn");
    const [current, setCurrent] = useState("X");
    const [finished, setFinished] = useState(false);
    const [winner, setWinner] = useState(false);
    

    useEffect(() => {
        if (current === "O" && !finished) {
            getAIMove().then((index) => {
                if (index !== null) {
                    checkWinner(index);
                }
            });
        }
    }, [current]);


    const getAIMove = async () => {

        try {
            const response = await axios.post('/api/gemini', {
              contents: `You are an AI Tic Tac Toe player. Here is the current board: ${board.map(cell => cell || "-").join("")}. You are "O". Only return the index of the cell you want to place your move. Nothing else, just the index.`  // Example content
            });
            console.log("Response from Gemini API:", response.data);
            const move = parseInt(response.data.choices?.[0]?.message?.content?.trim());
            console.log("AI chose:", move);
            return isNaN(move) ? null : move;
          } catch (error) {
            console.error('Error getting response from Gemini API:', error);
            return null;
          }
    };

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
            setText("O' Turn");
        }else{
            let newBoard = board;
            newBoard[index] = "O";
            setBoard(newBoard);
            setCurrent("X");
            setText("X' Turn");
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

    return(
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-7xl text-white font-bold"> |O| TIC TAC TOE |X| AI</h1>
            <Board board={board} checkWinner={checkWinner} finished={finished}/>
            <h1 className="text-4xl text-white font-bold mt-16"> {text} </h1>
            {finished && <button className="text-xl text-white font-bold p-2  mt-5 border-b-2 hover:bg-white hover:text-blue-950" onClick={() => restart()}>Play Again</button>}
            {finished && winner && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        </div>
    );
};

export default GameAI;