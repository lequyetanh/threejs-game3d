//COLORS
var Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x68c3c0,
};

var HEIGHT, WIDTH,
    mousePos = {
        x: 0,
        y: 0
    };

var danhSachEnemy = [];


// THREEJS RELATED VARIABLES

var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;

//SCREEN & MOUSE VARIABLES


// 3D Models
var airplane;
var gameStatus = 'playing'

function init(event) {
    
    document.addEventListener('mousemove', handleMouseMove, false);
    createScene();
    createLights();
    createPlane();
    createEnnemies();
    createParticles();
    loop();
}

function handleMouseMove(event) {

    var tx;
    var ty;

    if (event.clientX >= 750 && event.clientY >= 350) {
        tx = event.clientX - 750;
        ty = -(event.clientY - 350);
    }

    if (event.clientX >= 750 && event.clientY < 350) {
        tx = event.clientX - 750;
        ty = 350 - event.clientY;
    }

    if (event.clientX < 750 && event.clientY >= 350) {
        tx = -(750 - event.clientX);
        ty = -(event.clientY - 350);
    }

    if (event.clientX < 750 && event.clientY < 350) {
        tx = -(750 - event.clientX);
        ty = 350 - event.clientY;
    }

    mousePos = {
        x: tx / 3,
        y: ty / 3
    };
    // console.log(event.clientX, event.clientY)
    // console.log(mousePos)
}

function changeToaDoX(x) {
    if (x >= 750) {
        return (x - 750) / 3;
    } else {
        return -(750 - x) / 3
    }
}

function changeToaDoY(y) {
    if (y >= 350) {
        return -(y - 350) / 3;
    } else {
        return (350 - y) / 3;
    }
}


window.addEventListener('load', init, false);