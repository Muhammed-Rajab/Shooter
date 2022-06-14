export default class Vector {
    #x;
    #y;
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }
    getX() {
        return this.#x;
    }
    getY() {
        return this.#y;
    }

    setX(x) {
        this.#x = x;
    }
    setY(y) {
        this.#y = y;
    }
    setAngleRad(rad) {}
    setAngleDeg(deg) {}
    setLength(l) {}

    addTo(v) {}
    subtractFrom(v) {}
    multiplyBy(v) {}
    divideBy(v) {}
}
