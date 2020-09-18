import canvasGUI from './canvasGUI/canvas';
import advancedDrawings from './canvasGUI/advancedDrawings'

export default function main() {
  const firstLayer = canvasGUI.createLayer(480, 600);
  canvasGUI.drawAllObstacles(firstLayer, [advancedDrawings.writtenIntoDisplay(advancedDrawings.writtenObstacle(
    30, 50, 18, 3, advancedDrawings.basicShapes.oneByOneRect, 0
  ))]);
  console.log(firstLayer);
  return 3;
}
// main();