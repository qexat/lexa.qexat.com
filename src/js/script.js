/** @type {string[]} */
let buffer = [];

let saidHi = false;

const dynInput = document.getElementById("dyn-input");
const dynTip = document.getElementById("dyn-tip");
const baseTitle = dynInput.innerHTML;
const baseTip = dynTip.innerHTML;

function getUrlFromBuffer(bufferString) {
  switch (bufferString) {
    case "bear":
    case "blog":
      return "https://qexat.bearblog.dev/blog";
    case "bsky":
    case "bluesky":
    case "twitter":
    case "microblog":
      return "https://bsky.app/profile/lesbianmonad.com";
    case "kofi":
    case "crowdfunding":
    case "onlyfans":
    case "of":
    case "mym":
    case "nudes":
    case "porn":
      return "https://ko-fi.com/qexat";
    case "codeberg":
    case "forge":
      return "https://codeberg.org/qexat";
    case "qexat":
      return "https://qexat.com";
    case "twitch":
    case "lesbianmonad":
      return "https://twitch.tv/lesbianmonad";
    case "discord":
    case "flaaffy":
      return "https://discord.gg/rfRTUxU9kP";
    case "os":
    case "operating system":
    case "arch":
    case "linux":
      return "https://endeavouros.com/";
    /* deprecated */
    case "gh":
    case "github":
      return "https://github.com/qexat";
    case "source":
    case "src":
      return "https://github.com/qexat/lexa.qexat.com";
    /* cool people */
    case "akhil":
    case "akhil indurti":
      return "https://akhil.cc";
    case "amos wenger":
    case "fasterthanlime":
      return "https://fasterthanli.me";
    case "blueberry":
    case "wren":
      return "https://blueberrywren.dev";
    case "bob nystrom":
    case "stuffwithstuff":
      return "https://stuffwithstuff.com";
    case "emma":
    case "emma smith":
      return "https://emmatyping.dev";
    case "fox":
    case "slavfox":
      return "https://slavfox.space";
    case "freya holmer":
    case "acegikmo":
      return "https://acegikmo.com";
    case "jeanheyd meneide":
    case "thephd":
      return "https://thephd.dev";
    case "kamila szewczyk":
    case "iczelia":
    case "palaiologos":
      return "https://iczelia.net";
    case "louis pilfold":
    case "lpil":
      return "https://lpil.uk";
    case "lyna":
    case "blooym":
      return "https://blooym.dev";
    case "melody":
      return "https://melody.codes";
    case "monomere":
    case "julia":
      return "https://monomere.cc";
    case "ryan":
    case "ryan brewer":
      return "https://ryanbrewer.dev";
    case "lemmie":
      return "https://lemmie.art";
    case "uakci":
      return "https://uakci.space";
    /* easter eggs */
    case "bds":
    case "israel":
    case "palestine":
    case "boycott":
      return "https://bdsmovement.net/Guide-to-BDS-Boycott";
    case "brainmade":
      return "https://brainmade.org";
    case "cat":
      return "https://en.wikipedia.org/wiki/Category_theory";
    case "job":
      return "https://www.youtube.com/watch?v=A8LHLbuhS9Y";
    case "ocaml":
      return "https://ocaml.org";
    case "uiua":
      return "https://uiua.org";
    case "spotify":
      return "https://www.youtube.com/watch?v=DO6seG5_IB8";
    case "aaaaaaaaaaaaaaaaaaaaaaaa":
      return "https://www.youtube.com/watch?v=yBLdQ1a4-JI";
    case "     ":
      return "https://www.nytimes.com/games/wordle/index.html";
    default:
      return null;
  }
}

function postprocessBuffer(bufferString) {
  return (
    bufferString
      /* info */
      .replaceAll("pronouns", "they/she")
      .replaceAll("name", "Clarisse")
      /* funsies */
      .replaceAll(
        "date",
        new Intl.DateTimeFormat().format(new Date(Date.now()))
      )
      .replaceAll("the meaning of life", "42")
      .replaceAll("password", "********")
      .replaceAll("french", "fr*nch")
      .replaceAll("ester", "enanthate")
      /* misc */
      .replaceAll(" ", "_")
  );
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 27) {
    buffer = [];
  } else if (event.keyCode === 8) {
    buffer.pop();
  } else if (
    (65 <= event.keyCode && event.keyCode <= 90) ||
    event.keyCode === 32
  ) {
    buffer.push(event.key);
  }

  buffer = buffer.map((s) => s.toLowerCase());

  const bufferString = buffer.join("");

  if (buffer.length > 0) {
    dynInput.innerHTML = postprocessBuffer(bufferString);
    dynTip.innerHTML = "Press Escape to cancel.";
  } else {
    dynInput.innerHTML = baseTitle;
    dynTip.innerHTML = baseTip;
  }

  const url = getUrlFromBuffer(bufferString);

  if (url !== null) {
    dynInput.style.color = "var(--green)";
    setTimeout(() => {
      document.location.assign(url);
      buffer = [];
      dynInput.style.color = "unset";
    }, 500);
  }

  if (bufferString === "hello" && !saidHi) {
    alert("hi!");
    saidHi = true;
    buffer = [];
  }
});
