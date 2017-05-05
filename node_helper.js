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
                var result = JSON.parse(body)[0];
                //console.log(result);
                this.sendSocketNotification('LOTTERY_RESULT', result);
            }
        });
    },


    getDate: function() {
        return (new Date()).toLocaleDateString();
    },

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_LOTTERY') {
            this.getLottery(payload);
        }
    }

});