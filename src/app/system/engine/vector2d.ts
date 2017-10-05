// 2d vector class (coordinate system, positioning)

export class vector2d {
    // X coordinate relative to origin
    x: number;
    // Y coordinate relative to origin
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    public findDistance(destination: vector2d) : number {
        // calculate distance in [units] from this vector2d to a target vector2d
        let dx = this.x - destination.x;
        let dy = this.y - destination.y;
        let distance = Math.sqrt((dx * dx) + (dy * dy));

        return distance;
    }

    public toString(): string {
        return `Vector2D (Coordinates: ${this.x} ${this.y})`;
    }

    public add(value: vector2d): vector2d {
        // add a vector to this
        this.x += value.x;
        this.y += value.y;
        return this;
    }
    public subtract(value:vector2d): vector2d{
        // subtract a vector from this
        this.x -= value.x;
        this.y -= value.y;
        return this;
    }
    public multiply(value:number):vector2d{
        // multiply this vector by a set value
        this.x *= value;
        this.y *= value;
        return this;
    }
}