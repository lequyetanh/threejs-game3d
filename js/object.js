var AirPlane = function () {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "airPlane";

    // Create the cabin
    // body
    var geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
    var matCockpit = new THREE.MeshPhongMaterial({
        color: Colors.red,
        shading: THREE.FlatShading
    });
    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);

    // Create Engine
    // head
    var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
    var matEngine = new THREE.MeshPhongMaterial({
        color: Colors.white,
        shading: THREE.FlatShading
    });
    var engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);

    // Create Tailplane
    var geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    var matTailPlane = new THREE.MeshPhongMaterial({
        color: Colors.red,
        shading: THREE.FlatShading
    });
    var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-35, 25, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);

    // Create Wing

    var geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
    var matSideWing = new THREE.MeshPhongMaterial({
        color: Colors.red,
        shading: THREE.FlatShading
    });
    var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.position.set(0, 0, 0);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);

    // Propeller
    var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    var matPropeller = new THREE.MeshPhongMaterial({
        color: Colors.brown,
        shading: THREE.FlatShading
    });
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    // Blades
    var geomBlade = new THREE.BoxGeometry(1, 70, 10, 1, 1, 1);
    var matBlade = new THREE.MeshPhongMaterial({
        color: Colors.brownDark,
        shading: THREE.FlatShading
    });

    var blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(50, 0, 0);
    this.mesh.add(this.propeller);

    // canh duoi
    var geomPropeller2 = new THREE.BoxGeometry(5, 40, 10, 1, 1, 1);
    var matPropeller2 = new THREE.MeshPhongMaterial({
        color: Colors.brown,
        shading: THREE.FlatShading
    });
    this.propeller2 = new THREE.Mesh(geomPropeller2, matPropeller2);
    this.propeller2.castShadow = true;
    this.propeller2.receiveShadow = true;

    // Blades
    var geomBlade2 = new THREE.BoxGeometry(170, 1, 20, 1, 1, 1);
    var matBlade2 = new THREE.MeshPhongMaterial({
        color: Colors.brownDark,
        shading: THREE.FlatShading
    });

    var blade2 = new THREE.Mesh(geomBlade2, matBlade2);
    blade2.position.set(0, 20, 0);
    blade2.castShadow = true;
    blade2.receiveShadow = true;
    this.propeller2.add(blade2);
    this.propeller2.position.set(0, 30, 0);
    this.mesh.add(this.propeller2);
};



// t???o ?????i t?????ng enemy
Ennemy = function () {
    // h??nh d???ng
    // 8: b??n k??nh c???a t??? di???n m???c ?????nh l?? 1
    // 2: s??? ?????nh c???a t??? di???n m???c ?????nh l?? 0 n???u cho > 0 s??? ko c??n l?? t??? di???n n???a
    var geom = new THREE.TetrahedronGeometry(8, 2);
    // ch???t li???u
    var mat = new THREE.MeshPhongMaterial({
        color: Colors.red,
        shininess: 0,
        specular: 0xffffff,
        shading: THREE.FlatShading
    });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.castShadow = true;
}

// t???p h???p nh???ng enemy
EnnemiesHolder = function () {
    // t???o ra 1 ?????i t?????ng 3D
    // khi mu???n t???o ra 1 ?????i t?????ng g???m nhi???u ?????i t?????ng th?? s??? s??? d???ng c??u l???nh b??n d?????i
    this.mesh = new THREE.Object3D();
}

// h??m sinh ra nhi???u ?????i t?????ng enemy
// Holder th??? hi???n ?????c t??nh c???a ?????i t?????ng
EnnemiesHolder.prototype.spawnEnnemies = function () {
    // l???p t???t c??? c??c enemy
    for (var i = 0; i < ennemiesPool.length; i++) {
        var ennemy = ennemiesPool[i];
        // console.log(ennemy.mesh.position.x)

        ennemy.mesh.position.x = (ennemy.mesh.position.x - 3);
        // ennemy.mesh.rotation.x += 0.1;
        ennemy.mesh.rotation.z += 0.1;
        // ennemy.mesh.position.y = changeToaDoY();
        if (ennemy.mesh.position.x < -250) {
            ennemy.mesh.position.x = changeToaDoX(1500);
            ennemy.mesh.position.y = changeToaDoY(Math.floor(Math.random() * 600));
        }
        if (Math.abs(ennemy.mesh.position.x - airplane.mesh.position.x) < 7 && Math.abs(ennemy.mesh.position.y - airplane.mesh.position.y) < 7) {
            particlesHolder.spawnParticles(ennemy.mesh.position.clone(), 15, 0xf25346, 3);
            document.getElementById('bomno').muted = false;
            document.getElementById('bomno').play()
            document.getElementById('dongco').pause()
            clearInterval(loadDongCo)
            gameStatus = 'gameover'
        }
        this.mesh.add(ennemy.mesh);
    }
}

//particlesHolder.spawnParticles(ennemy.mesh.position.clone(), 15, Colors.red, 3);

Particle = function () {
    // ?????i t?????ng t??? gi??c ?????u
    var geom = new THREE.TetrahedronGeometry(3, 0);
    // v???t li???u
    var mat = new THREE.MeshPhongMaterial({
        color: 0x009999,
        shininess: 0,
        specular: 0xffffff,
        shading: THREE.FlatShading
    });
    this.mesh = new THREE.Mesh(geom, mat);
}

// ki???u l?? sinh ra 1 ?????i t?????ng nh??ng ko c?? h??nh d???ng
ParticlesHolder = function () {
    this.mesh = new THREE.Object3D();
    this.particlesInUse = [];
}

// h??m ????? ra c??c ph???n t??? con khi va ch???m
ParticlesHolder.prototype.spawnParticles = function (pos, density, color, scale) {
    // console.log(density)
    // n???u l?? coin th?? density l?? 5 n???u l?? enemy th?? density l?? 15

    var nPArticles = density;
    // t??? tr???ng l?? bao nhi??u th?? sinh ra ng???n ?? ?????i t?????ng
    for (var i = 0; i < nPArticles; i++) {
        var particle;
        particle = new Particle();
        this.mesh.add(particle.mesh);
        particle.mesh.visible = true;
        var _this = this;
        // v??? tr?? xu???t hi???n ?????i t?????ng ?????u ti??n
        particle.mesh.position.y = pos.y;
        particle.mesh.position.x = pos.x;
        // tr???ng th??i v?? v??? tr?? c???a ?????i t?????ng sau c??ng
        particle.explode(pos, color, scale);
    }
}

// truy???n v??o v??? tr??, m??u s???c, k??ch th?????c
Particle.prototype.explode = function (pos, color, scale) {
    var _this = this;
    var _p = this.mesh.parent;
    // m??u s??? tr??ng v???i m??u c???a v???t m?? m??y bay ?????ng
    this.mesh.material.color = new THREE.Color(color);
    this.mesh.material.needsUpdate = true;
    this.mesh.scale.set(scale, scale, scale);
    // t???a ????? c???a ?????i t?????ng sau c??ng
    var targetX = pos.x + (-1 + Math.random() * 2) * 50;
    var targetY = pos.y + (-1 + Math.random() * 2) * 50;
    // t???c ????? ?????i t?????ng particle x???y ra
    var speed = .6 + Math.random() * .2;
    // v???i m???i ?????i t?????ng s??? quay 1 g??c kh??c
    TweenMax.to(this.mesh.rotation, speed, {
        // 
        x: Math.random() * 12,
        y: Math.random() * 12
    });
    TweenMax.to(this.mesh.scale, speed, {
        x: .1,
        y: .1,
        z: .1
    });
    TweenMax.to(this.mesh.position, speed, {
        // t???a ????? ??? v??? tr?? cu???i c??ng
        x: targetX,
        y: targetY,
        delay: Math.random() * .1,
        // ch??? ?????nh hi???u ???ng
        ease: Power2.easeOut,
        // x??a b??? ?????i t?????ng
        onComplete: function () {
            if (_p) _p.remove(_this.mesh);
            // _this.mesh.scale.set(1, 1, 1);
            // particlesPool.unshift(_this);
        }
    });
}