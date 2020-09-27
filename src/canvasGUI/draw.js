const corner = (x, y) => {
    return {
        x,
        y
    };
};
// function getSinCos(degrees) {
//     // degrees into radians
//     var rad = (degrees * Math.PI / 180).toFixed(2);
//     return {
//         sin: (Math.sin(rad)).toFixed(2),
//         cos: (Math.cos(rad)).toFixed(2)
//     }
// }
// function rotateCoordinate(point, degrees) {
//     const sinCos = getSinCos(degrees)
//     var x = (sinCos.cos * point.x - sinCos.sin * point.y).toFixed(2);
//     var y = (Number(sinCos.sin * point.x) + Number(sinCos.cos * point.y)).toFixed(2);
//     return { x: Number(x), y: Number(y) };
// };
function rotateShape(context, centre, rotation) {
    context.translate(centre.x, centre.y);
    context.rotate( (Math.PI / 180) * rotation);
    context.translate(-centre.x, -centre.y);
}
export default () => {
    return {
        drawRectangle(layer, rectangle) {
            const ctx = layer.getContext('2d');
            function getCorner(axis, side) {
                return axis - side / 2;
            }
            const a = rectangle.sides.a * rectangle.size;
            const b = rectangle.sides.b * rectangle.size;
            const x = rectangle.centre.x;
            const y = rectangle.centre.y;
            const topLeft = corner(getCorner(x, a), getCorner(y, b));
            ctx.beginPath();
            ctx.fillStyle = rectangle.colour;
            rotateShape(ctx, rectangle.centre, rectangle.rotation);
            ctx.fillRect(topLeft.x, topLeft.y, a, b)
            ctx.stroke();
        },
        rect(x, y, a, b, size, rotation, colour) {
            return {
                centre: {
                    x,
                    y
                    // the centre of the square
                },
                sides: {
                    a,
                    b
                    // lengths of sides, a is vertical and b horizontal
                },
                // size 1 is default, if it were 2 it would double the lengths of the sides
                size,
                // rotation in degrees in anti-clockwise rotation, 0 is no rotation
                rotation,
                colour
            }
        }
    }
}