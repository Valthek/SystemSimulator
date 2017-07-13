// 2d vector class (coordinate system, positioning)

export class vector2d{
    // X coordinate relative to origin
    x:number;
    // Y coordinate relative to origin
    y:number;

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    static ToRadian(degrees:number)
    {
        console.log("degrees: " + degrees);
        return degrees*(Math.PI/180);
    }

    static ToDegrees(radian:number) 
    {
        return radian*(180/Math.PI);
    }

    static CalculateDistance(source: vector2d, destination:vector2d)
    {
        let dx = source.x - destination.x;
        let dy = source.y - destination.y;
        let distance = Math.sqrt((dx*dx)+(dy*dy));

        return distance;
    }

    AddVector(vector2d)
    {
        this.x += vector2d.x;
        this.y += vector2d.y;
        return this;
    }
}