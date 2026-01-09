import { getElementByIdOrThrow } from "/src/js/utils.js";
import { playButton } from "./music.js";

/**
 * @typedef {"main" | "about" | "links" | "people" | "credits"} contentBoxName
 */

/** @type {contentBoxName} */
let visibleContentBox = "main";

/** @type {contentBoxName[]} */
const contentBoxNameList = ["main", "about", "links", "people", "credits"];

/** @type {NodeListOf<HTMLButtonElement>} */
const externalButtonList = document.querySelectorAll("button.external-button");

/** @type {HTMLParagraphElement} */
// @ts-expect-error
const infobox = getElementByIdOrThrow("infobox-text");

/** @type {NodeListOf<HTMLButtonElement>} */
const mainMenuButtonList = document.querySelectorAll(
  "#contents-main .menu-button"
);

/** @type {HTMLButtonElement} */
// @ts-expect-error
const aboutButton = getElementByIdOrThrow("about-button");

/** @type {HTMLButtonElement} */
// @ts-expect-error
const linksButton = getElementByIdOrThrow("links-button");

/** @type {HTMLButtonElement} */
// @ts-expect-error
const peopleButton = getElementByIdOrThrow("people-button");

/** @type {HTMLButtonElement} */
// @ts-expect-error
const creditsButton = getElementByIdOrThrow("credits-button");

/**
 *
 * @param {HTMLParagraphElement} infobox
 * @param {HTMLButtonElement} button
 * @param {string} newText
 */
function makeButtonInfobox(infobox, button, newText) {
  const defaultText = infobox.innerHTML;

  button.addEventListener("focusout", (event) => {
    infobox.innerHTML = defaultText;
  });

  button.addEventListener("focusin", (event) => {
    infobox.innerHTML = newText;
  });
}

/**
 * Open the content box with the given `name` and hides the others.
 * @param {contentBoxName} name
 */
function showContentBox(name) {
  for (let boxName of contentBoxNameList) {
    const contentBox = getElementByIdOrThrow(`contents-${boxName}`);
    contentBox.style.opacity = "0";
    setTimeout(() => (contentBox.hidden = true), 500);
  }

  setTimeout(() => {
    const contentBoxToShow = getElementByIdOrThrow(`contents-${name}`);
    contentBoxToShow.hidden = false;
    setTimeout(() => (contentBoxToShow.style.opacity = "1"), 250);
  }, 500);

  visibleContentBox = name;
}

makeButtonInfobox(infobox, playButton, "Play or pause the background music.");
makeButtonInfobox(infobox, aboutButton, "Read info about me.");

makeButtonInfobox(
  infobox,
  linksButton,
  "The pages of various websites I'm on."
);

makeButtonInfobox(
  infobox,
  peopleButton,
  "Websites of cool people. You should visit them!"
);

makeButtonInfobox(
  infobox,
  creditsButton,
  "Credits for the various parts of this page."
);

for (let button of mainMenuButtonList) {
  button.addEventListener("click", (event) => {
    // @ts-expect-error
    showContentBox(button.id.replace("-button", ""));
  });
}

for (let button of externalButtonList) {
  button.addEventListener("click", (event) => {
    document.location.assign(button.dataset.href);
  });
}

for (let button of document.getElementsByClassName("go-back")) {
  button.addEventListener("click", (event) => {
    showContentBox("main");

    setTimeout(() => {
      /** @type {NodeListOf<HTMLButtonElement>} */
      const currentMenuButtonList = document.querySelectorAll(
        `#contents-${visibleContentBox} .menu-button`
      );

      for (let button of currentMenuButtonList) {
        button.style.animationName = "ButtonArriveAnim";
      }
    }, 500);
  });
}

showContentBox("main");
