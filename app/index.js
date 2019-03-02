// importing libraries
import clock from "clock";
import document from "document";
import { battery } from "power";
import { today } from "user-activity";
import { units } from "user-settings";
import { preferences } from "fitbit-preferences";
import asap from "fitbit-asap/app";
import dtlib from "../common/datetimelib"


let hours; 
let mins;

const hand = document.getElementById("hand");
const digital = document.getElementById("digital");
const digitalicon = document.getElementById("digitalicon");

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}


// Message is received
asap.onmessage = data => {
  
  switch (data.key) {
     case "digital":
          let activity = JSON.parse(data.newValue).values[0].value;

          if (activity === "elevationGain" && today.local["elevationGain"] === undefined) {
            break;
          }

          preferences[data.key] = activity;
          setActivityIcon(preferences[data.key]);
          updateActivity(preferences[data.key]);
          break;
  };
}



// trying to get user settings if saved before
if  (!preferences.digital) {
  preferences.digital = "time";
}

function setActivityIcon(activity) {
  digitalicon.href = `icons/${activity}.png`;
}

function updateActivity(activity) {
  
    switch (activity) {
      case "battery":
        digital.text = Math.floor(battery.chargeLevel) + '%'
        break;
      case "time":
        digital.text = `${dtlib.zeroPad(hours)}:${dtlib.zeroPad(mins)}`;
        break;
      case "distance":
        digital.text = units.distance == 'us'? precisionRound(today.adjusted[activity]/1000/1.609344, 1) + 'mi' : precisionRound(today.adjusted[activity]/1000, 1) + 'km'
        break;
      default:
        digital.text = today.adjusted[activity];
        break;
    }


  
}


// Update the clock every minute
clock.granularity = "minutes";

setActivityIcon(preferences.digital);

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let todayDate = evt.date;
  
  hours = todayDate.getHours()
  mins =  todayDate.getMinutes();

  
  let angle = (hours*60 + mins)*360/(24*60)

  hand.groupTransform.rotate.angle = 180 + angle;
  
  updateActivity(preferences.digital);
  
}

