import React,{useState,useContext} from 'react';

const EditorShareContext = React.createContext();
export const EditorShareProvider = ({ children }) => {
  const [isImportGiftList, setIsImportGiftList] = useState(false);

  return (
    <EditorShareContext.Provider value={{isImportGiftList,setIsImportGiftList}}>
      {children}
    </EditorShareContext.Provider>
  );
};

export const useEditorShareContext = () => useContext(EditorShareContext);

