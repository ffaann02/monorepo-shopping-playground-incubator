import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WheelSpinner from '../components/GameList/WheelSpinner';
import MemoryCard from '../components/GameList/MemoryCard';

const Game = () => {
  // useParams hook to get parameters from the URL
  const { gameId, orderNumber, conditionMatch } = useParams();

  const components = [
    { prefix: "ws", component: <WheelSpinner gameId={gameId} orderNumber={orderNumber} conditionMatch={conditionMatch}/> },
    { prefix: "mm", component: <MemoryCard gameId={gameId}/> }
  ];

  useEffect(()=>{
    if(gameId){
      console.log(`gameId: ${gameId}`);
    }
  },[gameId])

  useEffect(()=>{
    if(orderNumber){
      console.log(`orderNumber: ${orderNumber}`);
    }
  },[orderNumber])

  useEffect(()=>{
    if(conditionMatch){
      console.log(`conditionMatch: ${conditionMatch}`);
    }
  },[conditionMatch])


  // Find the component based on gameId prefix
  const matchedComponent = components.find(item => gameId.startsWith(item.prefix));

  return (
    <div className="w-full h-full min-h-screen bg-slate-100">
        <div className='text-center py-4 font-bold'>SHOPPING PLAYGROUND</div>
        <div className='w-full'>
          {matchedComponent && matchedComponent.component}
        </div>
    </div>
  )
};
export default Game;
