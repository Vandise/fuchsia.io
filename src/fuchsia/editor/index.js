import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript.js";
import * as dom from "../../util/dom";

const USER_CODE_ID = "userCode";

const textArea = dom.globals.document.getElementById(USER_CODE_ID);
const editor = CodeMirror.fromTextArea(textArea, {
  value: "// write your code here! \n",
  mode: "javascript",
  lineNumbers: true,
  theme: "blackboard"
});