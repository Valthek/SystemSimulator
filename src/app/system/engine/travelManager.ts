//Class to calculate travel in distance, time & cost
import { planet } from "./../objects/planet";
import { moon } from "./../objects/moon";
import { cObject } from "./../objects/cObject";
import { vector2d } from "./vector2d";
import { Library } from "./Library";


export class travelManager {

    static calculateHohmanDeltaV(source: cObject, destination: cObject) {
        let hohmanResults:number[] = [];
        console.log("========= Calculating Hohman Maneuver ============");
        let sourceOrbit = source.orbitRadius * Library.astronomicalUnit;
        let destinationOrbit = destination.orbitRadius * Library.astronomicalUnit;
        let smAxis = this.calculateSMAxis(source, destination);

        // Calculate deltaV for Insertion Burn (in m/s)
        let orbitVelocitySource = Math.sqrt(Library.gravitationConstant / sourceOrbit);
        let velocityI = Math.sqrt(Library.gravitationConstant * ((2 / sourceOrbit) - (1 / smAxis)));
        let deltaVI = velocityI - orbitVelocitySource;
        console.log("Insertion Burn for: " + source.name + + ": " + Math.ceil(deltaVI) + "m/s" );
        

        // Calculate deltaV for Arrival Burn (in m/s)
        let orbitVelocityDestination = Math.sqrt(Library.gravitationConstant / destinationOrbit);
        let velocityA = Math.sqrt(Library.gravitationConstant * ((2 / destinationOrbit) - (1 / smAxis)));
        let deltaVA = velocityA - orbitVelocityDestination;
        console.log("Arrival Burn for: " + destination.name + ": " + Math.ceil(deltaVA)+ "m/s");
        

        // Calculate total deltaV (in m/s)
        let deltaV = Math.abs(deltaVI) + Math.abs(deltaVA);
        console.log("Total Delta V: " + (Math.floor(deltaV)/1000) + "km/s");
        hohmanResults.push(Math.floor(deltaV)/1000);
        hohmanResults.push(Math.floor(deltaVI));
        hohmanResults.push(Math.floor(deltaVA));

        return hohmanResults;
    }

    static calculateHohmanTransferTime(source: cObject, destination: cObject) {
        console.log("======= Calculating Hohman Transfer Time =========");
        let piSquared = Math.pow(Math.PI, 2);
        let smAxis = Math.pow(this.calculateSMAxis(source, destination), 3);
        let timeSeconds = 0.5 * Math.sqrt((4 * piSquared * smAxis) / Library.gravitationConstant);
        let time = timeSeconds / 86400;
        console.log("Time in days from " + source.name + " to " + destination.name + ": " + Math.floor(time)+" days");
        return Math.floor(time);
    }

    static calculateHohmanTransferWindow(source: cObject, destination: cObject) {
        console.log("======= Calculating Hohman Launch Window =========");
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
        let orbitPeriodI = 2 * Math.PI * Math.sqrt(Math.pow(inferiorOrbit, 3) / Library.gravitationConstant);
        let orbitPeriodS = 2 * Math.PI * Math.sqrt(Math.pow(superiorOrbit, 3) / Library.gravitationConstant);
        let synodicPeriod = 1 / ((1 / orbitPeriodI) - (1 / orbitPeriodS));
        let window: number = synodicPeriod / 86400;
        console.log("The Launch Window for " + source.name + " to " + destination.name + " is every " + Math.floor(window) + " days");
        return Math.floor(window);
    }

    static calculateHohmanLaunchTiming(source: cObject, destination: cObject) {
        console.log("======= Calculating Hohman Launch Angle ==========");

        let sourceOrbit = source.orbitRadius * Library.astronomicalUnit;
        let destinationOrbit = destination.orbitRadius * Library.astronomicalUnit;
        let inner = Math.pow(sourceOrbit / destinationOrbit + 1, 3);
        let angleRadian = Math.PI * (1 - (0.35355 * Math.sqrt(inner)));
        angleRadian = angleRadian%(Math.PI*2);
        let angleDegrees = angleRadian * (180 / Math.PI);
        console.log("Tranfer Launch Angle for " + source.name + " to " + destination.name + " is " + angleDegrees + "°");
        return angleRadian;
    }

    static calculateDaysToNextHohmanTravelDate(source: cObject, destination: cObject, actualDate: number) {
        console.log("======== Calculating Next Hohman Window ==========");
        let goalAngle = travelManager.calculateHohmanLaunchTiming(source, destination);
        let daysToAngle = this.findDateForObjectangle(source, destination, actualDate, goalAngle);
        return (daysToAngle);
    }

    static calculateBrachistochroneDeltaVNow(source: cObject, destination: cObject, thrustInG: number) {
        // Calculate DeltaV requirement for Brachistochrone transfer
        // Acceleration input is in G
        console.log("====== Calculating Brachistochrone DeltaV ========");
        let acceleration = thrustInG * 9.81;
        let travelDistance = this.calculateTravelDistanceMeters(source, destination);
        let transitDeltaV = 2 * Math.sqrt(travelDistance * acceleration);
        console.log("DeltaV Required for Brachistochrone from " + source.name + " to " + destination.name + " is " + Math.floor(transitDeltaV/1000) + " km/s");
        return Math.floor(transitDeltaV/1000);
    }

    static calculateBrachistochroneTransitTimeNow(source: cObject, destination: cObject, thrustInG: number) {
        console.log("==== Calculating Brachistochrone Travel Time =====");
        let acceleration = thrustInG * 9.81;
        let travelDistance = this.calculateTravelDistanceMeters(source, destination);
        let transitTime = 2 * Math.sqrt(travelDistance / acceleration);
        let transitTimeDays = transitTime / 86400;
        console.log("Time required for travel from " + source.name + " to " + destination.name + " at " + thrustInG + "G is " + Math.floor(transitTimeDays) + " days");
        return Math.floor(transitTimeDays);
    }

    static calculateNextBrachistochroneTransit(source:cObject, destination:cObject, thrustInG:number, actualDate:number)
    {        
        let goalAngle = 0;
        let daysToAngle = this.findDateForObjectangle(source, destination, actualDate, goalAngle);
        let travelTime = this.calculateBrachistochroneTransitTimeNow(source, destination, thrustInG);
        return (daysToAngle - travelTime);
    }


    private static calculateSMAxis(source: cObject, destination: cObject) {
        let sourceOrbit = source.orbitRadius * Library.astronomicalUnit;
        let destinationOrbit = destination.orbitRadius * Library.astronomicalUnit;
        let smAxis = (+sourceOrbit + +destinationOrbit) / 2;
        return smAxis;
    }

    private static calculateTravelDistanceMeters(source: cObject, destination: cObject) {
        let travelDistance = vector2d.CalculateDistance(source.currentPosition, destination.currentPosition);
        let travelDistanceMeters = travelDistance * Library.astronomicalUnit;
        return travelDistanceMeters
    }

    private static findDateForObjectangle(source:cObject, destination:cObject, actualDate:number, targetAngle:number){
        let currentDate = Math.floor(actualDate);
        let initialDate = currentDate;
        let goalAngle = targetAngle;
        let lastDeltaAngle = (source.currentAngle - destination.currentAngle);

        while ((currentDate - initialDate) < 40320) {
            currentDate++;
            let newAngle = (source.getAngleForDate(currentDate) - destination.getAngleForDate(currentDate));
            if (Math.abs(goalAngle - newAngle) < Math.abs(goalAngle - lastDeltaAngle)) {
                break;
            }
            lastDeltaAngle = newAngle;
        }
        if ((currentDate - initialDate) == 40320) {
            console.log("Next transfer from " + source.name + " to " + destination.name + " is not happening in your lifetime");
        }
        else {
            console.log("Next transfer from " + source.name + " to " + destination.name + " is in " + (currentDate - initialDate) + " days");
        }
        let result:number = (currentDate - initialDate)-1; 

        return result;
    }
}