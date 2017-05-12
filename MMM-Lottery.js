   /* Magic Mirror
    * Module: MMM-Lottery
    *
    * By Mykle1
    * 
    */
   Module.register("MMM-Lottery", {

       // Module config defaults.
       defaults: {
           mode: "6of69", // <-- US Powerball. See readme for your lottery parameters
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
           this.url = this.getUrl();
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


           if (this.config.mode != '') {
               this.url = this.config.mode;
           }

           top.appendChild(des2);

           wrapper.appendChild(top);

           return wrapper;

       },

       getUrl: function() {
           var url = null;
           var mode = this.config.mode;


           if (mode == "6of38") {
               url = "https://www.random.org/integers/?num=6&min=1&max=38&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "6of39") {
               url = "https://www.random.org/integers/?num=6&min=1&max=39&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "6of40") {
               url = "https://www.random.org/integers/?num=6&min=1&max=40&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "6of43") {
               url = "https://www.random.org/integers/?num=6&min=1&max=43&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "6of45") {
               url = "https://www.random.org/integers/?num=6&min=1&max=45&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "6of47") {
               url = "https://www.random.org/integers/?num=6&min=1&max=47&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "6of48") {
               url = "https://www.random.org/integers/?num=6&min=1&max=48&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "6of49") {
               url = "https://www.random.org/integers/?num=6&min=1&max=49&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "6of52") {
               url = "https://www.random.org/integers/?num=6&min=1&max=52&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "6of59") {
               url = "https://www.random.org/integers/?num=6&min=1&max=59&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "6of69") {
               url = "https://www.random.org/integers/?num=6&min=1&max=45&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "6of90") {
               url = "https://www.random.org/integers/?num=6&min=1&max=90&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "7of35") {
               url = "https://www.random.org/integers/?num=7&min=1&max=35&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "7of36") {
               url = "https://www.random.org/integers/?num=7&min=1&max=36&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "7of37") {
               url = "https://www.random.org/integers/?num=&min=1&max=37&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "7of40") {
               url = "https://www.random.org/integers/?num=&min=1&max=40&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "7of49") {
               url = "https://www.random.org/integers/?num=7&min=1&max=49&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "7of70") {
               url = "https://www.random.org/integers/?num=7&min=1&max=70&col=1&base=10&format=plain&rnd=new";
           } else if (mode == "10of90") {
               url = "https://www.random.org/integers/?num=10&min=1&max=90&col=1&base=10&format=plain&rnd=new";
           } else {
               console.log("Error can't get Lottery url" + response.statusCode);
           }

           return url;
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