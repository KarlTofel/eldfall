import canvasGUI from './canvas';
function rotateCoordinate(point, rotation) {
    var rad = (rotation * Math.PI / 180).toFixed(2);
    var sin = (Math.sin(rad)).toFixed(2);
    var cos = (Math.cos(rad)).toFixed(2);
    var x = (cos * point.x - sin * point.y).toFixed(2);
    var y = (Number(sin * point.x) + Number(cos * point.y)).toFixed(2);
    return { x: Number(x), y: Number(y) }
}
function rotateCorners(corners, rotation) {
    var newArray = [];
    for (let i = 0; i < corners.length; i++) {
        newArray.push(rotateCoordinate(corners[i], rotation));
    }
    return newArray;
}
const writtenObstacle = (x, y, height, size, corners, rotation) => {
    return {
        position: {
            x: x,
            y: y
        },
        height: height,
        size: size,
        shape: corners,
        rotation: rotation
    }
};
function sortByHeight(array) {
    return array.sort((a, b) => (a.height > b.height) ? 1 : -1);
}
function resize(corner, size) {
    return canvasGUI.point(corner.x * size, corner.y * size);
}
function heightIntoHue(height) {
    return rgbColour(shiftHue(height, 1, 0), shiftHue(height, 5, 1), shiftHue(height, 20, 5));
}
function shiftHue(height, upperLimit, lowerLimit) {
    if (height >= upperLimit || height < lowerLimit) {
        return 0;
    } else {
        let hue = 0;
        var h = height;
        while (h >= 0) {
            hue++;
            h = h - upperLimit / 5;
        }
        return 155 + hue * 20;
    }
}
const rgbColour = (red, green, blue) => "rgb(" + red + ", " + green + ", " + blue + ")";
function writtenIntoDisplay(obstacle) {
    var corners = rotateCorners(obstacle.shape, obstacle.rotation);
    // for (i = 0; i < corners.length; i++) {
    //     corners[i] = resize(corners[i]);
    //     corners[i].x += obstacle.position.x;
    //     corners[i].y += obstacle.position.y;
    // }
    const forSomeReasonevenMoreChangedCorners = corners.map((corner) => {
        let newCorner = resize(corner, obstacle.size);
        newCorner.x += obstacle.position.x;
        newCorner.y += obstacle.position.y;
        return newCorner;
    })
    var colour = heightIntoHue(obstacle.height);
    return canvasGUI.displayObstacle(forSomeReasonevenMoreChangedCorners, colour);
}


const basicShapes = {
    oneByOneRect: [
        canvasGUI.point(-5, 5),
        canvasGUI.point(-5, -5),
        canvasGUI.point(5, -5),
        canvasGUI.point(5, 5)
    ],
    twoByOneRect: [
        canvasGUI.point(-10, 5),
        canvasGUI.point(-10, -5),
        canvasGUI.point(10, -5),
        canvasGUI.point(10, 5)
    ],
    onByOneTriangle: [
        canvasGUI.point(-5, 5),
        canvasGUI.point(-5, -5),
        canvasGUI.point(5, -5)
    ]
}
export default {
    rotateCoordinate,
    rotateCorners,
    resize,
    writtenObstacle,
    writtenIntoDisplay,
    heightIntoHue,
    sortByHeight,
    basicShapes
}