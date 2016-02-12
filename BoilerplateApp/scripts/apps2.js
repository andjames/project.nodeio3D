var demo = (function(){

    "use strict";

    var scene=new THREE.Scene(),
        light= new THREE.AmbientLight(0xffffff),
        sphere = new THREE.SphereGeometry( 5, 100, 100 ),
        light2 = new THREE.PointLight( 0x00FF00, 400, 100 ),
        light3 = new THREE.PointLight(0xff00ff, 400, 100 ),
        renderer,
        mesh,
        plane,
        gooseMaterial,
        camera,
        sunny,
        renderer = new THREE.CanvasRenderer(),
        box,
        childBox,
        ground,
        controls=null;

        function initScene(){

            renderer.setSize( window.innerWidth, window.innerHeight );
            document.getElementById("webgl-container").appendChild(renderer.domElement);
            scene.add(light);
            scene.add(light2);
            scene.add(light3);
            var PI2 = Math.PI * 2;
            var program = function ( context ) {

                context.beginPath();
                context.arc( 10, 0, 2, 0, PI2, true );
                context.fill();

            };


            var sprite = new THREE.Sprite( new THREE.SpriteCanvasMaterial( { color: 0x0077bb, program: program } ) );
            light2.add( sprite );

             var sprite2 = new THREE.Sprite( new THREE.SpriteCanvasMaterial( { color: 0xff0000, program: program } ) );
            light3.add( sprite2 );


        //    scene.fog = new THREE.FogExp2( 'red', 0.0016 );

            camera = new THREE.PerspectiveCamera(
                    35,
                    window.innerWidth / window.innerHeight,
                    1,
                    1000
                );


            /** SUN **/
            var sungeometry = new THREE.SphereGeometry(50,5,5);
            var sunmaterial = new THREE.MeshLambertMaterial({color: 0xaaaaaa, wireframe:true});
            sunny = new THREE.Mesh(sungeometry, sunmaterial);
            scene.add(sunny);
            sunny.position.set(0, 0, 0);
            /** BOX MODELS **/
            /** box = new THREE.Mesh(
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

            box.getObjectByName('innerbox').position.y = 40; **/

        /** END OF BOX MODELS **/


        requestAnimationFrame(render);
        camera.position.set(600,200, 10);
        };


function render() {
        var time = Date.now() * 0.0005;
        TWEEN.update();

        requestAnimationFrame(render);
        sunny.rotation.y += degrees(0.5);
        sunny.rotation.x += degrees(0.5);

        light2.position.x = Math.cos( time * 2.9 ) * 180;
        light2.position.y = Math.sin( time * 1.2 ) * 20;
        light2.position.z = Math.sin( time * 2.5 ) * 60;

        light3.position.x = Math.cos( time * 2.9 ) * 180;
        light3.position.y = Math.sin( time * 1.2 ) * 20;
        light3.position.z = Math.sin( time * 2.9 ) * 60;
        camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
        renderer.render(scene, camera);
};




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


//convert degrees to radians
function degrees(deg){
    var radians = (deg * (Math.PI / 180));
    return radians;
}

document.addEventListener('click', mouseClickLine, false);
window.onload = initScene;

})();
