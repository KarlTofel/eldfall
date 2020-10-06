import { JSDOM } from 'jsdom';
import { expect } from 'chai';

import canvasGUI from '../../src/canvasGUI/index';

const dom = new JSDOM('<!doctype html><html><body><div></div></body></html>');
const document = dom.window.document;
// createDOM();


describe('createCanvas test', () => {
    it('the height and width have to match the parameters given (height: 123, width: 432, class: createCanvasTest)', () => {
        const c = canvasGUI(document).createLayer(123, 432, 'createCanvasTest');
        expect(c.height).to.equal(123);
        expect(c.width).to.equal(432);
        expect(c.className).to.equal('createCanvasTest');
    });
});
describe('drawRectangle test', () => {
    it('draw shapes on two canvases(first: inbuilt js functions, second: drawRectangle) compare canvases and if they match', () => {
        // using createLayer under asumption that it works (tested before)
        const c1 = canvasGUI(document).createLayer(10, 10, '');
        const c2 = canvasGUI(document).createLayer(10, 10, '');
        // manualy draw a rectangle
        const ctx = c2.getContext('2d');
        ctx.fillStyle = "red";
        ctx.fillRect(1, 1, 9, 9);
        ctx.stroke();
        // rectangle starts has upper left in 1, 1 and bottom right in 8, 8
        // draw same rectangle with drawRectangle
        const square = canvasGUI().rectangle(5.5, 5.5, 9, 9, 1, 0, 'red');
        canvasGUI().drawARectangle(c1, square);
        // the following will get the data on the canvases wich we will then compare pixel for pixel
        const pixels = (canvas) => {
            // returns an array of the pixels
            return canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
        };
        const p1 = pixels(c1);
        const p2 = pixels(c2);
        // runs a loop that compares the values of pixel arrays
        const compare = p1.every((val, index) => val === p2[index]);
        expect(compare).to.be.true;
    })
})
describe('drawRectangle test size', () => {
    it('draw shapes on two canvases(first: inbuilt js functions, second: drawRectangle) compare canvases and if they match', () => {
        const c1 = canvasGUI(document).createLayer(10, 10, '');
        const c2 = canvasGUI(document).createLayer(10, 10, '');
        // halve the size;
        const size = 0.5;
        const ctx = c2.getContext('2d');
        ctx.fillStyle = "red";
        // a = 5 and b = 7
        ctx.fillRect(1, 1, 5, 7);
        ctx.stroke();
        // a = 5 * 2, b = 7 * 2
        const square = canvasGUI().rectangle(3.5, 4.5, 10, 14, size, 0, 'red');
        canvasGUI().drawARectangle(c1, square);
        const pixels = (canvas) => {
            return canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
        };
        const p1 = pixels(c1);
        const p2 = pixels(c2);
        const compare = p1.every((val, index) => val === p2[index]);
        expect(compare).to.be.true;
    })
})
describe('drawRectangle test rotation', () => {
    it('draw shapes on two canvases(first: inbuilt js functions, second: drawRectangle) compare canvases and if they match', () => {
        const c1 = canvasGUI(document).createLayer(10, 10, '');
        const c2 = canvasGUI(document).createLayer(10, 10, '');
        // rotation is an inbuilt canvas feature but it rotates at the top left corner, so a modified method is used
        const size = 0.5;
        const rotation = 90;
        const ctx = c2.getContext('2d');
        ctx.fillStyle = "red";
        // rotate around centre clockwise
        // a = 5, b = 7 rotate by 90 a = 7, b = 5
        // upperLeft rotates form 1, 1 to 
        // 0, 2
        ctx.fillRect(0, 2, 7, 5);
        ctx.stroke();
        const square = canvasGUI().rectangle(3.5, 4.5, 10, 14, size, rotation, 'red');
        canvasGUI().drawARectangle(c1, square);
        const pixels = (canvas) => {
            return canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
        };
        const p1 = pixels(c1);
        const p2 = pixels(c2);
        const compare = p1.every((val, index) => val === p2[index]);
        expect(compare).to.be.true;
    })
})