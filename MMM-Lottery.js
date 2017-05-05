   /* Magic Mirror
    * Module: MMM-Lottery
    *
    * By Mykle1
    * 
    */
   Module.register("MMM-Lottery", {

       // Module config defaults.
       defaults: {
           updateInterval: 5 * 60 * 1000, // 5 minutes
           fadeSpeed: 3000,
           initialLoadDelay: 3250, // ms seconds delay
           retryDelay: 2500,
           header: "Your winning numbers are . . .",
           maxWidth: "400px",
       },

       // Define required scripts.
       getScripts: function() {
           return ["moment.js"];
       },

       getStyles: function() {
           return ["MMM-Lottery.css", "font-awesome.css"];
       },

       // Define start sequence.
       start: function() {
           Log.info("Starting module: " + this.name);

           // Set locale.
           moment.locale(config.language);

           this.today = "";
           this.lottery = [];
           this.url = "http://fortunecookieapi.herokuapp.com/v1/cookie?fortuneId=&lottoId=&lessonId=&limit=";
           this.scheduleUpdate();
       },

       getDom: function() {

           var lottery = this.lottery;
           var lotto = this.lotto;


           var wrapper = document.createElement("div");
           wrapper.className = "wrapper";
           wrapper.style.maxWidth = this.config.maxWidth;


           if (!this.loaded) {
               wrapper.innerHTML = "Your winning numbers...";
               wrapper.className = "bright light small";
               return wrapper;
           }

           if (this.config.header != "") {
               var header = document.createElement("header");
               header.className = "header";
               header.innerHTML = this.config.header;
               wrapper.appendChild(header);
           }

           var top = document.createElement("div");
           top.classList.add("content");

           var des2 = document.createElement("p");
           des2.classList.add("xsmall", "bright");
           var numbers = lotto.numbers.sort(function(a, b) {
               return a - b
           });
           var lotNumbers = numbers;
           var showNumbers = lotNumbers.join(', ');
           des2.innerHTML = showNumbers;
           top.appendChild(des2);

           wrapper.appendChild(top);
           return wrapper;

       },

       processLottery: function(data) {
           this.lottery = data.lottery;
           this.lotto = data.lotto;
           this.loaded = true;
       },

       scheduleUpdate: function() {
           setInterval(() => {
               this.getLottery();
           }, this.config.updateInterval);

           this.getLottery(this.config.initialLoadDelay);
       },


       getLottery: function() {
           this.sendSocketNotification('GET_LOTTERY', this.url);
       },

       socketNotificationReceived: function(notification, payload) {
           if (notification === "LOTTERY_RESULT") {
               this.processLottery(payload);
               this.updateDom(this.config.fadeSpeed);
           }
           this.updateDom(this.config.initialLoadDelay);
       },

   });