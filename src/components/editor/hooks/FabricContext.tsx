import React, { createContext, useContext } from "react";
import { useFabricEditor } from "./useFabricEditor";

const FabricContext = createContext<ReturnType<typeof useFabricEditor> | null>(null);

export const FabricProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const editor = useFabricEditor();
  return (
    <FabricContext.Provider value={editor}>
      {children}
    </FabricContext.Provider>
  );
};

export const useFabric = () => {
  const ctx = useContext(FabricContext);
  if (!ctx) {
    throw new Error("useFabric must be used inside FabricProvider");
  }
  return ctx;
};
