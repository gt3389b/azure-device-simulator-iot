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
var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

var iothub = require('azure-iothub');

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

module.exports = 
function Device (iot_hub_connection_string, deviceId) {
    var self = this;

    self.connect = function(connectionString) {
      self.client = clientFromConnectionString(connectionString);
      self.deviceId = connectionString.split(";")[1].split("=")[1];

      self.client.open(function(err, data) {
         if (err) {
            console.log("Connection error: "+self.deviceId);
         } else {
            console.log("Connection made: "+self.deviceId);

            // Create a message and send it to the IoT Hub 
            setInterval(function(){
               var windSpeed = 10 + (Math.random() * 4);
               var data = JSON.stringify({ deviceId: self.deviceId, windSpeed: windSpeed });
               var message = new Message(data);
               //console.log("Sending message: " + message.getData());
               //self.client.sendEvent(message, printResultFor('sent'));
               self.client.sendEvent(message, function() {
                  process.stdout.write('.');
               });
            }, 1000);
         }
      });
    };

    self.getInfo = function() {
        return self.deviceId;
    };

    // Create a device and return the connection_string
    self.createDevice = function(deviceId) {
		var device = new iothub.Device(null);

		device.deviceId = deviceId;
		registry.create(device, function(err, deviceInfo, res) {
         var iot_hub_name = iot_hub_connection_string.split(";")[0].split("=")[1];

	    	//device already exists
			if (err) {
				registry.get(device.deviceId, function(err, deviceInfo, res) {
               var primary_key = deviceInfo['authentication']['symmetricKey']['primaryKey'];
               var device_connection_string = 'HostName='+iot_hub_name+';DeviceId='+deviceInfo['deviceId']+';SharedAccessKey='+primary_key;
               self.connect(device_connection_string);
            });
			} else { 
            var primary_key = deviceInfo['authentication']['symmetricKey']['primaryKey'];

            var device_connection_string = 'HostName='+iot_hub_name+';DeviceId='+deviceInfo['deviceId']+';SharedAccessKey='+primary_key;
            self.connect(device_connection_string);
         }
		});
    }

	 var registry = iothub.Registry.fromConnectionString(iot_hub_connection_string);
	 if (!deviceId) {
       const uuidV4 = require('uuid/v4');
       uuidV4 = require('uuid/v4');
       deviceId = 'SimulatedDevice-' + uuidV4();
    }

    self.deviceId = deviceId;
    self.createDevice(self.deviceId);
}
