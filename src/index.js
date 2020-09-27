import canvasGUI from './canvasGUI/index';

function preform() {
  const c1 = canvasGUI(document).createLayer(50, 50, '');
  const c2 = canvasGUI(document).createLayer(50, 50, '');
  // rotation is an inbuilt canvas feature but it rotates at the top left corner, so a modified method is used
  const size = 1;
  const rotation = 90;
  const ctx = c2.getContext('2d');
  ctx.fillStyle = "red";
  // rotate around centre clockwise
  // a = 5, b = 7 rotate by 90 a = 7, b = 5
  // upperLeft rotates form 1, 1 to 
  // -3.5, -2.5
  ctx.fillRect(0, 2, 7, 5);

  ctx.stroke();
  const square = canvasGUI().rectangle(3.5, 4.5, 5, 7, size, rotation, 'red');
  canvasGUI().drawARectangle(c1, square);
}
// preform();
export default function main() {
  return 3;
}
// main();