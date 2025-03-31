/**
 * @typedef {Object} EggTrigger
 * @property {string} selectors
 * @property {keyof HTMLElementEventMap} type
 * @property {(currentValue: string | null) => string} setter
 * @property {boolean} preventDefault
 */
/**
 * @typedef {Object} Egg
 * @property {string} id
 * @property {string} key
 * @property {EggTrigger} trigger
 * @property {(value: string) => void} implementation
 */

/**
 * Append a stylesheet to the page.
 * @param {string} name
 * @returns {void}
 */
function addStylesheet(name) {
  const link = document.createElement("link");
  link.setAttribute("type", "text/css");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", `src/css/${name}.css`);
  link.id = `style-egg-${name}`;

  const head = document.querySelector("head");
  head.appendChild(link);
}

/**
 * Remove a stylesheet from the page.
 * @param {string} name
 * @returns {void}
 */
function removeStylesheet(name) {
  const link = document.querySelector(`link#style-egg-${name}`);

  if (link !== null) {
    link.remove();
  }
}

/**
 * Registered easter eggs.
 * @type {Egg[]}
 */
const eggs = [
  {
    id: "tv",
    key: "tv",
    trigger: {
      type: "click",
      selectors: "#toggle-tv",
      setter: (currentValue) => {
        if (currentValue === "enabled") {
          return "disabled";
        } else {
          return "enabled";
        }
      },
      preventDefault: true,
    },
    implementation: (value) => {
      if (value === "enabled") {
        addStylesheet("tv");
      } else {
        removeStylesheet("tv");
      }
    },
  },
];

/**
 * Initialize easter eggs based on local storage.
 */
function initEggs() {
  eggs.forEach(({ id, key, trigger, implementation }) => {
    const triggerElement = document.querySelector(trigger.selectors);
    const value = localStorage.getItem(key);

    if (triggerElement !== null) {
      triggerElement.addEventListener(trigger.type, (event) => {
        if (trigger.preventDefault) {
          event.preventDefault();
        }

        const newValue = trigger.setter(localStorage.getItem(key));
        localStorage.setItem(key, newValue);
        implementation(newValue);
      });
    }

    if (value !== null) {
      implementation(value);
    }

    console.log(`Easter egg '${id}' initialized.`);
  });
}

/**
 * Entry point of the script.
 */
function main() {
  initEggs();
}

main();
