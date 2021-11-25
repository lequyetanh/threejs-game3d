function loop() {
    updatePlane();
    ennemiesHolder.spawnEnnemies();
    // sea.mesh.rotation.z += .005;
    // sky.mesh.rotation.z += .01;
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}


function updatePlane() {
  if(gameStatus == 'playing'){
    airplane.mesh.position.y = mousePos.y;
    airplane.mesh.position.x = mousePos.x;
  }else{
    airplane.mesh.rotation.x += 0.01;
    airplane.mesh.rotation.z += 0.01;
    airplane.mesh.position.y -= 1;
  }
    airplane.propeller.rotation.x += 1;
}