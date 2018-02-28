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
// Set gauge value
//cpuGauge.setValue(20);

// Set value and animate (value, animation duration in seconds)
//cpuGauge.setValueAnimated(35, 1);
