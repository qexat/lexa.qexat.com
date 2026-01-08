import { Maybe } from "/src/js/maybe.js";

/**
 * Same as `document.getElementById`, but throw an exception
 * if the element could not be found.
 * @param {string} elementId
 * @returns {HTMLElement}
 */
export function getElementByIdOrThrow(elementId) {
  return Maybe.fromNull(document.getElementById(elementId)).orThrow(
    TypeError(`could not find element with id '${elementId}'`)
  );
}
