import testSuite from "../../../../fuchsia/mocha/setup";
const { td, dom, sinon } = testSuite;

const globals = dom.globals;

describe("Lab 1: Hello JavaScript!", () => {

  beforeEach(() => {
    td.replace(globals, "write", sinon.spy());
    return globals.fuchsia.loadUserScript();
  });

  afterEach(() => {
    td.reset();
  });

  it("calls the 'write()' function", () => {
    expect(globals.write).to.have.been.called;
  });

  it("calls the 'write()' function with \"Hello JavaScript!\"", () => {
    expect(globals.write).to.have.been.calledWith("Hello JavaScript!");
  });
});