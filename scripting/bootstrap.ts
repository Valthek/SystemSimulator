///<reference path="../node_modules/angular2/typings/browser.d.ts" />
 
import { bootstrap } from 'angular2/platform/browser';
import { SimulatorComponent } from './simulator.component';
import { TimeComponent } from './time.component';
import { CourseComponent } from './course.component';
 
bootstrap(SimulatorComponent)
  .catch(err => console.log(err));
bootstrap(TimeComponent)
  .catch(err => console.log(err));
bootstrap(CourseComponent)
  .catch(err => console.log(err));