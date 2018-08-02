import testSuite from "../../../../fuchsia/mocha/setup";
const { td, dom, sinon } = testSuite;

const globals = dom.globals;

describe("Lab 1: Hello JavaScript!", () => {

  beforeEach(() => {
    globals.write = sinon.spy();
    return globals.fuchsia.loadUserScript();
  });

  it("calls the 'write()' function", () => {
    expect(globals.write).to.have.been.called;
  });
});