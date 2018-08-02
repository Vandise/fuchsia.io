import "mocha/mocha.js";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiString from "chai-string";
import sinonChai from "sinon-chai";
import sinon from "sinon";
import td from "testdouble";
import * as dom from "../../util/dom";

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiString);

dom.globals.expect = chai.expect;
dom.globals.sinon = sinon;
dom.globals.chai = chai;
dom.globals.td = td;

dom.globals.mocha.setup('bdd');

describe("The unit tests", () => {
  it("are loaded", () => {
    const spy = sinon.spy();
    spy();
    expect(spy).to.have.been.called;
  });
});