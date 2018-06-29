import 'core-js/es6';
import 'core-js/es7/reflect';
import 'ts-helpers';

import 'zone.js/dist/zone.js';
import 'zone.js/dist/zone-testing';

import {getTestBed} from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
);

declare const require:any;

const context = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);
