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
    getLength() {
        return Math.sqrt(this.#x * this.#x + this.#y * this.#y);
    }
    getAngleRad() {
        return Math.atan2(this.#y, this.#x);
    }
    getAngleDeg() {
        return this.getAngleRad() * (180 / Math.PI);
    }

    setX(x) {
        this.#x = x;
    }
    setY(y) {
        this.#y = y;
    }
    setAngleRad(rad) {
        const length = this.getLength();
        this.#x = length * Math.cos(rad);
        this.#y = length * Math.sin(rad);
    }
    setAngleDeg(deg) {
        const rad = deg * (Math.PI / 180);
        this.setAngleRad(rad);
    }
    setLength(l) {
        const angle = this.getAngleRad();
        this.#x = l * Math.cos(angle);
        this.#y = l * Math.sin(angle);
    }

    addTo(v) {
        this.#x += v.getX();
        this.#y += v.getY();
    }
    subtractFrom(v) {
        this.#x -= v.getX();
        this.#y -= v.getY();
    }
    multiplyBy(s) {
        this.#x *= s;
        this.#y *= s;
    }
    divideBy(s) {
        this.#x /= s;
        this.#y /= s;
    }
}
