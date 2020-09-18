console.log("createLayer test");
const c = createLayer(100, 100);
if (c.width == 100 && c.height == 100) {
    console.log("%c   passed", "color: green");
    document.body.removeChild(c);
} else {
    console.warn(" width is ", c.width, ". height is ", c.height);
}
function compareCanvases(canvas1, canvas2) {
    const ctx = canvas1.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas1.width, canvas1.height);
    const canvas1Pixels = imageData.data;
    const context = canvas2.getContext("2d");
    const canvas2Data = context.getImageData(0, 0, canvas2.width, canvas2.height);
    const canvas2Pixels = canvas2Data.data;
    for (var i = 0, il = canvas1Pixels.length; i < il; i++) {
        if (canvas1Pixels[i] != canvas2Pixels[i]) {
            return false;
        }
    }
    return true;
}
function drawObstacleTest(x1, x2, x3, y1, y2, y3, testNumber) {
    const c1 = createLayer(50, 50);
    const ctx = c1.getContext("2d");
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
    const c2 = createLayer(50, 50);
    drawObstacle(c2, { corners: [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }], colour: "red" });
    console.log("drawObstacle test", testNumber);
    if (compareCanvases(c1, c2)) {
        document.body.removeChild(c1);
        document.body.removeChild(c2);
        console.log("%c   passed", "color: green");
    } else {
        console.warn("  failed");
    }
}
drawObstacleTest(5, 25, 45, 5, 45, 5, 1);
drawObstacleTest(5, 5, 45, 5, 45, 25, 2);
function drawAllObstaclesTest(testNumber) {
    const c1 = createLayer(50, 50);
    drawObstacle(c1, { corners: [{ x: 1, y: 1 }, { x: 1, y: 9 }, { x: 9, y: 9 }], colour: "red" });
    drawObstacle(c1, { corners: [{ x: 49, y: 6 }, { x: 21, y: 3 }, { x: 7, y: 2 }], colour: "green" });
    const c2 = createLayer(50, 50);
    drawAllObstacles(c2, [{ corners: [{ x: 1, y: 1 }, { x: 1, y: 9 }, { x: 9, y: 9 }], colour: "red" }, { corners: [{ x: 49, y: 6 }, { x: 21, y: 3 }, { x: 7, y: 2 }], colour: "green" }]);
    console.log("drawAllObstacles test", testNumber);
    if (compareCanvases(c1, c2)) {
        document.body.removeChild(c1);
        document.body.removeChild(c2);
        console.log("%c   passed", "color: green");
    } else {
        console.warn("  failed");
    }
}
drawAllObstaclesTest(1);
function rotateTest(x1, y1, degree, x2, y2, testNumber) {
    var rotated = rotateCoordinate({ x: x1, y: y1 }, degree);
    console.log("rotateTest", testNumber);
    if (rotated.x == x2 && rotated.y == y2) {
        console.log("%c   passed", "color: green");
    } else {
        console.warn("  x is", Number(rotated.x), "but should be", x2);
        console.warn("  y is", Number(rotated.y), "but should be", y2);
    }
}
rotateTest(10, 0, 90, 0, 10, 1);
rotateTest(3, 4, 0, 3, 4, 2);
rotateTest(30, -21, 180, -30, 21, 3);
rotateTest(-6, -111, 270, -111, 6, 4);
rotateTest(1, 12, 360, 1, 12, 5);
rotateTest(1, 1, 45, 0, 1.41, 6)
var testingArray = [{ x: -30, y: 10 }, { x: 6, y: 12 }, { x: -9, y: -9 }];
var correctArray = [{ x: -10, y: -30 }, { x: -12, y: 6 }, { x: 9, y: -9 }];
function testRotateCorners(testingArray, rotation, correctArray) {
    console.log("testRotateCorners");
    var rotatedArray = rotateCorners(testingArray, rotation);
    console.log('In testRotateCorners', rotatedArray);
    if (JSON.stringify(rotatedArray) != JSON.stringify(correctArray)) {
        console.warn(JSON.stringify(rotatedArray), "is not", JSON.stringify(correctArray));
    }
    console.log("%c   passed", "color: green");
}
testRotateCorners(testingArray, 90, correctArray);
function testSortByHeight(unsortedArray, correctArray) {
    var sortedarray = sortByHeight(unsortedArray);
    console.log("sortByHeight test");
    for (i = 0; i < correctArray.length; i++) {
        var correctElement = JSON.stringify(correctArray[i]);
        var sortedElement = JSON.stringify(sortedarray[i]);
        if (correctElement != sortedElement) {
            console.warn("  failed: elements", i, "aren't matching: correct:", correctElement, ", sorted:", sortedElement);
        }
    }
    console.log("%c   passed", "color: green");
}
var arr1 = [
    writtenObstacle(0, 1, 1, 0, [], 0),
    writtenObstacle(0, 1, 10, 0, [], 0),
    writtenObstacle(0, 1, 0, 0, [], 0),
    writtenObstacle(0, 1, 1, 0, [], 0),
    writtenObstacle(0, 1, 6, 0, [], 0),
    writtenObstacle(0, 1, 0.3, 0, [], 0),
    writtenObstacle(0, 1, 3, 0, [], 0),
];
var arr2 = [
    writtenObstacle(0, 1, 0, 0, [], 0),
    writtenObstacle(0, 1, 0.3, 0, [], 0),
    writtenObstacle(0, 1, 1, 0, [], 0),
    writtenObstacle(0, 1, 1, 0, [], 0),
    writtenObstacle(0, 1, 3, 0, [], 0),
    writtenObstacle(0, 1, 6, 0, [], 0),
    writtenObstacle(0, 1, 10, 0, [], 0),
];
testSortByHeight(arr1, arr2);
function testResize(point, Height, correctpoint, testNumber) {
    var resizedpoint = resize(point, Height);
    console.log("resize test", testNumber);
    if (JSON.stringify(resizedpoint) == JSON.stringify(correctpoint)) {
        console.log("%c   passed", "color: green");
    } else {
        console.warn(resizedpoint.x, "should be", correctpoint.x);
        console.warn(resizedpoint.y, "should be", correctpoint.y);
    }
}
testResize(point(10, 10), 2, point(20, 20), 1);
testResize(point(0, -7), 1, point(0, -7), 2);
testResize(point(1070, 3), 0.5, point(535, 1.5), 3);
function testHeightIntoColour(input, correct, testNumber) {
    var output = heightIntoHue(input);
    console.log("heightIntohue test", testNumber);
    if (output == correct) {
        console.log("%c   passed", "color: green");
    } else {
        console.warn("output is", output, "but should be", correct);
    }
}
testHeightIntoColour(1, "rgb(0, 195, 0)", 1);
testHeightIntoColour(0.3, "rgb(195, 0, 0)", 2);
testHeightIntoColour(23, "rgb(0, 0, 0)", 3);
function testWrittenIntoDisplay(writtenObstacle, displayObstacle, testNumber) {
    var secondObstacle = writtenIntoDisplay(writtenObstacle);
    var a = JSON.stringify(secondObstacle);
    var b = JSON.stringify(displayObstacle);
    console.log("testWrittenIntoDisplay", testNumber);
    if (a == b) {
        console.log("%c   passed", "color: green");
    } else {
        console.warn(a, "should be", b);
    }
}
var twoByTwoRotatedTriangle = displayObstacle(
    [point(50, 50), point(40, 50), point(40, 40)],
    "rgb(255, 0, 0)"
)
testWrittenIntoDisplay(
    writtenObstacle(35, 35, 0.9, 2, basicShapes.onByOneTriangle, 90),
    twoByTwoRotatedTriangle,
    1
);