import { makeDraggable } from "./lib/makeDraggable.js";
import { Alaram, Gallery, Home, Memo, Header } from "./components/index.js";
import preloadImage from "./lib/preload.js";
import "./style/style.css";
import ImgsSrc from "./static/images";

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};
let ImageArray = [];
const router = () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/memo", view: Memo },
    { path: "/alaram", view: Alaram },
    { path: "/gallery", view: Gallery },
  ];
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.result);

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view();

  document.querySelector("#app-contents-container").innerHTML = view.getHtml();

  switch (location.pathname) {
    case "/": {
      makeDraggable();
      break;
    }

    case "/memo": {
      view.assignEventListener();
      break;
    }

    case "/alaram": {
      const updownButtons = document.querySelectorAll(".up-down-button button");
      const alaramAddButton = document.querySelector("#alaram-add-button");
      alaramAddButton.onclick = view.onInsertAlaram;
      for (let x of updownButtons) {
        x.onclick = view.onChangeTimer;
      }
      view.renderAlaramList();
      break;
    }

    case "/gallery": {
      view.loadImage(ImageArray);
      view.dispatchEventListener();
      break;
    }

    default:
      break;
  }
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[app-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});

window.onload = async () => {
  new Header().updateClock();
  new Alaram().alaramChecker();
  ImageArray = await preloadImage([...ImgsSrc]);
};
