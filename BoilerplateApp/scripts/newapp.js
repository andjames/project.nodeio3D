var demo = (function(){

    "use strict";

    var scene=new THREE.Scene(),
        light= new THREE.AmbientLight(0xaaa),
        renderer,
        camera,
        renderer = new THREE.WebGLRenderer(),
        box,
        childBox,
        ground,
        controls=null;
   	function initScene(){
        var loader = new THREE.JSONLoader(),
        mesh;

        loader.load('gooseFull.js', function (geometry) {
           var gooseMaterial = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('goose.jpg')
        });

       mesh = new THREE.Mesh(geometry, gooseMaterial);
       mesh.scale.set(1000, 1000, 1000);

       scene.add(mesh);
    });



        };



//convert degrees to radians
function degrees(deg){
    var radians = (deg * (Math.PI / 180));
    return radians;
}

function render() {
    //box.scale.set(2,1,1);
        TWEEN.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);

        camera.lookAt(new THREE.Vector3( 0, 0, 0 ));

};

//document.addEventListener( 'click', tweenCameraPos, false );
window.onload = initScene;
})();
