import React, { createContext, useContext, useState } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [scrollTo, setScrollTo] = useState(null);

  return (
    <ScrollContext.Provider value={{ scrollTo, setScrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
