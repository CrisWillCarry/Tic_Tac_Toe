import React from 'react';

const Menu = ({play}) => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-7xl text-white font-bold"> |O| TIC TAC TOE |X|</h1>
            <div className='flex gap-24'>
                <button className="bg-white text-2xl text-blue-950 font-bold p-5 rounded-full mt-16" onClick={() => play()}>PvP Game</button>
                <button className="bg-white text-2xl text-blue-950 font-bold p-5 rounded-full mt-16" onClick={() => play("AI")}>ChatGPT Game</button>
            </div>
        </div>
    );
};

export default Menu;