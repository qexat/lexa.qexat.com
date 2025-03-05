/**
 * @typedef {Object} Egg
 * @property {string} id
 * @property {[string, string]} trigger
 * @property {() => void} implementation
 */

/**
 * Append a stylesheet to the page.
 * @param {string} name
 * @returns {void}
 */
function addStylesheet(name) {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = `src/css/${name}.css`;

  const head = document.querySelector("head");
  head.appendChild(link);
}

/**
 * Add an animation to the given `element`.
 * @param {HTMLElement} element
 * @param {string} name
 * @param {string} iteration_count
 * @param {string} duration
 * @param {string} timing_function
 */
function addAnimation(
  element,
  name,
  iteration_count,
  duration,
  timing_function
) {
  /**
   * Add an item to a property which value is a list in a string.
   * @param {string} property
   * @param {string} item
   * @returns {string}
   */
  const value_append = (property, item) => {
    if (property !== "") {
      property += ", ";
    }

    property += item;

    return property;
  };

  element.style.animationName = value_append(element.style.animationName, name);
  element.style.animationIterationCount = value_append(
    element.style.animationIterationCount,
    iteration_count
  );
  element.style.animationDuration = value_append(
    element.style.animationDuration,
    duration
  );
  element.style.animationTimingFunction = value_append(
    element.style.animationTimingFunction,
    timing_function
  );
}

/**
 * Registered easter eggs.
 * @type {Egg[]}
 */
const eggs = [
  {
    id: "crt",
    trigger: ["display", "crt"],
    implementation: () => {
      const body = document.body;

      addStylesheet("crt");
      addAnimation(body, "LineMoving", "infinite", "0.2s", "ease-in-out");
      addAnimation(body, "Blink", "infinite", "0.15s", "ease-in-out");
    },
  },
  {
    id: "rainbow",
    trigger: ["rainbow", "true"],
    implementation: () => {
      const elements = [
        ...document.querySelectorAll("a[href]"),
        ...document.querySelectorAll("code"),
        ...document.querySelectorAll("em"),
        ...document.querySelectorAll("h1"),
        ...document.querySelectorAll("span"),
      ];

      addStylesheet("rainbow");
      elements.forEach((element) =>
        addAnimation(element, "Rainbow", "infinite", "3s", "linear")
      );
    },
  },
  {
    id: "sans_serif_font",
    trigger: ["font", "sans-serif"],
    implementation: () => {
      addStylesheet("sans_serif");
    },
  },
];

/**
 * Activate eggs based on the URL search parameters.
 * @param {URLSearchParams} parameters
 */
function activateEggs(parameters) {
  eggs.forEach(({ id, trigger, implementation }) => {
    const [key, value] = trigger;

    if (parameters.get(key) === value) {
      console.log(`Easter egg '${id}' enabled.`);
      implementation();
    }
  });
}

/**
 * Entry point of the script.
 * @param {Window} window
 */
function main(window) {
  const parameters = new URLSearchParams(window.location.search);
  activateEggs(parameters);
}

main(window);
