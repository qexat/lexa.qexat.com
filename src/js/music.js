import { getElementByIdOrThrow } from "/src/js/utils.js";

/** @type {HTMLAudioElement} */
// @ts-expect-error
const bgMusic = getElementByIdOrThrow("bg-music");

bgMusic.volume = 0;

/** @type {HTMLButtonElement} */
// @ts-expect-error
export const playButton = getElementByIdOrThrow("play-button");

/**
 * Start playing `element` with a linear fade in that lasts
 * `duration` milliseconds. If `element` is already playing,
 * this is a no-op.
 * @param {HTMLMediaElement} element
 * @param {number} duration - a non-negative number.
 * @param {number} finalVolume - a number between 0 and 1.
 */
async function fadeInStart(element, duration, finalVolume) {
  if (!(0.0 <= finalVolume && finalVolume <= 1.0)) {
    throw TypeError("finalVolume must be a number between 0 and 1");
  }

  if (duration < 0.0) {
    throw TypeError("duration must be non-negative");
  }

  if (!element.paused) {
    return;
  }

  const steps = duration / 50;

  element.volume = 0.0;
  await element.play();

  // If we don't special-case, steps will be equal to 0
  if (duration === 0.0) {
    element.volume = finalVolume;
    return;
  }

  for (let i = 0; i < steps; i++) {
    await new Promise((r) =>
      setTimeout(() => {
        element.volume = (finalVolume * i) / steps;
        r();
      }, duration / steps)
    );
  }
}

/**
 * Stop playing `element` with a linear fade in that lasts
 * `duration` milliseconds. If `element` is not playing, this
 * is a no-op.
 * @param {HTMLMediaElement} element
 * @param {number} duration - a non-negative number.
 */
async function fadeOutStop(element, duration) {
  if (duration < 0.0) {
    throw TypeError("duration must be non-negative");
  }

  if (element.paused) {
    return;
  }

  const originalVolume = element.volume;
  const steps = duration / 50;

  // If we don't special-case, steps will be equal to 0
  if (duration === 0.0) {
    element.pause();
    return;
  }

  for (let i = steps; i >= 0; i--) {
    bgMusic.volume = (originalVolume * i) / steps;
    await new Promise((r) => setTimeout(r, duration / steps));
  }

  element.pause();
}

playButton.addEventListener("click", async (event) => {
  if (playButton.dataset.state === "play") {
    playButton.innerHTML = "&#x23F8";
    playButton.dataset.state = "pause";

    await fadeInStart(bgMusic, 250, 0.7);
  } else if (playButton.dataset.state === "pause") {
    playButton.innerHTML = "&#x23F5;";
    playButton.dataset.state = "play";

    await fadeOutStop(bgMusic, 250);
  }
});
