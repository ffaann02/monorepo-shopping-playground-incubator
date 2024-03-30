import React, { useState, useEffect } from "react";
import { useMemoryContext } from "../../../../../contexts/MemoryContext";
import { useDataFetch } from "../../../../../hooks/useDataFetch";

const Setting = ({ gameId }) => {

  const { insertDataWithParams } = useDataFetch();

  const difficultyLevels = [
    { value: 'very_easy', label: 'ง่ายมาก', cardCount: 4 },
    { value: 'easy', label: 'ง่าย', cardCount: 6 },
    { value: 'medium', label: 'ปานกลาง', cardCount: 12 },
    { value: 'hard', label: 'ยาก', cardCount: 16 },
  ];

  const { gameSetting, setGameSetting, cards, setCards, setCurrentCard, devMode, setDevMode, flipAllCards, updateMemoryState, setUpdateMemoryState } = useMemoryContext();

  useEffect(() => {
    flipAllCards(true);
  }, [])

  const handleDifficultyChange = (level) => {
    setGameSetting({ ...gameSetting, difficultyLevel: level });
    setUpdateMemoryState({ ...updateMemoryState, difficultyLevel: level })
  };


  const handleSourceTypeChange = (index, pairId, sourceType) => {
    const updatedCards = [...cards];
    updatedCards[index].url_type = sourceType;
    if (sourceType !== 'link') {
      updatedCards[index].image = ''; // Clear the image URL if source type is not 'link'
    }
    setCards(updatedCards);
    setUpdateMemoryState({ ...updateMemoryState, updatedCards: updatedCards })
  };

  const handleImageInputChange = (index, pairId, imageUrl) => {

    const updatedCards = cards.map(card => {
      if (card.pairId === pairId) {
        return { ...card, image: imageUrl };
      }
      return card;
    });

    setCards(updatedCards);
    setUpdateMemoryState({ ...updateMemoryState, updatedCards: updatedCards })
  };

  const handleMouseEnter = (pairId) => {
    setCurrentCard(pairId);
  };

  const handleMouseLeave = () => {
    setCurrentCard(null);
  };

  const handleFileUpload = (index, pairId, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageUrl = event.target.result;
      handleImageInputChange(index, pairId, imageUrl);
    };

    reader.onloadend = function () {
      const base64String = reader.result.split(',')[1];
      const data = {
        gameId: gameId,
        pairId: pairId,
        base64String: base64String
      }
      insertDataWithParams('/firebase/upload-game-setting-image', data)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.error("Error upload cards image:", error);
        });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="pl-1 pr-0.5 mt-1">
      <p className="text-sm text-slate-500">ระดับความยาก</p>
      <div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">

          {difficultyLevels.map((level) => (
            <div key={level.value} className={`flex px-2 py-1.5 rounded-md cursor-pointer
            ${gameSetting.difficultyLevel === level.value ? 'bg-slate-100' : 'bg-white'}`}
              onClick={() => handleDifficultyChange(level.value)}>
              <input
                type="radio"
                className="radio radio-sm radio-success"
                id={level.value}
                checked={gameSetting.difficultyLevel === level.value}
                onChange={() => handleDifficultyChange(level.value)}
              />
              <label htmlFor={level.value} className="text-slate-500 ml-2 text-xs mt-1 cursor-pointer">
                {level.label} ({level.cardCount} การ์ด)
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-slate-500">รูปภาพในการ์ด</p>
        <div className="overflow-x-auto mt-1 border rounded-md bg-slate-50 drop-shadow-md">
          <table className="table">
            {/* head */}
            <thead className="">
              <tr className=" border-slate-200">
                <th className="text-xs font-normal text-slate-500">ลำดับ</th>
                <th className="text-xs font-normal text-slate-500">รูปแบบ</th>
                <th className="text-xs font-normal text-slate-500">แหล่งที่มา</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((item, index) => (
                // Check if index is even to render every alternate card
                index % 2 === 0 && (
                  <tr
                    className="hover:bg-slate-200 cursor-pointer"
                    key={item.id}
                    onMouseEnter={() => handleMouseEnter(item.pairId)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <th className="text-slate-500 font-normal text-xs">{index / 2 + 1}</th>
                    <td className="text-slate-500 font-normal text-xs">
                      <select
                        className="h-full border rounded-sm"
                        value={item.url_type}
                        onChange={(e) => handleSourceTypeChange(index, item.pairId, e.target.value)}
                      >
                        <option value="link">Link</option>
                        <option value="upload">Upload</option>
                        <option value="emoji">Emoji</option>
                      </select>
                    </td>
                    <td className="text-slate-500 font-normal text-xs w-full" colSpan={3}>
                      <div className="grid grid-cols-1 gap-2 w-full">
                        {item.url_type === 'upload' && (
                          <input
                            type="file"
                            className="h-full border rounded-sm px-2 py-1.5 text-slate-600"
                            onChange={(e) => handleFileUpload(index, item.pairId, e)}
                          />
                        )}
                        {item.url_type === 'link' && (
                          <input
                            className="h-full border rounded-sm px-2 py-1.5 text-slate-600 w-full focus:outline-none"
                            placeholder="ระบุลิงก์รูป"
                            value={item.image}
                            onChange={(e) => handleImageInputChange(index, item.pairId, e.target.value)}
                          />
                        )}
                        {item.url_type === 'emoji' && (
                          <input className="h-full border rounded-sm px-2 py-1.5 text-slate-600" placeholder="Enter emoji" />
                        )}
                      </div>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Setting;
