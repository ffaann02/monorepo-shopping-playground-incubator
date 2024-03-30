import { useContext, useEffect, useState } from "react"
import GameChoices from "../../components/gameEditorPage/GameChoices"
import Suggestion from "../../components/gameEditorPage/Suggestion"
import { UserContext } from "../../contexts/UserContext"
import { useParams } from 'react-router-dom';
import WheelSpinner from "../../components/gameEditorPage/gameList/WheelSpinner";
import { WheelProvider } from "../../contexts/WheelContext";
import MemoryCard from "../../components/gameEditorPage/gameList/MemoryCard";
import { MemoryProvider } from "../../contexts/MemoryContext";
import { EditorShareProvider } from "../../contexts/EditorShareContext";
import ModalGiftListImport from "../../components/gameEditorPage/gameEditorLayout/shared/ModalGiftListImport";
import ClawMachine from "../../components/gameEditorPage/gameList/ClawMachine";
import { ClawProvider } from "../../contexts/ClawContext";

const GameEditor = () => {
  const { gameId } = useParams();

  const components = [
    { prefix: "ws", component: <WheelProvider><WheelSpinner gameId={gameId} /></WheelProvider> },
    { prefix: "mm", component: <MemoryProvider><MemoryCard gameId={gameId} /></MemoryProvider> },
    { prefix: "cm", component: <ClawProvider><ClawMachine gameId={gameId} /></ClawProvider> }
  ];

  // Find the component based on gameId prefix
  const matchedComponent = components.find(item => gameId.startsWith(item.prefix));

  return (
    <div>
      <EditorShareProvider>
        {matchedComponent && matchedComponent.component}
      </EditorShareProvider>
    </div>
  )
}
export default GameEditor