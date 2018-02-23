var Gauge = require("svg-gauge"); //Importing the gauge package

var cpuGauge = Gauge(document.getElementById("total-power"), {
    min: 0,
    max: 40,
    //Renders Amps label
    label: function(value) {
      return Math.round(value) + "A";
    },
    value: 0,
    // Custom dial colors (Optional)
    color: function(value) {
      if(value < 20) {
        return "#5ee432"; // green
      }else if(value < 40) {
        return "#fffa50"; // yellow
      }else if(value < 60) {
        return "#f7aa38"; // orange
      }else {
        return "#ef4655"; // red
      }
    }
});

// Set gauge value
//cpuGauge.setValue(20);

// Set value and animate (value, animation duration in seconds)
//cpuGauge.setValueAnimated(35, 1);
