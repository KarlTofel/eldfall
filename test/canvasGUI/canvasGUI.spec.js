import { JSDOM } from 'jsdom';
import { expect } from 'chai';

// import mainFn from '../src/index';

const dom = new JSDOM('<!doctype html><html><body><div></div></body></html>');
const document = dom.window.document;
// createDOM();

describe('An example test', () => {
  it('should return 3', () => {
    // const result = mainFn();
    // expect(3).to.equal(3);
    dom.window.document.createElement('DIV');
  });
});