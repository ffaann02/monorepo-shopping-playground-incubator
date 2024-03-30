import { useEffect } from "react";
import "./card.css"
function Card({ card, onClick,decoration }) {

  return (
    <div
      className={`memory-card${card.isFlipped ? " flip" : ""} rounded-lg border`}
      onClick={onClick}
      style={{ order: card.order, borderColor: decoration.border_color,backgroundColor: decoration.background_color}}
      data-testid={card.id}
      alt={card.cardName}
    >
      {card.image !== "" && <img className={`front-face object-cover ${card.image === "" ? "p-1" : "p-1"}`} src={card.image} alt="Card" />}
        <img className={`back-face object-cover ${decoration.back_logo_url === "" ? "p-4":"p-1"}`} src={decoration.back_logo_url === ""
          ? "https://cdn-icons-png.flaticon.com/512/5726/5726624.png" : decoration.back_logo_url} alt="Badge" />
    </div>
  );
}

export default Card;
