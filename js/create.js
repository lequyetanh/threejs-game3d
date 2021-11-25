//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createScene() {

    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    scene = new THREE.Scene();
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 200;

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
}

// LIGHTS

var ambientLight, hemisphereLight, shadowLight;

function createLights() {

    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9)
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);
    shadowLight.position.set(150, 350, 350);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    scene.add(hemisphereLight);
    scene.add(shadowLight);
}

function createPlane() {
    airplane = new AirPlane();
    airplane.mesh.scale.set(.25, .25, .25);
    airplane.mesh.position.x = 0;
    airplane.mesh.position.y = 0;
    airplane.mesh.position.z = 0;
    scene.add(airplane.mesh);
}

var ennemiesPool = [];
var particlesPool = [];

function createEnnemies() {

    // ennemy.mesh.scale.set(1, 1, 1);
    // ennemy.mesh.position.x = changeToaDoX(Math.floor(Math.random() * 1400));
    // ennemy.mesh.position.y = changeToaDoY(Math.floor(Math.random() * 600));
    // ennemy.mesh.position.z = 0;

    for (var i = 0; i < 20; i++) {
        var ennemy = new Ennemy();
        ennemy.mesh.scale.set(1, 1, 1);
        ennemy.mesh.position.x = changeToaDoX(Math.floor(Math.random() * 1500));
        // ennemy.mesh.position.x = changeToaDoX(1500);
        ennemy.mesh.position.y = changeToaDoY(Math.floor(Math.random() * 600));
        ennemy.mesh.position.z = 0;
        ennemiesPool.push(ennemy);
    }
    ennemiesHolder = new EnnemiesHolder();
    //ennemiesHolder.mesh.position.y = -game.seaRadius;
    scene.add(ennemiesHolder.mesh)
}

function createParticles(){
    for (var i=0; i<20; i++){
      var particle = new Particle();
      particlesPool.push(particle);
    }
    particlesHolder = new ParticlesHolder();
    //ennemiesHolder.mesh.position.y = -game.seaRadius;
    scene.add(particlesHolder.mesh)
  }