import { useEffect } from "react";
import { useMemoryContext } from "../../../../../contexts/MemoryContext";
import "./card.css";
function Card({ card, onClick }) {
  const { currentCard, decoration } = useMemoryContext();

  return (
    <div
      className={`memory-card${card.isFlipped ? " flip" : ""} h-40 rounded-lg border
      ${(currentCard === card.pairId) ? "shadow-lg shadow-green-400" : ""}`}
      onClick={onClick}
      style={{ order: card.order, borderColor: decoration.border_color,backgroundColor: decoration.background_color}}
      data-testid={card.id}
      alt={card.cardName}
    >
      {card.image !== "" ? <img className={`front-face object-cover ${card.image === "" ? "p-4" : "p-2"}`} src={card.image} alt="Card" /> :
        <div className="front-face flex w-full">
          <p className="m-auto text-sm text-slate-400">โปรดเลือกรูปภาพ</p>
        </div>
      }
        <img className={`back-face object-cover ${decoration.back_logo_url === "" ? "p-6":"p-2"}`} src={decoration.back_logo_url === ""
          ? "https://cdn-icons-png.flaticon.com/512/5726/5726624.png" : decoration.back_logo_url} alt="Badge" />
    </div>
  );
}

export default Card;
