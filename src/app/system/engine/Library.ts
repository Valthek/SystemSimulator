export class Library {
    //Astronomical unit in meters
    public static get astronomicalUnit() { return 149597870700 };
    // gravitation constant for Antara TODO: make editable
    public static get gravitationConstant() { return 116798853600000000000 };
    public static get monthsInAYear() {
        enum months {
            January,
            February,
            March,
            April,
            May,
            June,
            July,
            August,
            September,
            October,
            November,
            December,
        }
        return months;
    }

    public static arbitraryArray(size)
    {
        // return an arbitrarily large sized array (mostly for ngFor loops)
        return size?Library.arbitraryArray(size-1).concat(size):[]
    }
}