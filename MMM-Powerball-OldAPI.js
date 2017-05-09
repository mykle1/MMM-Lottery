   /* Magic Mirror
    * Module: MMM-Powerball
    *
    * By Mykle1
    * 
    */
   Module.register("MMM-Powerball", {

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
           return ["MMM-Powerball.css", "font-awesome.css"];
       },

       // Define start sequence.
       start: function() {
           Log.info("Starting module: " + this.name);

           // Set locale.
           moment.locale(config.language);

           this.today = "";
           this.powerball = [];
           // this.url = "https://www.parsehub.com/api/v2/runs/tQnpMz0dp4JK/data";
		   this.url = "https://www.random.org/integers/?num=6&min=1&max=69&col=1&base=10&format=plain&rnd=new",
           this.scheduleUpdate();
       },

       getDom: function() {

           var powerball = this.powerball;
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

       processPowerball: function(data) {
           this.powerball = data.powerball;
           this.lotto = data.lotto;
           this.loaded = true;
       },

       scheduleUpdate: function() {
           setInterval(() => {
               this.getPowerball();
           }, this.config.updateInterval);

           this.getPowerball(this.config.initialLoadDelay);
       },


       getPowerball: function() {
           this.sendSocketNotification('GET_POWERBALL', this.url);
       },

       socketNotificationReceived: function(notification, payload) {
           if (notification === "POWERBALL_RESULT") {
               this.processPowerball(payload);
               this.updateDom(this.config.fadeSpeed);
           }
           this.updateDom(this.config.initialLoadDelay);
       },

   });