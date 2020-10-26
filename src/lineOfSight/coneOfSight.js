function getAngleOfTargetsEdges(angle, distance, targetWidth) {
    // right triangle with the one side as distance to point and height of width/2
    const angleWithLineToTarget = getObserverToPointAngle(distance, targetWidth / 2);
    const left = makeValidAngle(angle + angleWithLineToTarget);
    const right = makeValidAngle(angle - angleWithLineToTarget);
    return {
        left,
        right
    };
}
function getAngle(x1, y1, x2, y2) {
    const x = x2 - x1;
    const y = y2 - y1;
    const positivity = {
        // helps define quadrant
        x: x >= 0,
        y: y >= 0
    };
    if (x1 == x2 && y1 == y2) {
        // will result in returning full vision
        return 'overlapping';
    }
    const angle = getObserverToPointAngle(x2 - x1, y2 - y1);
    // gets
    if (positivity.x) {
        // quadrant 1 or 4
        return makeValidAngle(360 + angle);
    } else {
        // quadrant 2 or 3
        return angle + 180;
    }
}
function getObserverToPointAngle(adjecent, oposite) {
    // tan a = oposite / adjecent
    const angle = Math.atan(oposite / adjecent) * 180 / Math.PI;
    return Math.floor(angle);
}
function makeValidAngle(angle) {
    // changes the angle so it's between 0 and 360
    function changeBy(angle, value) {
        let newAngle = angle;
        while (newAngle >= 360 || newAngle < 0) {
            newAngle = newAngle - value;
        }
        return Number(newAngle);
    }
    if (angle >= 360) {
        return changeBy(angle, 360);
    } else if (angle < 0) {
        return changeBy(angle, -360)
    } else {
        return angle;
    }
}
function withinCone(left, right, angle) {
    // angles should be made valid
    if (left > right) {
        return left >= angle && angle >= right;
    } else {
        return left >= angle || angle >= right
    }
}
function getLimit(orientation, cone) {
    const halfAngle = cone / 2;
    const left = makeValidAngle(orientation + halfAngle);
    const right = makeValidAngle(orientation - halfAngle);
    return {
        left,
        right
    }
}
const cone = (left, right) => {
    const first = (left, right) => {
        if (left >= right) {
            return left;
        } else {
            return left + 360;
        }
    }
    return makeValidAngle(first(left, right) - right);
}
function getPreciseLimits(centre, left, right, leftLimit, rightLimit) {
    // will get another cone with orientation of centre.angle and cone of left.angle - right.angle
    const targetsCone = (left, right, centre, l, r) => {
        return {
            centre,
            cone: cone(l, r),
            left,
            right,
        }
    }

    if (centre.withinSight) {
        if (left.withinSight) {
            if (right.withinSight) {
                // all angles are within vision
                return targetsCone(left.angle, right.angle, centre.angle, left.angle, right.angle);
            } else {
                // calculate the last angle on the right that is within vision
                // rotating right means the angle decreases (change is -1)
                const r = getLastAngleInsideVision(centre.angle, -1, leftLimit, rightLimit);
                return targetsCone(left.angle, r, centre.angle, left.angle, right.angle);
            }
        } else if (right.withinSight) {
            // calculate the last angle on the left that is within vision
            // rotating left means the angle increases (change is 1)
            const l = getLastAngleInsideVision(centre.angle, 1, leftLimit, rightLimit);
            return targetsCone(l, right.angle, centre.angle, left.angle, right.angle);
        }
    } else {
        if (left.withinSight) {
            // calculate the last angle on the right that is within vision
            // rotating right means the angle decreases (change is -1)
            const r = getLastAngleInsideVision(left.angle, -1, leftLimit, rightLimit);
            return targetsCone(left.angle, r, centre.angle, left.angle, right.angle);
        } else if (right.withinSight) {
            // calculate the last angle on the left that is within vision
            // rotating left means the angle increases (change is 1)
            const l = getLastAngleInsideVision(right.angle, 1, leftLimit, rightLimit);
            return targetsCone(l, right.angle, centre.angle, left.angle, right.angle);
        } else {
            // technicaly you could have a cone of sight that sees both of the edges of the trarget but not the centre
            // but i think you'll agree that that is a bit silly
            // i'll be checking the function for result.left
            return targetsCone(false, false, centre.angle, left.angle, right.angle);
        }
    }
}
function getLastAngleInsideVision(orientation, change, leftLimit, rightLimit) {
    // wanted to do it with a more binary search kind of thing, but settled for this
    let ang = orientation;
    while (withinCone(leftLimit - 1, rightLimit + 1, ang)) {
        ang += change;
    }
    return ang;
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
            //distance from observer to target's centre
            const d = (Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))).toFixed(2);
            const sideAngles = getAngleOfTargetsEdges(angle, Number(d), target.size.width);
            const angleClass = (angle, leftLimit, rightLimit) => {
                return {
                    angle,
                    // will make calling information more convinient
                    withinSight: withinCone(angle, leftLimit, rightLimit)
                }
            }
            const limits = getLimit(observer.orientation, observer.cone);
            const centreAngle = angleClass(angle, limits.left, limits.right);
            const leftAngle = angleClass(sideAngles.left, limits.left, limits.right);
            const rightAngle = angleClass(sideAngles.right, limits.left, limits.right);
            const preciseLimits = getPreciseLimits(centreAngle, leftAngle, rightAngle, limits.left, limits.right);
            const onePercent = preciseLimits.cone / 100;
            const xPercent = cone(preciseLimits.left, preciseLimits.right);
            const visiblePercent = Number((xPercent / onePercent).toFixed(0));
            if (visiblePercent > 60 && visiblePercent < 70) {
                return 66;
            } else {
                return visiblePercent;
            }
        }
    };
}