//Class to calculate travel in distance, time & cost
import { planet } from "./../objects/planet";
import { moon } from "./../objects/moon";
import { cObject } from "./../objects/cObject";
import { vector2d } from "./vector2d";

export class Library {
    public static get astronomicalUnit() { return 149597870700 };
    public static get gravitationConstant() { return 116798853600000000000 };
}

export class travelManager {

    static calculateHohmanDeltaV(source: cObject, destination: cObject) {
        console.log("==================================================");
        console.log("========== Calculate Hohman Maneuver =============");
        console.log("==================================================");
        let sourceOrbit = source.orbitRadius * Library.astronomicalUnit;
        let destinationOrbit = destination.orbitRadius * Library.astronomicalUnit;
        let smAxis = this.calculateSMAxis(source, destination);

        // Calculate deltaV for Insertion Burn (in m/s)
        let orbitVelocitySource = Math.sqrt(Library.gravitationConstant / sourceOrbit);
        let velocityI = Math.sqrt(Library.gravitationConstant * ((2 / sourceOrbit) - (1 / smAxis)));
        console.log("orbitVelocityI: " + velocityI);
        let deltaVI = velocityI - orbitVelocitySource;
        console.log(source.name + " DeltaVi (m/s): " + deltaVI);

        // Calculate deltaV for Arrival Burn (in m/s)
        let orbitVelocityDestination = Math.sqrt(Library.gravitationConstant / destinationOrbit);
        let velocityA = Math.sqrt(Library.gravitationConstant * ((2 / destinationOrbit) - (1 / smAxis)));
        let deltaVA = velocityA - orbitVelocityDestination;
        console.log(destination.name + " DeltaVa (m/s): " + deltaVA);

        // Calculate total deltaV (in m/s)
        let deltaV = Math.abs(deltaVI) + Math.abs(deltaVA);
        console.log("Total Delta V (m/s): " + deltaV);

        return Math.abs(deltaVI) + Math.abs(deltaVA);
    }

    static calculateHohmanTransferTime(source: cObject, destination: cObject) {
        console.log("==================================================");
        console.log("======== Calculate Hohman Transfer Time ==========");
        console.log("==================================================");
        let piSquared = Math.pow(Math.PI, 2);
        let smAxis = Math.pow(this.calculateSMAxis(source, destination), 3);
        let timeSeconds = 0.5 * Math.sqrt((4 * piSquared * smAxis) / Library.gravitationConstant);
        let time = timeSeconds / 86400;
        console.log("Time in days from " + source.name + " to " + destination.name + ": " + time);
        return time;
    }

    static calculateHohmanTransferWindow(source: cObject, destination: cObject) {
        console.log("==================================================");
        console.log("======== Calculate Hohman Launch Window ==========");
        console.log("==================================================");
        var inferiorOrbit = 0;
        var superiorOrbit = 0;
        if (source.orbitRadius > destination.orbitRadius) {
            inferiorOrbit = destination.orbitRadius * Library.astronomicalUnit;
            superiorOrbit = source.orbitRadius * Library.astronomicalUnit;
        }
        else {
            inferiorOrbit = source.orbitRadius * Library.astronomicalUnit;
            superiorOrbit = destination.orbitRadius * Library.astronomicalUnit;
        }
        let orbitPeriodI = 2 * Math.PI * Math.sqrt(Math.pow(inferiorOrbit, 3)/Library.gravitationConstant);
        let orbitPeriodS = 2 * Math.PI * Math.sqrt(Math.pow(superiorOrbit, 3)/Library.gravitationConstant);
        let synodicPeriod = 1/((1/orbitPeriodI)-(1/orbitPeriodS));
        let window: number = synodicPeriod / 86400;
        console.log("Tranfer Launch Window in days for " + source.name + " to " + destination.name + ": " + window);
        return window;
    }

    static calculateLaunchTiming(source:cObject, destination:cObject)
    {
        console.log("==================================================");
        console.log("======== Calculate Hohman Launch Timing ==========");
        console.log("==================================================");
        
        let sourceOrbit = source.orbitRadius * Library.astronomicalUnit;
        let destinationOrbit = destination.orbitRadius * Library.astronomicalUnit;
        let inner = Math.pow(sourceOrbit/destinationOrbit+1, 3);
        let angleRadian = Math.PI * (1-(0.35355*Math.sqrt(inner)));
        let angleDegrees = angleRadian*(180/Math.PI);
        console.log("Tranfer Launch Timing for " + source.name + " to " + destination.name + ": " + angleDegrees + "°");
        return angleRadian;
    }

    static calculateBrachistochroneDeltaV(source:cObject, destination:cObject, thrustInG:number)
    {
        // Calculate DeltaV requirement for Brachistochrone transfer
        // Acceleration input is in G
        console.log("==================================================");
        console.log("======= Calculate Brachistochrone DeltaV =========");
        console.log("==================================================");
        let acceleration = thrustInG * 9.81;
        let travelDistance = this.calculateTravelDistanceMeters(source, destination);
        let transitDeltaV = 2*Math.sqrt(travelDistance*acceleration);
        console.log("DeltaV Required for Brachistochrone from " + source.name + " to " + destination.name + ":" + transitDeltaV)
        return transitDeltaV;
    }

    static calculateBrachistochroneTransitTime(source:cObject, destination:cObject, thrustInG:number)
    {
        console.log("==================================================");
        console.log("===== Calculate Brachistochrone Travel Time ======");
        console.log("==================================================");
        let acceleration = thrustInG * 9.81;
        let travelDistance = this.calculateTravelDistanceMeters(source, destination);
        let transitTime = 2*Math.sqrt(travelDistance/acceleration);
        let transitTimeDays = transitTime / 86400;
        console.log("Time required for travel from " + source.name + " to " + destination.name + " at " + thrustInG +  "G is " + transitTimeDays );
        return transitTime;
    }


    private static calculateSMAxis(source: cObject, destination: cObject) {
        let sourceOrbit = source.orbitRadius * Library.astronomicalUnit;
        let destinationOrbit = destination.orbitRadius * Library.astronomicalUnit;
        let smAxis = (+sourceOrbit + +destinationOrbit) / 2;
        return smAxis;
    }

    private static calculateTravelDistanceMeters(source:cObject, destination:cObject)
    {
        let travelDistance = vector2d.CalculateDistance(source.currentPosition, destination.currentPosition);
        let travelDistanceMeters = travelDistance*Library.astronomicalUnit;
        return travelDistanceMeters
    }
}