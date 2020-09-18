function createLayer(height, width) {
    // ustvari canvas
    const canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;
    document.body.appendChild(canvas);
    return canvas;
}
// gre za najbolj osnoven nacin, ki pa je zmozen narisat karkoli s samo ravnicami
function drawObstacle(canvas, obstacle) {
    // podas array z koordinatami kotov in barvo in ti narise
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(obstacle.corners[0].x, obstacle.corners[0].y);
    for (let i = 1; i < obstacle.corners.length; i++) {
        // loopa skozi vse kote
        var corner = obstacle.corners[i];
        ctx.lineTo(corner.x, corner.y);
    }
    ctx.closePath();
    ctx.fillStyle = obstacle.colour;
    ctx.fill();
    ctx.stroke();
}
const point = (x, y) => {
    return { x: x, y: y };
}
const displayObstacle = (corners, colour) => {
    return {
        corners: corners,
        colour: colour
    };
}
function drawAllObstacles(canvas, obstacles) {
    for (let j = 0; j < obstacles.length; j++) {
        drawObstacle(canvas, obstacles[j]);
    }
}

export default {
    createLayer,
    drawAllObstacles,
    drawObstacle,
    displayObstacle,
    point
}