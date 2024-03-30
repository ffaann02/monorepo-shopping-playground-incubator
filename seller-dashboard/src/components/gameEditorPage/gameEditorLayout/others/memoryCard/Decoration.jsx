import React, { useState, useContext, useEffect } from "react";
import { useMemoryContext } from "../../../../../contexts/MemoryContext";
import { SliderPicker } from 'react-color';
import { useDataFetch } from "../../../../../hooks/useDataFetch";

const Decoration = ({gameId}) => {
  const { decoration, setDecoration, devMode, setDevMode, cards, setCards, flipAllCards, setUpdateMemoryState, updateMemoryState } = useMemoryContext();

  const { insertDataWithParams } = useDataFetch();

  useEffect(() => {
    flipAllCards(false);
  }, [])

  // Function to handle color change
  const handleChange = (colorKey, value) => {
    const dupDecoration = {...decoration};
    setDecoration(prevDecoration => ({
      ...prevDecoration,
      [colorKey]: value
    }));
    dupDecoration[colorKey] = value;
    setUpdateMemoryState({...updateMemoryState, decoration: dupDecoration})
  };

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setDecoration(prevDecoration => ({
          ...prevDecoration,
          back_logo_url: imageUrl
        }));
      };
      reader.onloadend = function () {
        const base64String = reader.result.split(',')[1];
        const data = {
          gameId: gameId,
          base64String: base64String
        }
        insertDataWithParams('/firebase/upload-game-decoration-image', data)
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.error("Error upload game decoration image:", error);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pl-1 pr-0.5 mt-1">
      {/* <p className="text-sm text-slate-500"></p> */}
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col p-2 rounded-md border">
          <span className="mb-1 text-sm text-slate-500">สีขอบการ์ด</span>
          <SliderPicker
            color={decoration.border_color}
            onChange={(color) => handleChange("border_color", color.hex)} // Pass the color key and value
          />
        </div>
        <div className="flex flex-col p-2 rounded-md border">
          <span className="mb-1 text-sm text-slate-500">สีการ์ด (พื้นหลัง)</span>
          <SliderPicker
            color={decoration.background_color}
            onChange={(color) => handleChange("background_color", color.hex)} // Pass the color key and value
          />
        </div>
        <div className="flex flex-col p-2 rounded-md border">
          <span className="mb-1 text-sm text-slate-500">รูปภาพ (Logo) หลังการ์ด</span>
          <input type="file"
            onChange={handleFileChange}
            className="file-input file-input-bordered file-input-accent file-input-sm w-full max-w-xs bg-slate-50 rounded-md cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Decoration;
