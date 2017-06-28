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
        return degrees*(Math.PI/180);
    }

    static ToDegrees(radian:number) 
    {
        return radian*(180/Math.PI);
    }
}