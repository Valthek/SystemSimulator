///<reference path="../node_modules/angular2/typings/browser.d.ts" />
 
import { bootstrap } from 'angular2/platform/browser';
import { AppComponent } from './simulator.component';
 
bootstrap(AppComponent)
  .catch(err => console.log(err));