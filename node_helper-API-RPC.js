/* Magic Mirror
 * Module: MMM-Powerball
 *
 * By Mykle1
 * 
 */
const NodeHelper = require('node_helper');
const request = require('request');
const moment = require('moment');


module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting module: " + this.name);
    },

		//var number = number,

    getPowerball: function(url) {
        console.log(url);
        request({
            url: url,
			jsonrpc: "2.0",
			method: "generateIntegers",  // by direction of the API instructions
			params: {
			apiKey: "4541a086-461b-459b-a48e-f623a82c7821",
			n: 6,     //this would be 5 if the next comment works
			min: 1,
			max: 69,
			replacement: false,
			base: 10,
		//	n: 1,     //If this is how you call a 2nd number set
		//	min: 1,   //for the Powerball number
		//	max: 26,
		//	replacement: false,
		//	base: 10
		},
		id: 1331
	});
				
			
         (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
				console.log(result + response.statusCode);
                if (result.length > 0) {
                    this.sendSocketNotification('POWERBALL_RESULTS', result);
                }
            }
        }
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_POWERBALL') {
            this.getPowerball(payload);
        }
    }
});