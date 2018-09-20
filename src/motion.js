if ('LinearAccelerationSensor' in window && 'Gyroscope' in window) {
    document.getElementById('moApi').innerHTML = 'Generic Sensor API';

    let lastReadingTimestamp;
    let accelerometer = new LinearAccelerationSensor();
    accelerometer.addEventListener('reading', e => {
        if (lastReadingTimestamp) {
            intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
        }
        lastReadingTimestamp = accelerometer.timestamp;
        accelerationHandler(accelerometer, 'moAccel');
    });
    accelerometer.start();

    if ('GravitySensor' in window) {
        let gravity = new GravitySensor();
        gravity.addEventListener('reading', e => accelerationHandler(gravity, 'moAccelGrav'));
        gravity.start();
    }

    const gyroscope = new Gyroscope();
    gyroscope.addEventListener('reading', e => rotationHandler({
        alpha: gyroscope.x,
        beta: gyroscope.y,
        gamma: gyroscope.z
    }));
    gyroscope.start();

} else if ('DeviceMotionEvent' in window) {
    document.getElementById('moApi').innerHTML = 'Device Motion API';

    const onDeviceMotion = function (eventData) {
        accelerationHandler(eventData.acceleration, 'moAccel');
        accelerationHandler(eventData.accelerationIncludingGravity, 'moAccelGrav');
        rotationHandler(eventData.rotationRate);
        intervalHandler(eventData.interval);
    }

    window.addEventListener('devicemotion', onDeviceMotion, false);
} else {
    document.getElementById('moApi').innerHTML = 'No hay ninguna API disponible';
}

let handleAcceleration = true;
let handleRotation = true;
let handleInterval = true;
const pollingInterval = 1000;

function accelerationHandler(acceleration, targetId) {
    if(handleAcceleration){
        const x = acceleration.x && acceleration.x.toFixed(3);
        const y = acceleration.y && acceleration.y.toFixed(3);
        const z = acceleration.z && acceleration.z.toFixed(3);

        const info = `X: ${x}<br>Y: ${y}<br>Z: ${z}`;
        document.getElementById(targetId).innerHTML = info;

        handleAcceleration = false;
        setTimeout(() => {
            handleAcceleration = true;
        }, pollingInterval);
    }
}

function rotationHandler(rotation) {
    if(handleRotation){
        const alpha = rotation.alpha && rotation.alpha.toFixed(3);
        const beta = rotation.beta && rotation.beta.toFixed(3);
        const gamma = rotation.gamma && rotation.gamma.toFixed(3);

        const info = `Alpha: ${alpha}<br>Beta: ${beta}<br>Gamma: ${gamma}`;
        document.getElementById("moRotation").innerHTML = info;

        handleRotation = false;
        setTimeout(() => {
            handleRotation = true;
        }, pollingInterval);
    }
}

function intervalHandler(interval) {
    if(handleInterval){
        document.getElementById("moInterval").innerHTML = interval;

        handleInterval = false;
        setTimeout(() => {
            handleInterval = true;
        }, pollingInterval);
    }
}