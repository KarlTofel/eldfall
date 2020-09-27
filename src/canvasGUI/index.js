import drawingModuleFactory from './draw';
import layerModule from './layer';

const drawingModule = drawingModuleFactory();

export default function canvasGUI($htmlElement) {
    return {
        drawARectangle: (layer, rectangle) => {
            drawingModule.drawRectangle(layer, rectangle);
        },
        createLayer: (height, width, className) => {
            return layerModule().createLayer($htmlElement, height, width, className);
        },
        rectangle: (x, y, a, b, size, rotation, colour)=> {
            return drawingModule.rect(x, y, a, b, size, rotation, colour);
        }
    }
}