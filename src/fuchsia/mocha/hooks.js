import * as dom from "../../util/dom";

const MOCHA_ID = "mocha";
const SPEC_DIV_ID = "labSpecs";
const USER_CODE_ID = "userCode"

dom.globals.fuchsia.resetTests = () => {
  dom.globals.mocha.suite.suites = [];

  let labSpecs = document.getElementById(SPEC_DIV_ID);
  let specSrc = null;
  if (labSpecs) {
    specSrc = labSpecs.src;
    labSpecs.remove();
  }

  labSpecs = document.createElement("script");
  labSpecs.src = specSrc;
  labSpecs.async = false;
  labSpecs.id = SPEC_DIV_ID;
  document.body.appendChild(labSpecs);
};

dom.globals.fuchsia.runTests = () => {
  document.getElementById(MOCHA_ID).innerHTML = "";
  dom.globals.mocha.run(() => {
    dom.globals.fuchsia.resetTests();
  });
};

dom.globals.fuchsia.loadUserScript = () => {
  dom.globals.fuchsia.loadedUserScript = false;
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (dom.globals.fuchsia.loadedUserScript) {
        resolve();
      }
    }, 100);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = dom.globals.document.getElementById(USER_CODE_ID).value;
    script.innerHTML += "fuchsia.loadedUserScript = true;";
    (dom.globals.document.getElementsByTagName("head")[0]).appendChild(script);
  });
};