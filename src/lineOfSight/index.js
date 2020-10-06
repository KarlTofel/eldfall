import classesList from './classes';
import coneOfSight from './coneOfSight';

const classes = classesList();

export default () => {
    return {
        observer(orientation, x, y, z, cone) {
            return classes.observer(orientation, x, y, z, cone);
        },
        target(width, height, x, y, z) {
            return classes.target(width, height, x, y, z);
        },
        obstacle(length, width, height, x, y, z, rotation) {
            return classes.obstacle(length, width, height, x, y, z, rotation);
        },
        hasVisuals(observer, target, obstacles) {
            return coneOfSight().hasVisuals(observer, target, obstacles);
        }
    }
}