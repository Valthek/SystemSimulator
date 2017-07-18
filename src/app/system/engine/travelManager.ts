//Class to calculate travel in distance, time & cost
import { planet } from "./../objects/planet";
import { moon } from "./../objects/moon";
import { cObject } from "./../objects/cObject";

export class Library{
    public static get astronomicalUnit(){return 149597870700};
    public static get gravitationConstant(){return 116798853600000000000};
}

export class travelManager {  

    static calculateHohmanDeltaV(source:cObject, destination:cObject )
    {
        console.log("source.orbitradius " + source.orbitRadius);
        console.log("destination.orbitradius "+ destination.orbitRadius)
        console.log("AstronomicalUnit " + Library.astronomicalUnit);
        let sourceOrbit = source.orbitRadius * Library.astronomicalUnit;
        console.log("source orbit: " + sourceOrbit);
        let destinationOrbit = destination.orbitRadius * Library.astronomicalUnit;
        console.log("destination orbit: " + destinationOrbit);
        let smAxis = (sourceOrbit+ destinationOrbit)/2;
        console.log("smAxis: " + smAxis);

        // Calculate deltaV for Insertion Burn (in m/s)
        let orbitVelocitySource = Math.sqrt(Library.gravitationConstant / sourceOrbit);
        console.log("orbitVs "+ orbitVelocitySource);
        let velocityI = Math.sqrt(Library.gravitationConstant*((2/sourceOrbit)-(1/smAxis)));
        let deltaVI = velocityI - orbitVelocitySource;

        // Calculate deltaV for Arrival Burn (in m/s)
        let orbitVelocityDestination = Math.sqrt(Library.gravitationConstant/ destinationOrbit);
        console.log("orbitVd "+ orbitVelocityDestination);
        let velocityA = Math.sqrt(Library.gravitationConstant*((2/destinationOrbit)-(1/smAxis)));
        let deltaVA = velocityA - orbitVelocityDestination;

        return Math.abs(deltaVI)+Math.abs(deltaVA);
    }
}