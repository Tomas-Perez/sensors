function update(illuminance) {
    document.getElementById("value").innerHTML = illuminance + " lux";

    const colorPart = luxToColorMap(illuminance).toFixed(0);
    document.getElementById("box").style.backgroundColor =
        "rgb(" + colorPart + ", " + colorPart + ", " + colorPart + ")";

    console.log(colorPart);
}

if ("AmbientLightSensor" in window) {
    try {
        const sensor = new AmbientLightSensor();
        sensor.addEventListener("reading", function (event) {
            update(sensor.illuminance);
        });
        sensor.start();
    } catch (e) {
        console.error(e);
    }
}
if ("ondevicelight" in window) {
    function onUpdateDeviceLight(event) {
        update(event.value);
    }

    window.addEventListener("devicelight", onUpdateDeviceLight);
}


function map(input, input_start, input_end, output_start, output_end) {
    return output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start);
}

function luxToColorMap(value){
    const minColor = 0;
    const maxColor = 255;
    const minLux = 0;
    const maxLux = 1000;

    return map(value, minLux, maxLux, minColor, maxColor);
}