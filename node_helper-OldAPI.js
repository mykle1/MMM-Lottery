/* Magic Mirror
 * Module: MMM-Powerball
 *
 * By Mykle1
 * 
 */
const NodeHelper = require('node_helper');
const request = require('request');
const fs = require('fs');

module.exports = NodeHelper.create({

    start: function() {},
	
	//  var number = this.number,

    getPowerball: function(url) {
        request({
            url: url,
            method: 'GET',
		//	num: 6,    // The integer generator accepts only HTTP GET requests, 
		//	min: 1,    // so parameters are passed via encoding in the URL.
		//	max: 69,
		//	col: 6,
		//	base: "10",
		//	format: "plain",
		//	rnd: "new"
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(number)[0];
                console.log(result);
                this.sendSocketNotification('POWERBALL_RESULT', result);
            }
        });
    },


    getDate: function() {
        return (new Date()).toLocaleDateString();
    },

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_POWERBALL') {
            this.getPowerball(payload);
        }
    }

});