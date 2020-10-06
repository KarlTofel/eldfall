const position = (x, y, z) => {
    return {
        x,
        y,
        z
    };
}
export default () => {
    return {
        observer(orientation, x, y, z = 0, cone = 180) {
            return {
                orientation,
                position: position(x, y, z),
                cone
            };
        },
        target(width, height, x, y, z = 0) {
            return {
                position: position(x, y, z),
                size: {
                    width,
                    height
                }
            };
        },
        obstacle(length, width, height, x, y, z = 0, rotation = 0) {
            return {
            dimensions: position(length, width, height),
            position: position(x, y, z),
            rotation
            };
        }
    }
}