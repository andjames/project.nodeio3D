var demo = (function(){

    "use strict";

    var scene=new THREE.Scene(),
        light = new THREE.AmbientLight(0xffffff),
        lighter = new THREE.SpotLight(0xFFFFFF, 2.5),
        renderer,
        mesh,
        plane,
        gooseMaterial,
        camera,
        sunny,
        renderer = new THREE.WebGLRenderer(),
        box,
        childBox,
        ground,
        controls=null;

        function initScene(){

            renderer.setSize( window.innerWidth, window.innerHeight );
            document.getElementById("webgl-container").appendChild(renderer.domElement);
            scene.add(light);
            light2.position.set( 500, 100, 0 );
            scene.add(light2);
            scene.fog = new THREE.FogExp2( 0x000000, 0.0009 );
            camera = new THREE.PerspectiveCamera(
                    35,
                    window.innerWidth / window.innerHeight,
                    1,
                    1000
                );
            camera.position.set( 0, 0, 0 );

     /**    var loader = new THREE.JSONLoader();
            loader.load('./scripts/gooseFull.js', function (geometry) {
                    var materials = new THREE.MeshBasicMaterial({
                        map:new THREE.ImageUtils.loadTexture('./scripts/goose.jpg')
                    });
               mesh = new THREE.Mesh(geometry, materials);
               mesh.scale.set(100, 100, 100);
               scene.add(mesh);
            });

            var loader = new THREE.ObjectLoader();
            loader.load("./scripts/eiffel-tower-threejs/eiffel-tower.json",function ( obj ) {
                 scene.add( obj );
            });**/

            /** PLANE **/
         /**   var pgeometry = new THREE.PlaneGeometry( 100, 100 );
            var pmaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
            plane = new THREE.Mesh(  pgeometry, pmaterial );
            camera.add(plane); **/
            scene.add(camera);

            /** SUN **/
            var sungeometry = new THREE.SphereGeometry(20, 20, 20);
            var sunmaterial = new THREE.MeshBasicMaterial({color: 0xBBBB00, wireframe:false});
            sunny = new THREE.Mesh(sungeometry, sunmaterial);
            scene.add(sunny);
            sunny.position.set(0, 100, 0);

            /** BOX MODELS **/
            box = new THREE.Mesh(
                new THREE.SphereGeometry(
                    15,
                    15,
                    15),
                new THREE.MeshBasicMaterial({color: 0x0099DC, wireframe:false}));
            sunny.add(box);
            box.position.z = 100;

            childBox = new THREE.Mesh(
                new THREE.SphereGeometry(8, 8, 8),
                new THREE.MeshPhongMaterial());
            childBox.name = "innerbox";
            box.add(childBox);

            box.getObjectByName('innerbox').position.y = 40;

            var boxJR = new THREE.Mesh(
                    new THREE.SphereGeometry(
                        5,
                        5,
                        3),
                    new THREE.MeshBasicMaterial({color:0xE29421, wireframe:false}));
            childBox.add(boxJR);
            boxJR.name ='moonmoon';
            childBox.getObjectByName('moonmoon').position.y = 15;

        /** END OF BOX MODELS **/
        requestAnimationFrame(render);
        camera.position.set(0,900, 0);
        };



function render() {

        TWEEN.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
        sunny.rotation.y += degrees(0.5);
      //  mesh.rotation.y += degrees(0.1);
        box.rotation.x += degrees(1);
        box.rotation.y += degrees(1);
//      box.position.y +=1
        childBox.rotation.x += degrees(3);
        childBox.rotation.y += degrees(3);
        camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
};

//document.addEventListener( 'click', tweenCameraPos, false );
document.addEventListener('click', mouseClickLine, false);
window.onload = initScene;

function mouseClickLine(e){
    e.preventDefault();
    var projector = new THREE.Projector();
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    projector.unprojectVector(vector, camera);
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    console.log(scene.children[4].children);

    var intersects = raycaster.intersectObjects(scene.children );
    console.log(intersects);
    if (intersects.length > 0) {
        console.log(intersects.length);
        intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
    }


}



function tweenCameraPos(){

    if(camera.position.y >= 900){

        new TWEEN.Tween( camera.position ).to( {
            x:100,
            y:0,
            z:900 }, 4000 ).start();

    } else{

        new TWEEN.Tween( camera.position ).to( {
            x:100,
            y:900,
            z:0 }, 4000 ).start();

    }
}

//convert degrees to radians
function degrees(deg){
    var radians = (deg * (Math.PI / 180));
    return radians;
}


})();
