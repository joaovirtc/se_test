// context/DataContext.js
"use client"; // Contexto precisa ser um Client Component

import { createContext, useContext, useState } from "react";

// Criação do contexto com valor padrão
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [path, setPath] = useState(null);
  const [catSlug, setcatSlug] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData, path, setPath, catSlug, setcatSlug }}>
      {children}
    </DataContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData deve ser usado dentro de um DataProvider");
  }
  return context;
};
