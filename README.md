# MMM-Lottery 
A MagicMirror module that gives you truly random lottery numbers, coinciding with a multitude of International lotteries. 

## Examples

With header centered and colored numbers centered

![](lottery1.JPG)

With no header and colored numbers aligned to the right

![](lottery2.JPG)

## How true randomness is established
https://www.random.org/randomness/

## Info

* Uses very little of your precious mirror real estate. Fits anywhere!
* Make it bigger. Make it smaller. Color it. Align it. Make it yours!
* The .css file included helps you modify size, position and color of text.
* Need a color chart? No problem. http://htmlcolorcodes.com/color-picker/

## Installation

* `git clone https://github.com/mykle1/MMM-Lottery.git` into the `~/MagicMirror/modules` directory.

## Add to Config.js

    {
        module: "MMM-Lottery",
        position: "top_right", // Anywhere!
        config: {
		 mode: "6of39",
            maxWidth: "400px",    
            header: ""         // Header text inside quotes
        }
    },

## Lottery parameters for config mode.
Choose your countries lottery parameters:

6of38, 6of39, 6of40, 6of43, 6of45, 6of47, 6of48, 6of49, 6of52, 6of59, 6of69, 6of90
7of35, 7of36, 7of37, 7of40, 7of49, 7of70, 10of90


## Config Options

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `mode` | `6of69` | Choose your lotteries parameters from list above. |
| `maxWidth` | `400px` | Fits anywhere. |
| `header` | `text` | If you want a header |
| `animationSpeed` | `3000` | Transition speed in ms. |
| `updateInterval` | `5*60*1000` | 5 minutes. |
| `initialLoadDelay` | `3250` | Module load delay in ms. |
| `retryDelay` | `2500`  |Delay to retry fetching data. |
