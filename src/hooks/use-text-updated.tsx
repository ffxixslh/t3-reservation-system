"use client";

import React from "react";

const TextUpdatedContext = React.createContext<
  | [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  | null
>(null);

export const TextUpdatedProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isTextUpdated, setIsTextUpdated] =
    React.useState(false);

  return (
    <TextUpdatedContext.Provider
      value={[isTextUpdated, setIsTextUpdated]}
    >
      {children}
    </TextUpdatedContext.Provider>
  );
};

export const useTextUpdated = () => {
  const context = React.useContext(TextUpdatedContext);
  if (context === null) {
    throw new Error(
      "useTextUpdated must be used within a TextUpdatedProvider",
    );
  }
  return context;
};
