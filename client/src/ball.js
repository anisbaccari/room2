export default class Ball {
    constructor(scene, position = { x: 0, y: 1, z: 0 }) {
        this.mesh = BABYLON.MeshBuilder.CreateSphere("ball", { diameter: 4 }, scene);
        this.mesh.position.set(position.x, position.y, position.z);
        this.ballVector = new BABYLON.Vector3(0.6, 0, 0.1);
        // Optional: Add material
        const material = new BABYLON.StandardMaterial("ballMaterial", scene);
        material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Red color
        this.mesh.material = material;
        this.ballSpeed = new BABYLON.Vector3(1, 0, 0.5);
  
    }
    display() {
   //     console.log("Ball :", this.mesh.position);
    }
    update(ballVector) {
        if (!ballVector)
            return;
        // this.mesh.position.addInPlace(this.ballVector)
    }
    reset() {
        
       
        let x = this.mesh.position.x * -1 ; 
        this.mesh.position.set(x, 0, 0);
    }
}