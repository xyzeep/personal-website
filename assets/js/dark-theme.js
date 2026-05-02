const options = document.getElementById("dark-theme-script")?.dataset;
const defaultTheme = options?.defaultTheme ?? "light";
const enableAutoDetectTheme =
    options?.enableAutoDetectTheme?.toLowerCase() === "true";
const darkThemeMatch = window.matchMedia(
    "(prefers-color-scheme: dark)" +
    (defaultTheme === "light" ? "" : ",(prefers-color-scheme: no-preference)")
);
const detectThemeAndSwitchStyle = () => {
    let theme = localStorage.getItem("themeOverride");
    if (theme !== "light" && theme !== "dark") {
        if (theme === "browser" || enableAutoDetectTheme) {
            theme = darkThemeMatch.matches ? "dark" : "light";
        } else {
            theme = defaultTheme;
        }
    }
    const body = document.body;
    if (theme === "dark") {
        body.classList.add("dark-theme");
        body.classList.remove("light-theme");
    } else {
        body.classList.add("light-theme");
        body.classList.remove("dark-theme");
    }
};
detectThemeAndSwitchStyle();
window.theme = {
    switch: (themeOverride) => {
        localStorage.setItem("themeOverride", themeOverride);
        detectThemeAndSwitchStyle();
    },
};
if (enableAutoDetectTheme) {
    darkThemeMatch.addEventListener("change", detectThemeAndSwitchStyle);
}
const themeSwitcher = document.getElementById("theme-switcher");
if (themeSwitcher) {
  const moon = document.getElementById("icon-moon");
  const sun = document.getElementById("icon-sun");

  const updateIcon = () => {
    const isDark = document.body.classList.contains("dark-theme");
    moon.style.display = isDark ? "none" : "";
    sun.style.display = isDark ? "" : "none";
  };

  updateIcon();

  themeSwitcher.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-theme");
    window.theme.switch(isDark ? "light" : "dark");
    updateIcon();
  });
}
