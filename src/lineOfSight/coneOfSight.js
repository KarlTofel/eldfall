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
        x: x > 0,
        y: y > 0
    };
    if (x1 == x2) {
        if (y1 == y2) {
            return null;
        } else if (positivity.y) {
            return 90;
        } else {
            return 270;
        }
    } else if (y1 == y2) {
        if (positivity.x) {
            return 0;
        } else {
            return 180;
        }
    }
    const angle = getObserverToPointAngle(x2 - x1, y2 - y1);
    if (positivity.x) {
        if (positivity.y) {
            return angle;
        } else {
            return 270 + angle;
        }
    } else {
        if (positivity.y) {
            return angle + 90;
        } else {
            return angle + 180;
        }
    }
}
function getObserverToPointAngle(adjecent, oposite) {
    // sin a = adjecent / oposite
    const angle = Math.atan(Math.abs(oposite) / Math.abs(adjecent)) * 180 / Math.PI;
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
function getTargetsEdges(inCone, centre, left, right) {
    const insideCone = Number(inCone.centre) + Number(inCone.left) + Number(inCone.right);
    const centreAngle = makeValidAngle(centre);
    const leftAngle = makeValidAngle(left);
    const rightAngle = makeValidAngle(right);
    // console.log('centreAngle: ', centreAngle);
    // console.log('leftAngle: ', leftAngle);
    // console.log('rightAngle: ', rightAngle);
    // console.log(insideCone);
    if (insideCone == 3) {
        return 100;
    } else if (insideCone == 0) {
        return 0;
    } else {
        return 50;
    }
    if (insideCone == 2) {
        if (inCone.left) {
        } else {
        }
    } else {
        if (inCone.centre) {
        } else if (inCone.left) {
        } else {
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
            const d = (Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))).toFixed(2);
            const angle = getAngle(x1, y1, x2, y2);
            const sideAngles = getAngleOfTargetsEdges(angle, Number(d), target.size.width);
            const inCone = {
                centre: withinCone(observer.orientation, observer.cone, angle).bool,
                left: withinCone(observer.orientation, observer.cone, sideAngles.left).bool,
                right: withinCone(observer.orientation, observer.cone, sideAngles.right).bool
            };
            console.log(getObserverToPointAngle(x2 - x1, y2 - y1));
            return getTargetsEdges(inCone, angle, sideAngles.left, sideAngles.right, observer.cone)
        }
    };
}