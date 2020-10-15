import { expect } from 'chai';
import sights from '../../src/lineOfSight/index';

describe('hasVisual test 1', () => {
    it('observer should see target', () => {
        const observer = sights().observer(0, 10, 10);
        // target is in front of observer
        const target = sights().target(2, 2, 20, 10);
        const obstacles = [];
        const result = sights().hasVisuals(observer, target, obstacles);
        expect(result).to.equal(100);
    })
});
describe('hasVisual test 2', () => {
    it('observer should see target', () => {
        const observer = sights().observer(0, 10, 10);
        // target is in front (and sligthly to the left) of observer
        const target = sights().target(2, 2, 20, 15);
        const obstacles = [];
        const result = sights().hasVisuals(observer, target, obstacles);
        expect(result).to.equal(100);
    })
});
describe('hasVisual test 3', () => {
    it('observer should not see target', () => {
        const observer = sights().observer(0, 10, 10);
        // target is in behind the observer
        const target = sights().target(2, 2, 0, 10);
        const obstacles = [];
        const result = sights().hasVisuals(observer, target, obstacles);
        expect(result).to.equal(0);
    })
});
describe('hasVisual test 4', () => {
    it('observer should see half of the target', () => {
        const observer = sights().observer(0, 10, 10);
        // target is on the edge of periphery
        const target = sights().target(2, 2, 10, 20);
        const obstacles = [];
        const result = sights().hasVisuals(observer, target, obstacles);
        expect(result).to.equal(50);
    })
});
describe('hasVisual test 5', () => {
    it('observer should see 66 percent of the target', () => {
        const observer = sights().observer(0, 10, 10);
        // target is on the edge of two thirds in the periphery
        const target = sights().target(3, 2, 10, 20);
        const obstacles = [];
        const result = sights().hasVisuals(observer, target, obstacles);
        console.log('result: ', result);
    })
});