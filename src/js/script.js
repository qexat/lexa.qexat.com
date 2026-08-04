"use strict";

const DEFAULT_COLOR = "random";
const DEFAULT_FONT = "sansSerif";

const colors = {
  red: ["darkred", "lightcoral"],
  yellow: ["saddlebrown", "palegoldenrod"],
  green: ["green", "lightgreen"],
  cyan: ["teal", "aquamarine"],
  blue: ["blue", "lightblue"],
  purple: ["purple", "plum"],
  gray: ["darkslategray", "silver"],
}

const fonts = {
  sansSerif: ['"Host Grotesk"', "sans-serif"],
  serif: ['"Charis SIL"', "serif"],
  monospace: ['"Lilex"', "monospace"],
  dyslexic: ['"Atkison Hyperlegible"', "sans-serif"],
}

const colorNames = Object.keys(colors);
const fontNames = Object.keys(fonts);

function setColor(name) {
  localStorage.setItem("color", name);

  if (name === "random") {
    name = colorNames[Date.now() % colorNames.length];
  }

  const [light, dark] = colors[name];

  document.documentElement.style.setProperty(
    "--color-primary",
    `light-dark(${light}, ${dark})`,
  );
}

function setFont(name) {
  localStorage.setItem("font", name);

  const [fontName, fallback] = fonts[name];

  document.documentElement.style.setProperty(
    "--font-family",
    `${fontName}, ${fallback}`,
  );
}

function reset() {
  if (localStorage.length > 0) {
    localStorage.clear();
    setColor(DEFAULT_COLOR);
    setFont(DEFAULT_FONT);
  }
}

const currentColor = localStorage.getItem("color");
const currentFont = localStorage.getItem("font");

setColor(currentColor ?? DEFAULT_COLOR);
setFont(currentFont ?? DEFAULT_FONT);