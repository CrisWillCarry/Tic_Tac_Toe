import React from 'react';

const Menu = ({play}) => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-5xl text-4xl md:text-7xl text-white font-bold"> |O| TIC TAC TOE |X| </h1>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 mt-12">
                <button
                    className="bg-white text-xl sm:text-3xl text-blue-950 font-bold p-5 rounded-full"
                    onClick={() => play()}
                >
                    PvP Game
                </button>
                <button
                    className="bg-white text-xl sm:text-3xl text-blue-950 font-bold p-5 rounded-full mt-8 sm:mt-0"
                    onClick={() => play("AI")}
                >
                    ChatGPT Game
                </button>
            </div>
        </div>
    );
    
};

export default Menu;