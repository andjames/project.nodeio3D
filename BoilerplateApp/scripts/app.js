var demo = (function(){

    "use strict";

    var scene=new THREE.Scene(),
        light= new THREE.AmbientLight(0xffffff),
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
            camera = new THREE.PerspectiveCamera(
                    35,
                    window.innerWidth / window.innerHeight,
                    1,
                    1000
                );
            camera.position.set( 0, 0, 0 );
            scene.add(camera);

            /** PLANE **/
            var pgeometry = new THREE.PlaneGeometry( 10, 10 );
            var pmaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
            plane = new THREE.Mesh(  pgeometry, pmaterial );
           // scene.add(plane);

            /** SUN **/
            var sungeometry = new THREE.SphereGeometry(15, 15, 15);
            var sunmaterial = new THREE.MeshBasicMaterial({color: 0xBBBB00});
                sunny = new THREE.Mesh(sungeometry, sunmaterial);
            scene.add(sunny);
            sunny.name = "sun";
            sunny.position.set(0, 10, -100);
            /** BOX MODELS **/
            box = new THREE.Mesh(
                new THREE.SphereGeometry(
                    20,
                    20,
                    20),
                new THREE.MeshBasicMaterial({color: 0x0099DC, wireframe:true}));
            sunny.add(box);
            box.position.z = 100;
            childBox = new THREE.Mesh(
                new THREE.SphereGeometry(8, 8, 8),
                new THREE.MeshBasicMaterial({color: 0x53A045}));
            childBox.name = "innerbox";
            box.add(childBox);
            box.getObjectByName('innerbox').position.y = 60;

            var boxJR = new THREE.Mesh(
                    new THREE.SphereGeometry(5,5,5),
                    new THREE.MeshBasicMaterial({color:0xE29421, wireframe:true}));
            childBox.add(boxJR);
            boxJR.name ='moonmoon';
            childBox.getObjectByName('moonmoon').position.y = 20;
            /** END OF BOX MODELS **/

            requestAnimationFrame(render);
            /**
            var loader = new THREE.JSONLoader();

            loader.load('./scripts/gooseFull.js', function (geometry) {
                    gooseMaterial = new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture('./scripts/goose.jpg')
                });

               mesh = new THREE.Mesh(geometry, gooseMaterial);
               mesh.scale.set(100, 100, 100);
               console.log(mesh);

               scene.add(mesh);
            }); **/

        camera.position.set(0,900, 0);
        };



function render() {

        TWEEN.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
        sunny.rotation.y += degrees(1);
       // mesh.rotation.y += degrees(0.1);
        box.rotation.x += degrees(1);
        box.rotation.y += degrees(1);
//      box.position.y +=1
        childBox.rotation.x += degrees(3);
        childBox.rotation.y += degrees(3);
        camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
};

document.addEventListener( 'click', tweenCameraPos, false );
window.onload = initScene;



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
