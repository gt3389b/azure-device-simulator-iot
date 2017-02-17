/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Use sctrict mode
'use strict';

var jsonfile = require('jsonfile');
require('dotenv').load();

var Device = require('./device');

var deviceIds = jsonfile.readFileSync("./deviceIds.json");

var step;
for (step = 0; step < process.env.num_devices; step++) {
   if (step <= (deviceIds.length - 1)) {
      console.log('Starting device: '+ deviceIds[step]);
      var device1 = new Device(process.env.iot_hub_connection_string, deviceIds[step]);
   } else {
      console.log('Starting new device');
      var device1 = new Device(process.env.iot_hub_connection_string, null);
   }

   if (deviceIds.indexOf(device1.getInfo()) < 0) {
      console.log('adding device: '+ deviceIds[step]);
      deviceIds.push(device1.getInfo());
   }
}

console.log(deviceIds);
jsonfile.writeFile("./deviceIds.json", deviceIds, function(err) {
   if(err) {
      return console.log(err);
   }

   console.log("The file was saved!");
}); 
