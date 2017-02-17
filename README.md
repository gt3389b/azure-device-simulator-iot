# Azure Device Simulator


## Configuring the simulator

The application uses [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/). Start at step 2 if you have them installed already.

1. Install [Node.js](http://nodejs.org/) (this will also install npm)

2. Go to the project folder in the terminal and install the required npm modules:  
    `npm install`

3. Generate an .env file containing the information that you used to register the device simulator in your IoT Platform organization:
    ```
    iot_hub_connection_string=<iothubconnectionstring>
    num_devices=<count_of_the_number_of_devices>
    ```

4. Start the application:  
    `npm start`

## Next features / help wanted

## License

This sample code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).
