import { Maybe } from "/src/js/maybe.js";

/**
 * @typedef {(data: string) => string} PostprocessFunction
 */

/** @typedef 
  { {tag: "Goto", url: string}
  | {tag: "Postprocess", fn: PostprocessFunction}
  | {tag: "Alert", message: string}
  } Action
 */

/**
 * @param {string} url
 * @returns {Action}
 */
function Goto(url) {
  return { tag: "Goto", url };
}

/**
 * @param {PostprocessFunction} fn
 * @returns {Action}
 */
function Postprocess(fn) {
  return { tag: "Postprocess", fn };
}

/**
 * @param {string} message
 * @returns {Action}
 */
function Alert(message) {
  return { tag: "Alert", message };
}

class Buffer {
  constructor() {
    /**
     * @private
     * @type {string[]} */
    this.internal = [];
  }

  /**
   * @param {string} character
   * @returns {void}
   */
  push(character) {
    this.internal.push(character.toLowerCase());
  }

  /**
   * @returns {void}
   */
  removeLast() {
    this.internal.pop();
  }

  /**
   * @returns {void}
   */
  clear() {
    this.internal = [];
  }

  /**
   * @returns {boolean}
   */
  isEmpty() {
    return this.internal.length === 0;
  }

  /**
   * @returns {string}
   */
  get() {
    return this.internal.join("");
  }
}

const buffer = new Buffer();
const dynInput = Maybe.fromNull(document.getElementById("dyn-input")).orThrow(
  TypeError("unable to fetch dyn-input")
);
const dynTip = Maybe.fromNull(document.getElementById("dyn-tip")).orThrow(
  TypeError("unable to fetch dyn-tip")
);

const baseTitle = dynInput.innerHTML;
const baseTip = dynTip.innerHTML;

/**
 * Determine the action to take given the buffer.
 * @param {string} bufferString
 * @returns {Action}
 */
function getActionFromBuffer(bufferString) {
  switch (bufferString) {
    /* -*- Redirections -*- */

    // Links
    case "bear":
    case "blog":
      return Goto("https://qexat.bearblog.dev/blog");
    case "bsky":
    case "bluesky":
    case "twitter":
    case "microblog":
      return Goto("https://bsky.app/profile/lesbianmonad.com");
    case "kofi":
    case "crowdfunding":
    case "onlyfans":
    case "mym":
    case "nudes":
    case "porn":
      return Goto("https://ko-fi.com/qexat");
    case "codeberg":
    case "forge":
      return Goto("https://codeberg.org/qexat");
    case "qexat":
      return Goto("https://qexat.com");
    case "twitch":
    case "lesbianmonad":
      return Goto("https://twitch.tv/lesbianmonad");
    case "discord":
    case "flaaffy":
      return Goto("https://discord.gg/rfRTUxU9kP");
    case "os":
    case "operating system":
    case "arch":
    case "linux":
      return Goto("https://endeavouros.com/");

    // Deprecated/to change
    case "gh":
    case "github":
      return Goto("https://github.com/qexat");
    case "source":
    case "src":
      return Goto("https://github.com/qexat/lexa.qexat.com");

    // Cool people
    case "akhil":
    case "akhil indurti":
      return Goto("https://akhil.cc");
    case "amos wenger":
    case "fasterthanlime":
      return Goto("https://fasterthanli.me");
    case "blueberry":
    case "wren":
      return Goto("https://blueberrywren.dev");
    case "bob nystrom":
    case "stuffwithstuff":
      return Goto("https://stuffwithstuff.com");
    case "emma":
      return Goto("https://emmatyping.dev");
    case "fox":
    case "slavfox":
      return Goto("https://slavfox.space");
    case "freya holmer":
    case "acegikmo":
      return Goto("https://acegikmo.com");
    case "jeanheyd meneide":
    case "thephd":
      return Goto("https://thephd.dev");
    case "kamila szewczyk":
    case "iczelia":
    case "palaiologos":
      return Goto("https://iczelia.net");
    case "louis pilfold":
    case "lpil":
      return Goto("https://lpil.uk");
    case "lyna":
    case "blooym":
      return Goto("https://blooym.dev");
    case "melody":
      return Goto("https://melody.codes");
    case "monomere":
    case "julia":
      return Goto("https://monomere.cc");
    case "ryan":
      return Goto("https://ryanbrewer.dev");
    case "lemmie":
      return Goto("https://lemmie.art");
    case "uakci":
      return Goto("https://uakci.space");

    // Easter eggs/misc
    case "bds":
    case "israel":
    case "palestine":
    case "boycott":
      return Goto("https://bdsmovement.net/Guide-to-BDS-Boycott");
    case "brainmade":
      return Goto("https://brainmade.org");
    case "cat":
      return Goto("https://en.wikipedia.org/wiki/Category_theory");
    case "job":
      return Goto("https://www.youtube.com/watch?v=A8LHLbuhS9Y");
    case "ocaml":
      return Goto("https://ocaml.org");
    case "uiua":
      return Goto("https://uiua.org");
    case "spotify":
      return Goto("https://www.youtube.com/watch?v=DO6seG5_IB8");
    case "aaaaaaaaaaaaaaaaaaaaaaaa":
      return Goto("https://www.youtube.com/watch?v=yBLdQ1a4-JI");
    case "     ":
      return Goto("https://www.nytimes.com/games/wordle/index.html");

    /* -*- Text replacements -*- */
    // Info
    case "pronouns":
      return Postprocess((data) => "they/she");
    case "name":
      return Postprocess((data) => "Clarisse");

    // Funsies
    case "date":
      return Postprocess((data) =>
        new Intl.DateTimeFormat().format(new Date(Date.now()))
      );
    case "the meaning of life":
      return Postprocess((data) => "42");
    case "password":
      return Postprocess((data) => "********");
    case "french":
      return Postprocess((data) => "fr*nch");
    case "ester":
      return Postprocess((data) => "enanthate");
    case "camelcase":
      return Postprocess((data) => "snake_case");
    case "warning":
      return Postprocess((data) => "error");
    case "lexa":
      return Postprocess((data) => "out of ideas?");

    /* -*- Actions -*- */
    case "hello":
      return Alert("hi!");

    default:
      return Postprocess((data) => data.replaceAll(" ", "_"));
  }
}

window.addEventListener("keydown", (event) => {
  // escape
  if (event.keyCode === 27) {
    buffer.clear();
  }
  // backspace
  else if (event.keyCode === 8) {
    buffer.removeLast();
  }
  // A-Z or space
  else if (
    (65 <= event.keyCode && event.keyCode <= 90) ||
    event.keyCode === 32
  ) {
    buffer.push(event.key);
  }

  const bufferString = buffer.get();

  if (buffer.isEmpty()) {
    dynInput.innerHTML = baseTitle;
    dynTip.innerHTML = baseTip;
  } else {
    dynInput.innerHTML = bufferString;
    dynTip.innerHTML = "Press Escape to cancel.";
  }

  const action = getActionFromBuffer(bufferString);

  /** @type {PostprocessFunction} */
  let postprocess = (s) => s;

  switch (action.tag) {
    case "Goto":
      dynInput.style.color = "var(--green)";
      setTimeout(() => {
        buffer.clear();
        dynInput.style.color = "unset";
        document.location.assign(action.url);
      }, 500);
      break;
    case "Postprocess":
      postprocess = action.fn;
      break;
    case "Alert":
      buffer.clear();
      alert(action.message);
      break;
  }

  if (!buffer.isEmpty()) {
    dynInput.innerHTML = postprocess(bufferString);
  }
});
