const IMG_PATH='../../img';
import * as BABYLON from 'babylonjs';

export default class Ground {
  /* private width: number = 50;
  private height: number = 30; // Babylon.js uses "height" for ground, not depth */

  
    private groundMesh: any = null;
    private material: any = null;
    private scene: any = null;

  constructor(scene: any , dimension: { g_width: number , g_height : number})
  {
   
    this.scene = scene;
    this.init(dimension.g_width, dimension.g_height); // Automatically initialize when created
  }

  private init(g_width: number , g_height : number): void {
    if (this.groundMesh) return; // Prevent duplicate creation
    const options = { width: g_width , height: g_height };
    this.groundMesh = BABYLON.MeshBuilder.CreateGround("ground", options, this.scene);


  // Apply a Standard Material with stone texture
  this.material = new BABYLON.StandardMaterial("stoneMaterial", this.scene);
  const uvScale = 4;
  const texArray: any[]= [];

  // Load Textures
  const diffuseTex = new BABYLON.Texture(`${IMG_PATH}/01_grass_diffuse.jpg`, this.scene);
  this.material.diffuseTexture = diffuseTex;
  texArray.push(diffuseTex);

  const normalTex = new BABYLON.Texture(`${IMG_PATH}/01_grass_normal.jpg`, this.scene);
  this.material.bumpTexture = normalTex;
  this.material.invertNormalMapX = true;
  this.material.invertNormalMapY = true;
  texArray.push(normalTex);

  const aoTex = new BABYLON.Texture(`${IMG_PATH}/01_grass_ao.jpg`, this.scene);
  this.material.ambientTexture = aoTex;
  texArray.push(aoTex);

  // Adjust texture tiling
  texArray.forEach((tex) => {
    tex.uScale = uvScale;
    tex.vScale = uvScale;
  });

  this.groundMesh.material = this.material;
  this.groundMesh.receiveShadows = true;

    //this.setConfig()
  this.setBoundaries();

  //  this.createTribune();
  }

  private serializeVector3(v: any ): { x: number; y: number; z: number }
  {
    return { x: v.x, y: v.y, z: v.z };
  }

  public setConfig(): void 
  {
    const bounds = this.groundMesh.getBoundingInfo().boundingBox;
    this.config.min_ground = this.serializeVector3(bounds.minimumWorld);
    this.config.max_ground = this.serializeVector3(bounds.maximumWorld);

    console.log(`[Ground] [setConfig] min.x: ${ this.config.min_ground.x}`);
    console.log(`[Ground] [setConfig] max.x: ${this.config.max_ground.x}`);
  }

  public getBoundaries(): { min :any , max: any} {
    return  { min :this.config.min_ground , max : this.config.max_ground }
  }
  public setBoundaries(): void {    
    
    /* this.groundMesh._boundingInfo = new BABYLON.BoundingInfo(new BABYLON.Vector3(-this.config.g_width, -this.config.g_width, -this.config.g_width),
  new BABYLON.Vector3(this.config.g_width, this.config.g_width, this.config.g_width)); */
  this.groundMesh._boundingInfo = new BABYLON.BoundingInfo(new BABYLON.Vector3(-50, -50, -50),
  new BABYLON.Vector3(50, 50, 50));
  console.log(`[setBoundaries] minimumWorld : ${Object.values(this.groundMesh._boundingInfo.boundingBox.minimumWorld )}`);
  console.log(`[setBoundaries] maximumWorld : ${Object.values(this.groundMesh._boundingInfo.boundingBox.maximumWorld )}`);
  this.setConfig();
	
  }
}