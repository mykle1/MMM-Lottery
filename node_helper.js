/* Magic Mirror
 * Module: MMM-Lottery
 *
 * By Mykle1
 * 
 */
const NodeHelper = require('node_helper');
const request = require('request');
const fs = require('fs');

module.exports = NodeHelper.create({

    start: function() {},

    getLottery: function(url) {
        request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                results = JSON.parse(JSON.stringify(body));
                stringy = JSON.stringify(results);
                str = stringy.replace(/"/g, '');
                newNumber = str.replace(/\\n/g, ', ');
                var last = newNumber.slice(0, -2);
                var test = Array.from(last);
                var result = last;
                this.sendSocketNotification('LOTTERY_RESULT', {numbers: result});
            }
        });
    },


    

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_LOTTERY') {
            this.getLottery(payload);
        }
    }

});
