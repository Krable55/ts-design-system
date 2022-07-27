import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// @ts-ignore: Only a void function can be called with the 'new' keyword
Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

chai.use(sinonChai);
chai.use(chaiEnzyme());

// Taken from https://gist.github.com/scmx/d98cc058a7c3dfef7890

// Since react will console.error propType warnings, that which we'd rather have
// as errors, we use sinon.js to stub it into throwing these warning as errors
// instead.

// @ts-ignore: 2304
beforeAll(() => {
  sinon.stub(console, 'error').callsFake(warning => {
    // Runs tests as react 17. Will need to be updated eventually
    if (/Warning: ReactDOM.render is no longer supported in React 18./.test(warning)) {
      return;
    }
    throw new Error(warning);
  });
});
