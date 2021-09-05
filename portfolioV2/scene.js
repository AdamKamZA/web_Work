export default class Scene {
    /**
     * 
     * @param {*} DOM Element that the scene will be displayed in 
     * @param {*} controller controller element of the 3d model 
     */
    constructor(DOM) {
        let DOMval = DOM.getBoundingClientRect()
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(DOMval.width, DOMval.height);
        this.model = new THREE.Object3D();
        this.camera = new THREE.PerspectiveCamera(30, 16 / 9, 0.1, 500);
        this.camera.position.set(0, 0, 6);
        this.scene.add(this.camera);
        //this.Light_am = new THREE.AmbientLight(0xffffff, 2);
        this.Light_rectTop = new THREE.RectAreaLight(0xFFFFFF, 3, 10, 10);
        this.Light_rect1 = new THREE.RectAreaLight(0x216FFF, 3, 50, 50);
        this.Light_rect2 = new THREE.RectAreaLight(0xAF11FF, 3, 50, 50);
        this.Light_rectTop.lookAt(0,0,0);
        this.Light_rect1.lookAt(0,0,0);
        this.Light_rect2.lookAt(0,0,0);
        this.Light_rectTop.position.set(0,5,0);
        this.Light_rect1.position.set(-3,2,2);
        this.Light_rect2.position.set(3,2,2);
        this.scene.add(this.Light_rect1);
        this.scene.add(this.Light_rect2);
        //this.scene.add(this.Light_am);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        //not showing up
        this.loadModel("./images/Mev2.glb");
        DOM.appendChild(this.renderer.domElement);
    }
    /** 
    * @param {src} url The url location to the obj
    * @param {obj} objRef The object in main that we use to control this model
    */
    loadModel(url) {
        const loader = new THREE.GLTFLoader();
        loader.load(url, (gltf) => {
            gltf.scene.traverse(c => {
                c.castShadow = true;
            });
            this.model = gltf.scene.children[0];
            gltf.scene.position.set(0,-1,0);
            this.scene.add(gltf.scene);
        })
    }

    update(dt) {
        this.controls.update();
        this.model.rotateY(0.3*dt);
        this.renderer.render(this.scene, this.camera);
    }
}


