export default class Ball {
    constructor(scene, position = { x: 0, y: 1, z: 0 }) {
        // Create the ball mesh
        this.mesh = BABYLON.MeshBuilder.CreateSphere("ball", { diameter: 4 }, scene);
        this.mesh.position.set(position.x, position.y, position.z);
        // Set movement vectors
        this.ballVector = new BABYLON.Vector3(0.6, 0, 0.1);
        this.ballSpeed = new BABYLON.Vector3(1, 0, 0.5);
        // Optional material
        const material = new BABYLON.StandardMaterial("ballMaterial", scene);
        material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Red
        this.mesh.material = material;
    }
    display() {
        // console.log("Ball position:", this.mesh.position);
    }
    update(ballVector) {
        if (!ballVector)
            return;
        // You can uncomment and adjust logic here if needed
        // this.mesh.position.addInPlace(this.ballVector);
    }
    reset() {
        const x = this.mesh.position.x * -1;
        this.mesh.position.set(x, 0, 0);
    }
}
