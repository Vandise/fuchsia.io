import * as dom from "../../util/dom";

const g = dom.globals;
const OUTPUT_DIV_ID = "writeOutput";

g.document.write = (text) => {
  const el = document.getElementById(OUTPUT_DIV_ID);
  if (null != el) {
    el.innerHTML = text;
  }
};

g.write = (text) => {
  g.document.write(text);
}