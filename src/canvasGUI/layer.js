export default () => {
    return {
        createLayer($el, height, width, className) {
            const layer = $el.createElement("canvas");
            layer.width = width;
            layer.height = height;
            layer.className = className;
            $el.body.appendChild(layer);
            return layer;
        }
    }
}
