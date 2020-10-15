function getTargetLine(x1, y1, x2, y2, width) {
    const d1 = width / 2;
    const observersLine = lineOfVision(x1, y1, x2, y2);
    console.log(observersLine);
    // k1 = -1/k2
    const k1 = observersLine.k;
    const k = -1 / k1;
    // n = y - kx
    const n = y2 - k * x2;
    return {
        k,
        n
    }
}
function lineOfVision(x1, y1, x2, y2) {
    // y = k * x + n
    // k = (y2 - y1) / (x2 - x1)
    const k = (x2 - x1) / (y2 - y1);
    // n = y - kx
    const n = y1 - k * x1;
    // d^2 = x^2 + y^2
    return {
        d,
        k,
        n
    }
}
function getAngleOfTargetsEdges(angle, distance, targetWidth) {
    // we need two new lines at the edges of the target
    // we have two right triangles where: adjecent = distance to target, oposite = half targets width
    const angleWithLineToTarget = getObserverToPointAngle(distance, targetWidth / 2);
    const left = angle + angleWithLineToTarget;
    const right = angle - angleWithLineToTarget;
    return {
        left,
        right
    };
}
function getAngle(x1, y1, x2, y2) {
    const x = x2 - x1;
    const y = y2 - y1;
    const positivity = {
        x: x >= 0,
        y: y >= 0
    };
    if (x1 == x2 && y1 == y2) {
        return 'overlapping';
    }
    const angle = getObserverToPointAngle(x2 - x1, y2 - y1);
    console.log(angle);
    if (positivity.x) {
        if (positivity.y) {
            return angle + 0;
        } else {
            return angle + 360;
        }
    } else {
        return angle + 180;
    }
}
function getObserverToPointAngle(adjecent, oposite) {
    // tan a = oposite / adjecent
    const angle = Math.atan(oposite / adjecent) * 180 / Math.PI;
    return Math.floor(angle);
}
function withinCone(orientation, cone, angle) {
    const half = cone / 2;
    if (makeValidAngle(half) >= 180) {
        // has full cone of vision
        return true;
    }
    const left = makeValidAngle(Number(orientation) + Number(half));
    const right = makeValidAngle(orientation - half);
    const direction = makeValidAngle(orientation);
    if (left > right) {
        return {
            bool: left >= angle && angle >= right,
            angle
        };
    } else {
        return {
            bool: left >= angle || angle >= right,
            angle
        };
    }
}
function makeValidAngle(angle) {
    function changeBy(angle, value) {
        let newAngle = angle;
        while (newAngle >= 360 || newAngle < 0) {
            newAngle = newAngle - value;
        }
        return newAngle;
    }
    if (angle >= 360) {
        return changeBy(angle, 360);
    } else if (angle < 0) {
        return changeBy(angle, -360)
    } else {
        return angle;
    }
}
function getTargetsEdges(inCone, centre, leftRight) {
    const insideCone = Number(inCone.centre) + Number(inCone.left) + Number(inCone.right);
    const centreAngle = makeValidAngle(centre) + 360;
    const leftAngle = makeValidAngle(leftRight.left) + 360;
    const rightAngle = makeValidAngle(leftRight.right) + 360;
    const returned = (left, right) => {
        return {
            left: makeValidAngle(left),
            right: makeValidAngle(right)
        }
    }
    if (insideCone == 3) {
        return returned(leftAngle, rightAngle)
    } else {
        function getWidthInAngle(left, right) {
            if (right > left) {
                const st1 = right - 360;
                return makeValidAngle(left - st1);
            } else {
                return makeValidAngle(left - right);
            }
        }
        const width = getWidthInAngle(leftAngle, rightAngle);
        console.log(leftAngle, rightAngle);
        console.log(width);
        // basicaly doing a binary search for the last point within cone of vision
        if (insideCone == 1 && inCone.centre) {
        }
    }
}
function binaryAdjecent(angle, max, orientation, cone) {
    if (max == 1) {
        return angle;
    } else {
        const n = makeValidAngle(angle + max);
        if (withinCone(orientation, cone, n)) {
            return n;
        } else {
            return makeValidAngle(n - max / 2);
        }
    }
}
export default () => {
    return {
        hasVisuals(observer, target, obstacles) {
            const x1 = observer.position.x;
            const y1 = observer.position.y;
            const x2 = target.position.x;
            const y2 = target.position.y;
            const angle = getAngle(x1, y1, x2, y2, observer.orientation);
            if (angle == 'overlapping') {
                return 100;
            }
            const d = (Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))).toFixed(2);
            const sideAngles = getAngleOfTargetsEdges(angle, Number(d), target.size.width);
            const inCone = {
                centre: withinCone(observer.orientation, observer.cone, angle).bool,
                left: withinCone(observer.orientation, observer.cone, sideAngles.left).bool,
                right: withinCone(observer.orientation, observer.cone, sideAngles.right).bool
            };
            console.log(getTargetsEdges(inCone, angle, sideAngles));
            return (Number(inCone.left) + Number(inCone.right)) * 50;
        }
    };
}