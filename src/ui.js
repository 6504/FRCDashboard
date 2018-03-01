// Define UI elements
let ui = {
    timer: document.getElementById('timer'),
    robotState: document.getElementById('robot-state').firstChild,
    gyro: {
        container: document.getElementById('gyro'),
        val: 0,
        offset: 0,
        visualVal: 0,
        arm: document.getElementById('gyro-arm'),
        number: document.getElementById('gyro-number')
    },
    robotDiagram: {
        piston1: document.getElementById('robot-piston1'),
        piston1arm: document.getElementById('robot-piston1arm'),
        piston2: document.getElementById('robot-piston2'),
        piston2arm: document.getElementById('robot-piston2arm')
    },
    pneumatics: {
      status: document.getElementById('pneumatics-status').firstChild,
      piston1: document.getElementById('pneumatics-piston1'),
      piston1arm: document.getElementById('pneumatics-piston1arm'),
      piston2: document.getElementById('pneumatics-piston2'),
      piston2arm: document.getElementById('pneumatics-piston2arm')
    },
    liftLimit: {
        //button: document.getElementById('liftLimit-button'),
        readout: document.getElementById('liftLimit-readout').firstChild
    },
    autoSelect: document.getElementById('auto-select'),
    armPosition: document.getElementById('arm-position')
};


// Key Listeners

// Gyro rotation
let updateGyro = (key, value) => {
    ui.gyro.val = value;
    ui.gyro.visualVal = Math.floor(ui.gyro.val - ui.gyro.offset);
    ui.gyro.visualVal %= 360;
    if (ui.gyro.visualVal < 0) {
        ui.gyro.visualVal += 360;
    }
    ui.gyro.arm.style.transform = `rotate(${ui.gyro.visualVal}deg)`;
    ui.gyro.number.innerHTML = ui.gyro.visualVal + 'º';
};
NetworkTables.addKeyListener('/SmartDashboard/Gyro angle', updateGyro);

//Pneumatic Intake in
NetworkTables.addKeyListener('/SmartDashboard/Pneumatic Intake In/running', (key, value) => {
    //Pull arms in if the command is running
    if(value == true) {
      ui.robotDiagram.piston1.style.transform = `translate(5px)`;
      ui.robotDiagram.piston1arm.style.transform = `translate(10px)`;
      ui.robotDiagram.piston2.style.transform = `translate(-5px)`;
      ui.robotDiagram.piston2arm.style.transform = `translate(-10px)`;

      ui.pneumatics.piston1.style.transform = `translate(20px)`;
      ui.pneumatics.piston1arm.style.transform = `translate(30px)`;
      ui.pneumatics.piston2.style.transform = `translate(-30px)`;
      ui.pneumatics.piston2arm.style.transform = `translate(-40px)`;
      ui.pneumatics.status.data = 'Closed';
    }
});
//Pneumatic Intake out
NetworkTables.addKeyListener('/SmartDashboard/Pneumatic Intake Out/running', (key, value) => {
    //Push arms out if the command is running
    if(value == true) {
      ui.robotDiagram.piston1.style.transform = `translate(-1px)`;
      ui.robotDiagram.piston1arm.style.transform = `translate(-1px)`;
      ui.robotDiagram.piston2.style.transform = `translate(1px)`;
      ui.robotDiagram.piston2arm.style.transform = `translate(1px)`;

      ui.pneumatics.piston1.style.transform = `translate(-5px)`;
      ui.pneumatics.piston1arm.style.transform = `translate(-5px)`;
      ui.pneumatics.piston2.style.transform = `translate(.5px)`;
      ui.pneumatics.piston2arm.style.transform = `translate(.5px)`;
      ui.pneumatics.status.data = 'Open';
    }
});

//Lift Limit + button(inactive)
NetworkTables.addKeyListener('/SmartDashboard/Lift limit reached', (key, value) => {
    // Set class active if value is true and unset it if it is false
    //ui.liftLimit.button.classList.toggle('active', value);
    //ui.liftLimit.readout.data = 'Value is ' + value;
    if(value == true) {
        ui.liftLimit.readout.data = 'Lift limit has been reached';
    }
    else {
        ui.liftLimit.readout.data = 'Lift limit has not been reached';
    }
});

NetworkTables.addKeyListener('/robot/time', (key, value) => {
    // This is an example of how a dashboard could display the remaining time in a match.
    // We assume here that value is an integer representing the number of seconds left.
    ui.timer.innerHTML = value < 0 ? '0:00' : Math.floor(value / 60) + ':' + (value % 60 < 10 ? '0' : '') + value % 60;
});

// Load list of prewritten autonomous modes
NetworkTables.addKeyListener('/SmartDashboard/Auto mode/options', (key, value) => {
    // Clear previous list
    while (ui.autoSelect.firstChild) {
        ui.autoSelect.removeChild(ui.autoSelect.firstChild);
    }
    // Make an option for each autonomous mode and put it in the selector
    for (let i = 0; i < value.length; i++) {
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(value[i]));
        ui.autoSelect.appendChild(option);
    }
    // Set value to the already-selected mode. If there is none, nothing will happen.
    ui.autoSelect.value = NetworkTables.getValue('/SmartDashboard/currentlySelectedMode');
});

// Load list of prewritten autonomous modes
NetworkTables.addKeyListener('/SmartDashboard/Auto mode/options', (key, value) => {
    ui.autoSelect.value = value;
});

// The rest of the doc is listeners for UI elements being clicked on
/*ui.liftLimit.button.onclick = function() {
    // Set NetworkTables values to the opposite of whether button has active class.
    NetworkTables.putValue('/SmartDashboard/example_variable', this.className != 'active');
};*/

// Reset gyro value to 0 on click
ui.gyro.container.onclick = function() {
    // Store previous gyro val, will now be subtracted from val for callibration
    ui.gyro.offset = ui.gyro.val;
    // Trigger the gyro to recalculate value.
    updateGyro('/SmartDashboard/Gyro angle', ui.gyro.val);
};
// Update NetworkTables when autonomous selector is changed
ui.autoSelect.onchange = function() {
    NetworkTables.putValue('/SmartDashboard/Auto mode/selected', this.value);
};
// Get value of arm height slider when it's adjusted
ui.armPosition.oninput = function() {
    NetworkTables.putValue('/SmartDashboard/arm/encoder', parseInt(this.value));
};

addEventListener('error',(ev)=>{
    ipc.send('windowError',{mesg:ev.message,file:ev.filename,lineNumber:ev.lineno})
})
