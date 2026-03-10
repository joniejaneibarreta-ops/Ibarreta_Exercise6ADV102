import { createContext, ReactNode, useContext, useState } from "react";

const themes = {
  lavenderDream: ["#FFD6E8", "#E5D9FF"] as [string, string, ...string[]],
  oceanMist: ["#D6F0FF", "#E5D9FF"] as [string, string, ...string[]],
  midnightLibrary: ["#2C1E38", "#4B365F"] as [string, string, ...string[]],
  sunsetRead: ["#FFECD2", "#FCB69F"] as [string, string, ...string[]],
};

type ThemeContextType = {
  themeColors: [string, string];
  themeName: string;
  changeTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeKeys = Object.keys(themes) as (keyof typeof themes)[];
  const [index, setIndex] = useState(0);

  const currentKey = themeKeys[index];

  function changeTheme() {
    setIndex((prev) => (prev + 1) % themeKeys.length);
  }

  return (
    <ThemeContext.Provider
      value={{
        themeColors: themes[currentKey] as [string, string],
        themeName: currentKey,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeContext missing");
  return context;
}
