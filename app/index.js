// importing libraries
import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { battery } from "power";
import { me as device } from "device";
import * as messaging from "messaging";
import * as fs from "fs";
import { me } from "appbit";
import { goals, today } from "user-activity";
import { units } from "user-settings";
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


// on app exit collect settings 
me.onunload = () => {
  fs.writeFileSync("user_settings.json", userSettings, "json");
}


// Message is received
messaging.peerSocket.onmessage = evt => {
  
  switch (evt.data.key) {
     case "digital":
          userSettings[evt.data.key] = JSON.parse(evt.data.newValue).values[0].value;
          setActivityIcon(userSettings[evt.data.key]);
          updateActivity(userSettings[evt.data.key]);
          break;
  };
}

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
};



// trying to get user settings if saved before
let userSettings;
try {
  userSettings = fs.readFileSync("user_settings.json", "json");
} catch (e) {
  userSettings = {digital: "time"}
}


//trap
if (!userSettings.digital) {
  userSettings = {digital: "time"}
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
        digital.text = units.distance == 'us'? precisionRound(today.local[activity]/1000/1.609344, 1) + 'mi' : precisionRound(today.local[activity]/1000, 1) + 'km'
        break;
      default:
        digital.text = today.local[activity];
        break;
    }


  
}


// Update the clock every minute
clock.granularity = "minutes";

setActivityIcon(userSettings.digital);

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  
  hours = today.getHours()
  mins =  today.getMinutes();

  
  let angle = (hours*60 + mins)*360/(24*60)

  hand.groupTransform.rotate.angle = 180 + angle;
  
  updateActivity(userSettings.digital);
  
}

