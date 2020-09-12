function createLayer(height, width) {
    // ustvari canvas
    const canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;
    document.body.appendChild(canvas);
    return canvas;
}
// gre za najbolj osnoven nacin, ki pa je zmozen narisat karkoli s samo ravnicami
function drawObstacle(canvas, corners, colour) {
    // podas array z koordinatami kotov in barvo in ti narise
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    for (i = 1; i < corners.length; i++) {
        // loopa skozi vse kote
        var corner = corners[i];
        ctx.lineTo(corner.x, corner.y);
    }
    ctx.closePath();
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.stroke();
}
function logCorner(x, y) {
    return { x: x, y: y };
}
function drawAllObstacles(canvas, obstacles) {
    for (j = 0; j < obstacles.length; j++) {
        drawObstacle(canvas, obstacles[j][0], obstacles[j][1]);
    }
}
var smiley = [
    [[logCorner(50, 50), logCorner(50, 150), logCorner(100, 150), logCorner(100, 50)], "red"],
    [[logCorner(400, 50), logCorner(400, 150), logCorner(450, 150), logCorner(450, 50)], "yellow"],
    [[logCorner(25, 300), logCorner(225, 400), logCorner(475, 300)], "green"]
]
// tko zgleda zapis oblike
var T = [{ x: 6, y: 8 }, { x: 5, y: 32 }, { x: 9, y: 33 }, { x: 14, y: 11 }, { x: 20, y: 10 }, { x: 22, y: 6 }, { x: 1, y: 3 }]
var E = [{ x: 26, y: 8 }, { x: 24, y: 32 }, { x: 31, y: 33 }, { x: 32, y: 26 }, { x: 29, y: 23 }, { x: 29, y: 21 }, { x: 33, y: 20 }, { x: 34, y: 15 }, { x: 31, y: 8 }, { x: 37, y: 4 }]
var S = [{ x: 48, y: 5 }, { x: 42, y: 10 }, { x: 45, y: 15 }, { x: 45, y: 20 }, { x: 39, y: 23 }, { x: 36, y: 28 }, { x: 41, y: 29 }, { x: 44, y: 30 }, { x: 46, y: 30 }, { x: 47, y: 30 }, { x: 49, y: 28 }, { x: 49, y: 28 }, { x: 50, y: 26 }, { x: 52, y: 22 }, { x: 52, y: 21 }, { x: 52, y: 16 }, { x: 51, y: 14 }, { x: 49, y: 13 }, { x: 47, y: 12 }, { x: 47, y: 9 }, { x: 47, y: 8 }, { x: 47, y: 8 }, { x: 49, y: 8 }, { x: 50, y: 9 }, { x: 50, y: 10 }, { x: 52, y: 8 }, { x: 52, y: 5 }, { x: 52, y: 3 }, { x: 51, y: 2 }]
var t = [{ x: 67, y: 6 }, { x: 66, y: 11 }, { x: 72, y: 11 }, { x: 71, y: 20 }, { x: 71, y: 26 }, { x: 72, y: 28 }, { x: 74, y: 29 }, { x: 74, y: 29 }, { x: 75, y: 29 }, { x: 79, y: 29 }, { x: 81, y: 29 }, { x: 82, y: 29 }, { x: 83, y: 28 }, { x: 84, y: 26 }, { x: 84, y: 25 }, { x: 84, y: 22 }, { x: 83, y: 19 }, { x: 77, y: 23 }, { x: 75, y: 13 }, { x: 80, y: 12 }, { x: 81, y: 8 }, { x: 75, y: 8 }, { x: 75, y: 4 }, { x: 74, y: 4 }, { x: 72, y: 8 }]
// zapis arraya
var St = [[S, "green"], [t, "yellow"]];

function drawTESt(canvas) {
    drawObstacle(canvas, T, "red");
    drawObstacle(canvas, E, "blue");
    drawAllObstacles(canvas, St);
}
function getBase64Image(src) {
    // test deluje samo ce vzamem sliko
    var img = new Image;
    img.src = src;
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL();
}
function testVisuals() {
    const testCanvas = createLayer(100, 100);
    drawTESt(testCanvas);

    var a = getBase64Image(testCanvas.toDataURL());
    var b = getBase64Image("./src/TESt.png");

    if (a != b) {
        console.warn("drawn image does not match with TESt image");
        return false;
    } else {
        document.body.removeChild(testCanvas);
        console.log("drawObstacles function works");
        return true;
    }
}

module.exports = {
    testVisuals,
    drawObstacle,
    drawAllObstacles,
    logCorner,
    createLayer,
    smiley
}