var AirPlane = function () {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "airPlane";

    // Create the cabin
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

    var geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
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
};

// tạo đối tượng enemy
Ennemy = function () {
    // hình dạng
    // 8: bán kính của tứ diện mặc định là 1
    // 2: số đỉnh của tứ diện mặc định là 0 nếu cho > 0 sẽ ko còn là tứ diện nữa
    var geom = new THREE.TetrahedronGeometry(8, 2);
    // chất liệu
    var mat = new THREE.MeshPhongMaterial({
        color: Colors.red,
        shininess: 0,
        specular: 0xffffff,
        shading: THREE.FlatShading
    });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.castShadow = true;
}

// tập hợp nhưng enemy
EnnemiesHolder = function () {
    // tạo ra 1 đối tượng 3D
    // khi muốn tạo ra 1 đối tượng gồm nhiều đối tượng thì sẽ sử dụng câu lệnh bên dưới
    this.mesh = new THREE.Object3D();
}

// hàm sinh ra nhiều đối tượng enemy
// Holder thể hiện đặc tính của đối tượng
EnnemiesHolder.prototype.spawnEnnemies = function () {
    // lặp tất cả các enemy
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
            console.log("fuck")
            document.getElementById('bomno').muted = false;
            document.getElementById('bomno').play()
            document.getElementById('dongco').pause()
            clearInterval(loadDongCo)
            gameStatus = 'gameover'
        }

        this.mesh.add(ennemy.mesh);
    }
}

//       particlesHolder.spawnParticles(ennemy.mesh.position.clone(), 15, Colors.red, 3);

Particle = function () {
    // đối tượng tứ giác đều
    var geom = new THREE.TetrahedronGeometry(3, 0);
    // vật liệu
    var mat = new THREE.MeshPhongMaterial({
        color: 0x009999,
        shininess: 0,
        specular: 0xffffff,
        shading: THREE.FlatShading
    });
    this.mesh = new THREE.Mesh(geom, mat);
}

// kiểu là sinh ra 1 đối tượng nhưng ko có hình dạng
ParticlesHolder = function () {
    this.mesh = new THREE.Object3D();
    this.particlesInUse = [];
}

// hàm đẻ ra các phần tử con khi va chạm
ParticlesHolder.prototype.spawnParticles = function (pos, density, color, scale) {
    // console.log(density)
    // nếu là coin thì density là 5 nếu là enemy thì density là 15

    var nPArticles = density;
    // tỉ trọng là bao nhiêu thì sinh ra ngần ý đối tượng
    for (var i = 0; i < nPArticles; i++) {
        var particle;
        particle = new Particle();
        this.mesh.add(particle.mesh);
        particle.mesh.visible = true;
        var _this = this;
        // vị trí xuất hiện đối tượng đầu tiên
        particle.mesh.position.y = pos.y;
        particle.mesh.position.x = pos.x;
        // trạng thái và vị trí của đối tượng sau cùng
        particle.explode(pos, color, scale);
    }
}

// truyền vào vị trí, màu sắc, kích thước
Particle.prototype.explode = function (pos, color, scale) {
    var _this = this;
    var _p = this.mesh.parent;
    // màu sẽ trùng với màu của vật mà máy bay đụng
    this.mesh.material.color = new THREE.Color(color);
    this.mesh.material.needsUpdate = true;
    this.mesh.scale.set(scale, scale, scale);
    // tọa độ của đối tượng sau cùng
    var targetX = pos.x + (-1 + Math.random() * 2) * 50;
    var targetY = pos.y + (-1 + Math.random() * 2) * 50;
    // tốc độ đối tượng particle xảy ra
    var speed = .6 + Math.random() * .2;
    // với mỗi đối tượng sẽ quay 1 góc khác
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
        // tọa độ ở vị trí cuối cùng
        x: targetX,
        y: targetY,
        delay: Math.random() * .1,
        // chỉ định hiệu ứng
        ease: Power2.easeOut,
        // xóa bỏ đối tượng
        onComplete: function () {
            if (_p) _p.remove(_this.mesh);
            // _this.mesh.scale.set(1, 1, 1);
            // particlesPool.unshift(_this);
        }
    });
}