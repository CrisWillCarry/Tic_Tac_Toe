import React, { useState } from 'react';
import Menu from './Menu';
import Game from './Game';
import GameAI from './GameAI';

function App() {
  const [start, setStart] = useState(false);

  const play = (type) => {
    if(type === "AI") {
      setStart("AI");
      return;
    }
    setStart(true);
  }

  return (
    <div className='bg-blue-950'>
      {start === "AI" ? <GameAI/> : start ? <Game/>: <Menu play={play}/>}
    </div>
  );
}

export default App;