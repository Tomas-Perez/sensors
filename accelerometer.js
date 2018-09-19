if ('LinearAccelerationSensor' in window && 'Gyroscope' in window) {
    document.getElementById('moApi').innerHTML = 'Generic Sensor API';

    let lastReadingTimestamp;
    let accelerometer = new LinearAccelerationSensor();
    accelerometer.addEventListener('reading', e => {
        if (lastReadingTimestamp) {
            intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
        }
        lastReadingTimestamp = accelerometer.timestamp
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
    document.getElementById('moApi').innerHTML = 'No Accelerometer & Gyroscope API available';
}

function accelerationHandler(acceleration, targetId) {
    const x = acceleration.x && acceleration.x.toFixed(3);
    const y = acceleration.y && acceleration.y.toFixed(3);
    const z = acceleration.z && acceleration.z.toFixed(3)

    const info = `[X: ${x}, Y: ${y}, Z: ${z}]`
    document.getElementById(targetId).innerHTML = info;
}

function rotationHandler(rotation) {
    const alpha = rotation.alpha && rotation.alpha.toFixed(3);
    const beta = rotation.beta && rotation.beta.toFixed(3);
    const gamma = rotation.gamma && rotation.gamma.toFixed(3);

    const info = `[Alpha: ${alpha}, Beta: ${beta}, Gamma: ${gamma}]`
    document.getElementById("moRotation").innerHTML = info;
}

function intervalHandler(interval) {
    document.getElementById("moInterval").innerHTML = interval;
}