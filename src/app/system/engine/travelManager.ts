//Class to calculate travel in distance, time & cost
import { planet } from "./../objects/planet";
import { moon } from "./../objects/moon";
import { cObject } from "./../objects/cObject";
import { vector2d } from "./vector2d";
import { Library } from "./Library";


export class travelManager {

    static calculateHohmanDeltaV(source: cObject, destination: cObject) {
        let hohmanResults:number[] = [];
        console.log("========= Calculating Hohmann Maneuver ============");
        let sourceOrbit = source.orbitRadius * Library.astronomicalUnit;
        let destinationOrbit = destination.orbitRadius * Library.astronomicalUnit;
        let smAxis = this.calculateSMAxis(source, destination);

        // Calculate deltaV for Insertion Burn (in m/s)
        let orbitVelocitySource = Math.sqrt(Library.gravitationConstant / sourceOrbit);
        let velocityI = Math.sqrt(Library.gravitationConstant * ((2 / sourceOrbit) - (1 / smAxis)));
        let deltaVI = velocityI - orbitVelocitySource;
        

        // Calculate deltaV for Arrival Burn (in m/s)
        let orbitVelocityDestination = Math.sqrt(Library.gravitationConstant / destinationOrbit);
        let velocityA = Math.sqrt(Library.gravitationConstant * ((2 / destinationOrbit) - (1 / smAxis)));
        let deltaVA = velocityA - orbitVelocityDestination;
        

        // Calculate total deltaV (in m/s)
        let deltaV = Math.abs(deltaVI) + Math.abs(deltaVA);
        hohmanResults.push(Math.floor(deltaV)/1000);
        hohmanResults.push(Math.floor(deltaVI));
        hohmanResults.push(Math.floor(deltaVA));

        return hohmanResults;
    }

    static calculateHohmanTransferTime(source: cObject, destination: cObject) {
        let piSquared = Math.pow(Math.PI, 2);
        let smAxis = Math.pow(this.calculateSMAxis(source, destination), 3);
        let timeSeconds = 0.5 * Math.sqrt((4 * piSquared * smAxis) / Library.gravitationConstant);
        let time = timeSeconds / 86400;
        return Math.floor(time);
    }

    static calculateHohmanTransferWindow(source: cObject, destination: cObject) {
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
        return Math.floor(window);
    }

    static calculateHohmanLaunchTiming(source: cObject, destination: cObject) {
        let sourceOrbit = source.orbitRadius * Library.astronomicalUnit;
        let destinationOrbit = destination.orbitRadius * Library.astronomicalUnit;
        let inner = Math.pow(sourceOrbit / destinationOrbit + 1, 3);
        let angleRadian = Math.PI * (1 - (0.35355 * Math.sqrt(inner)));
        angleRadian = angleRadian%(Math.PI*2);
        let angleDegrees = angleRadian * (180 / Math.PI);
        return angleRadian;
    }

    static calculateDaysToNextHohmanTravelDate(source: cObject, destination: cObject, actualDate: number) {        
        let goalAngle = travelManager.calculateHohmanLaunchTiming(source, destination);
        let daysToAngle = this.findDateForObjectangle(source, destination, actualDate, goalAngle, this.calculateHohmanTransferWindow(source, destination));
        return (daysToAngle);
    }

    static calculateBrachistochroneDeltaVNow(source: cObject, destination: cObject, thrustInG: number) {
        // Calculate DeltaV requirement for Brachistochrone transfer
        // Acceleration input is in G
        console.log("====== Calculating Brachistochrone Transfer ========");
        let acceleration = thrustInG * 9.81;
        let travelDistance = this.calculateTravelDistanceMeters(source, destination);
        let transitDeltaV = 2 * Math.sqrt(travelDistance * acceleration);
        return Math.floor(transitDeltaV/1000);
    }

    static calculateBrachistochroneTransitTimeNow(source: cObject, destination: cObject, thrustInG: number) {
        let acceleration = thrustInG * 9.81;
        let travelDistance = this.calculateTravelDistanceMeters(source, destination);
        let transitTime = 2 * Math.sqrt(travelDistance / acceleration);
        let transitTimeDays = transitTime / 86400;
        return Math.floor(transitTimeDays);
    }

    static calculateNextBrachistochroneTransit(source:cObject, destination:cObject, thrustInG:number, actualDate:number)
    {        
        let goalAngle = 0;
        //maxIterations is set to the year length of [Object 12, ~162 yrs]
        let daysToAngle = this.findDateForObjectangle(source, destination, actualDate, goalAngle, 54000);
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
        let travelDistance = source.currentPosition.findDistance(destination.currentPosition);
        let travelDistanceMeters = travelDistance * Library.astronomicalUnit;
        return travelDistanceMeters
    }

    private static findDateForObjectangle(source:cObject, destination:cObject, actualDate:number, targetAngle:number, maxIterations:number){
        let currentDate = Math.floor(actualDate);
        let initialDate = currentDate;
        let goalAngle = targetAngle;
        let lastDeltaAngle = (source.getAngleForDate(initialDate) - destination.getAngleForDate(initialDate));
        let accuracy = 0;
        if (source.radialVelocity > destination.radialVelocity)
        {accuracy = source.radialVelocity;}
        else
        {accuracy=destination.radialVelocity;}

        // loop through n itterations of finding a date and checking the angle where n = the period of the transfer window in days
        while ((currentDate - initialDate) < maxIterations) {
            currentDate++;
            let newAngle = (source.getAngleForDate(currentDate) - destination.getAngleForDate(currentDate));
             if ((targetAngle - accuracy) < newAngle && newAngle < (targetAngle + accuracy) )  {
                break;
            } 
            lastDeltaAngle = newAngle;
        }
        if ((currentDate - initialDate) == maxIterations) {
            console.log("Next transfer from " + source.name + " to " + destination.name + " is not happening in your lifetime");
        }
        else {
            console.log("Next transfer from " + source.name + " to " + destination.name + " is in " + (currentDate - initialDate) + " days");
        }
        let result:number = (currentDate - initialDate); 

        return result;
    }
}