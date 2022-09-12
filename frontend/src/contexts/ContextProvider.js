import React, { createContext, useContext, useState } from "react";
const StateContext = createContext();
export const ContextProvider = ({ children }) => {
    const [font, setFont] = useState("Cormorant Upright");
    const [name, setName] = useState("All");
    const [currentcolor, setCurrentColor] = useState("#1c33c7");
    const [specificId, setSpecificId] = useState('');
     const  [todoData, setData] = useState([]);
      const [user, setUser] = useState("");
      const [isToggled, setIsToggled] = useState(false);
  return (
    <StateContext.Provider
      value={{
        font,
        setFont,
        name,
        setName,
        currentcolor,
        setCurrentColor,
        specificId,
        setSpecificId,
        todoData,
        setData,
        user,
        setUser,
        isToggled,
        setIsToggled,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);