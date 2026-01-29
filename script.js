document.addEventListener('DOMContentLoaded', () => {
    initCamera();
    initSensors();
});

async function initCamera() {
    const video = document.getElementById('camera-feed');
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'environment',
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            },
            audio: false 
        });
        
        video.srcObject = stream;
        console.log("Cámara iniciada correctamente");
    } catch (err) {
        console.error("Error al acceder a la cámara:", err);
        alert("No se pudo acceder a la cámara. Asegúrate de usar HTTPS o localhost.");
    }
}

function initSensors() {
    const arrow = document.getElementById('direction-arrow');
    
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent).requestPermission === 'function') {
        console.log("iOS detectado: Se requiere permiso manual para la brújula.");
    }

    window.addEventListener('deviceorientation', (event) => {
        let heading = event.alpha;
        
        if (event.webkitCompassHeading) {
            heading = event.webkitCompassHeading;
        }

        if (heading !== null && arrow) {
            const rotation = heading; 
            arrow.setAttribute('camera-orbit', `${rotation}deg 75deg 2m`);
        }
    });

    if (!window.DeviceOrientationEvent) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const deg = x * 360;
            if(arrow) arrow.setAttribute('camera-orbit', `${deg}deg 75deg 2m`);
        });
    }
}
