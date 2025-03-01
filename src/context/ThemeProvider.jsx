import { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext({
  theme: "light",
  setTheme: () => null,
});

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(defaultTheme);

  
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [storageKey]);

  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    const appliedTheme = theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

    root.classList.add(appliedTheme);
  }, [theme]);

  
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const systemThemeListener = (e) => {
        const newTheme = e.matches ? "dark" : "light";
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newTheme);
      };

      mediaQuery.addEventListener("change", systemThemeListener);
      return () => mediaQuery.removeEventListener("change", systemThemeListener);
    }
  }, [theme]);

  const updateTheme = (newTheme) => {
    localStorage.setItem(storageKey, newTheme);
    setTheme(newTheme);
  };

  const value = { theme, setTheme: updateTheme };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
export default ThemeProvider;