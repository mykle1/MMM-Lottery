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
           return ["MMM-Lottery.css"];
       },

       // Define start sequence.
       start: function() {
           Log.info("Starting module: " + this.name);

           // Set locale.
           moment.locale(config.language);

           this.today = "";
           this.lottery = [];
           this.url = "https://www.random.org/integers/?num=6&min=1&max=69&col=1&base=10&format=plain&rnd=new";
           this.scheduleUpdate();
       },

       getDom: function() {

          
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
           des2.className = "xsmall", "bright";
           des2.innerHTML = lotto.numbers;
           top.appendChild(des2);

           wrapper.appendChild(top);
           return wrapper;

       },

       processLottery: function(data) {
           this.lotto = data;
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
