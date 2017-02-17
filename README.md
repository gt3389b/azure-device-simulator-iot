# Microsoft Azure Device Simulator

In order to use this simulator, you must have created a Microsoft Azure IotHub.  This can be done either via the portal.azure.com or through an ARM file.  For this project,
I created a resource group with a single iothub.

The program creates a deviceIds.json file which will include the deviceIds of the devices it creates.  You can prepoluate this if desired.  If the num_devices is greater than the number of deviceIds in the list, then the program will create them.  Created devices will be named 'SimulatedDevice-<UUID4>' where UUID4 is a generated UUID.


## Configuring the simulator

The application uses [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/). Start at step 2 if you have them installed already.

1. Install [Node.js](http://nodejs.org/) (this will also install npm)

2. Go to the project folder in the terminal and install the required npm modules:  
    `npm install`

3. Generate an .env file containing the information that you used to register the device simulator in your IoT Platform organization (.env.example provided):
    ```
    iot_hub_connection_string=<iothubconnectionstring>
    num_devices=<count_of_the_number_of_devices>
    ```

4. Start the application:  
    `npm start`

## Helpful utilities
Requires:  iothub-explorer and jq

List all devices:

    `iothub-explorer list`

Query information about each device in the deviceIds.json file:

    `cat deviceIds.json | jq -r .[] | xargs -L 1 iothub-explorer info`

Delete information about each device in the deviceIds.json file:

    `cat deviceIds.json | jq -r .[] | xargs -L 1 iothub-explorer delete`

## Next features / help wanted

## License

This sample code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).
