import drawingModuleFactory from './draw';
import layerModule from './layer';

const drawingModule = drawingModuleFactory();

export default function ($htmlElement) {
    return {
        drawARectangle: (layer, corners, color) => {
            drawingModule.drawRectangle(layer, corners, color);
        },
        createLayer: (height, width) => {
            return layerModule($htmlElement, height, width)
        }
    }
}