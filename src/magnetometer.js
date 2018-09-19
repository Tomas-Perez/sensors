if('magnetometer' in navigator){
    const magnetometer = new Magnetometer();
    magnetometer.addEventListener('reading', e => mangetometerHandler({
        x: magnetometer.x,
        y: magnetometer.y,
        z: magnetometer.z
    }));
    magnetometer.start();
} else {
    document.getElementById('magBody').innerHTML = 'Magnetómetro no soportado.';
}

function mangetometerHandler(reading){
    document.getElementById('magX').innerHTML = reading.x && reading.x.toFixed(3);
    document.getElementById('magY').innerHTML = reading.y && reading.y.toFixed(3);
    document.getElementById('magZ').innerHTML = reading.z && reading.z.toFixed(3);
}