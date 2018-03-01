var Gauge = require("svg-gauge"); //Importing the gauge package

var batteryVoltageGauge = Gauge(document.getElementById('battery-voltage'), {
    min: 0,
    max: 12,
    //Renders Voltage label
    label: function(value) {
      return Math.round(10 * value)/10 + "V";
    },
    value: 0,
    //Dial colors
    color: function(value) {
      if(value <= 4.5) {
        return "red";
      } else if(value <= 6) {
        return "brown";
      } else {
        return "green";
      }
    }
});
NetworkTables.addKeyListener('/SmartDashboard/Battery Voltage', (key, value) => {
   batteryVoltageGauge.setValueAnimated(value);
});

var totalPowerGauge = Gauge(document.getElementById("total-power"), {
    min: 0,
    max: 120,
    //Renders Amps label
    label: function(value) {
      return Math.round(10 * value)/10 + "A";
    },
    value: 0,
    //Green Dial color
    color: function(value) {
      if(value <= 120) {
        return "green";
      }
    }
});
NetworkTables.addKeyListener('/SmartDashboard/Total power', (key, value) => {
   totalPowerGauge.setValueAnimated(value);
});

var frontLeftGauge = Gauge(document.getElementById("front-left-power"), {
     min: 0,
     max: 40,
     dialStartAngle: 180,
     dialEndAngle: 0,
     //Renders Amps label
     label: function(value) {
       return Math.round(10 * value)/10 + "A";
     },
     value: 0,
     //Green Dial color
     color: function(value) {
       if(value <= 40) {
         return "green";
       }
     }
});
NetworkTables.addKeyListener('/SmartDashboard/Front left wheel', (key, value) => {
  frontLeftGauge.setValueAnimated(value);
});

var backLeftGauge = Gauge(document.getElementById("back-left-power"), {
     min: 0,
     max: 40,
     dialStartAngle: 180,
     dialEndAngle: 0,
     //Renders Amps label
     label: function(value) {
       return Math.round(10 * value)/10 + "A";
     },
     value: 0,
     //Green Dial color
     color: function(value) {
       if(value <= 40) {
         return "green";
       }
     }
});
NetworkTables.addKeyListener('/SmartDashboard/Back left wheel', (key, value) => {
  backLeftGauge.setValueAnimated(value);
});

var frontRightGauge = Gauge(document.getElementById("front-right-power"), {
     min: 0,
     max: 40,
     dialStartAngle: 180,
     dialEndAngle: 0,
     //Renders Amps label
     label: function(value) {
       return Math.round(10 * value)/10 + "A";
     },
     value: 0,
     //Green Dial color
     color: function(value) {
       if(value <= 40) {
         return "green";
       }
     }
});
NetworkTables.addKeyListener('/SmartDashboard/Front right wheel', (key, value) => {
  frontLeftGauge.setValueAnimated(value);
});

var backRightGauge = Gauge(document.getElementById("back-right-power"), {
     min: 0,
     max: 40,
     dialStartAngle: 180,
     dialEndAngle: 0,
     //Renders Amps label
     label: function(value) {
       return Math.round(10 * value)/10 + "A";
     },
     value: 0,
     //Green Dial color
     color: function(value) {
       if(value <= 40) {
         return "green";
       }
     }
});
NetworkTables.addKeyListener('/SmartDashboard/Back right wheel', (key, value) => {
  backLeftGauge.setValueAnimated(value);
});
// Set gauge value
//cpuGauge.setValue(20);

// Set value and animate (value, animation duration in seconds)
//cpuGauge.setValueAnimated(35, 1);
