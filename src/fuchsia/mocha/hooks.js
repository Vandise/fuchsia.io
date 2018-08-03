import * as dom from "../../util/dom";

const MOCHA_ID = "mocha";
const SPEC_DIV_ID = "labSpecs";
const USER_CODE_RUN_ID = "userCodeExe";

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
  dom.globals.document.getElementById(MOCHA_ID).innerHTML = "";
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

    const lastRun = dom.globals.document.getElementById(USER_CODE_RUN_ID);
    if (null != lastRun) {
      lastRun.parentNode.removeChild(lastRun);
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = USER_CODE_RUN_ID;
    script.innerHTML = dom.globals.fuchsia.editor.getValue();
    script.innerHTML += "\nfuchsia.loadedUserScript = true;";
    (dom.globals.document.getElementsByTagName("head")[0]).appendChild(script);
  });
};