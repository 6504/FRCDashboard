var Gauge = require("svg-gauge"); //Importing the gauge package

var cpuGauge = Gauge(document.getElementById("total-power"), {
    min: 0,
    max: 120,
    //Renders Amps label
    label: function(value) {
      return Math.round(value) + "A";
    },
    value: 0,
    // Custom dial colors (Optional)
    color: function(value) {
      if(value <= 120) {
        return "green";
      }
    }
});

NetworkTables.addKeyListener('/SmartDashboard/Total power', (key, value) => {
   cpuGauge.setValue(value);
});
// Set gauge value
//cpuGauge.setValue(20);

// Set value and animate (value, animation duration in seconds)
//cpuGauge.setValueAnimated(35, 1);
