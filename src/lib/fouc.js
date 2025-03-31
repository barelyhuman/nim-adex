export const script = `
    const getMatcher = () => window.matchMedia("(prefers-color-scheme: dark)");

const getSystemTheme = () => {
  const isDark = getMatcher().matches;
  return isDark ? "dark" : "light";
};

    const el = document.documentElement
    el.dataset.theme = getSystemTheme()
    el.style.colorScheme = getSystemTheme()
    
`
