import React, { useState } from 'react';
import './clawStyle.scss'; // Import your SCSS file here

const Game = () => {
  // State to manage the arm position
  const [armPosition, setArmPosition] = useState({ x: 1, y: -80 });

  // Function to move the arm left
  const moveLeft = () => {
    setArmPosition((prevPosition) => ({
      ...prevPosition,
      x: prevPosition.x - 10, // Adjust the value as needed for desired movement
    }));
  };

  // Function to move the arm right
  const moveRight = () => {
    setArmPosition((prevPosition) => ({
      ...prevPosition,
      x: prevPosition.x + 10, // Adjust the value as needed for desired movement
    }));
};

  // Function to lower the crane arm smoothly
  const startPicking = () => {
    // Set the arm position to lower the crane arm
    setArmPosition((prevPosition) => ({
      ...prevPosition,
      y: 0, // Move arm to positionY 0
    }));
  
    // After 1 second, move the arm back to the starting position
    setTimeout(() => {
      setArmPosition((prevPosition) => ({
        ...prevPosition,
        y: -80, // Move arm back to the starting position
      }));
  
      // After the arm reaches the starting position, move it to the very left of crane_window
      setTimeout(() => {
        const craneWindowWidth = document.querySelector('.machine__window').offsetWidth; // Get the width of crane_window
        setArmPosition((prevPosition) => ({
          ...prevPosition,
          x: (-craneWindowWidth / 2) + 100, // Move arm to the very left of crane_window
        }));
      }, 2000); // Wait for 1 second after lifting to the starting position
    }, 1000); // Wait for 1 second after lowering to positionY 0
  };

  const [prizeList, setPrizeList] = useState([
    {
        
    }
  ]);


  return (
    <form className="machine">
      <input type="checkbox" id="fire" name="fire" value="fire" />
      <button className="machine__btn" type="button" aria-labelledby="left-btn" onTouchStart={moveLeft} onClick={moveLeft}>
        <span className="left-arrow"></span>
        <span className="sr" id="left-btn">Left</span>
      </button>
      <button className="machine__btn" type="button" aria-labelledby="right-btn" onTouchStart={moveRight} onClick={moveRight}>
        <span className="right-arrow"></span>
        <span className="sr" id="right-btn">Right</span>
      </button>
      <button className="machine__btn absolute opacity-0" type="button" aria-labelledby="right-btn" onTouchStart={moveRight} onClick={moveRight}>
        <span className="right-arrow"></span>
        <span className="sr" id="right-btn">Right</span>
      </button>
      <label className="machine__btn machine__btn--red" htmlFor="fire" role="button" aria-labelledby="fire-btn" onClick={startPicking}>
        <span id="fire-btn">Get</span>
      </label>
      <div className="machine__roof">Win All the Thing</div>
      <div className="machine__window">
        <div className='bg-slate-600 bg-opacity-50 absolute w-full h-[30%] bottom-0'>
            
        </div>
        <div className="machine__crane-z">
          <div className="machine__crane-x">
            <div className="machine__crane-arm" style={{ transform: `translateX(${armPosition.x}px) translateY(${armPosition.y}px)` }}>
              <div className="machine__crane-claw">
                <div className="machine__crane-finger"></div>
                <div className="machine__crane-finger"></div>
                <div className="machine__crane-finger"></div>
                <div className="machine__crane-palm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="machine__op-area"></div>
      <div className="machine__prize-door"></div>
      <div className="machine__vents"></div>
      <div className="machine__feet"></div>
    </form>
  );
}

export default Game;
