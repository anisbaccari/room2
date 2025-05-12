
import Ball from './ball.js';
import Paddle from './Paddle.js';
import ConfigGame from './ConfigGame.js';
declare const BABYLON: any;

export default class CanvasComponent {
  public canvas: HTMLCanvasElement;
  public engine: any // BABYLON.Engine;
  public scene: any // BABYLON.Scene;
  public camera:  any //  BABYLON.ArcRotateCamera;
  public light: any //  BABYLON.HemisphericLight;
  public ground: any //  BABYLON.Mesh;
  public paddle: Paddle;
  public ball: Ball;
  public isRendering: boolean;
  public paddleSide: string | null = null;

  constructor(
    private container: HTMLElement,
    public config: ConfigGame
  ) {
    if (!config) throw new Error("No ConfigGame");

    this.isRendering = true;

    this.canvas = document.createElement("canvas");
    this.canvas.style.width = this.config.g_width;
    this.canvas.style.height = this.config.g_height;

    if (this.container) {
      this.container.appendChild(this.canvas);
    }

    // BabylonJS Setup
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    this.camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, -Math.PI / 2, 100, BABYLON.Vector3.Zero(), this.scene);
    this.camera.inputs.removeByType("FreeCameraKeyboardMoveInput");

    this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
    this.light.intensity = 0.7;

    this.ground = BABYLON.MeshBuilder.CreateGround("ground", {
      width: this.config.width_bound,
      height: this.config.height_bound
    }, this.scene);

    this.paddle = new Paddle(this.scene);
    this.ball = new Ball(this.scene);

    this.setConfig();
    this.run();

    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }

  private serializeVector3(v: any ): { x: number; y: number; z: number } {
    return { x: v.x, y: v.y, z: v.z };
  }

  public setConfig(): void {
    const bounds = this.ground.getBoundingInfo().boundingBox;
    this.config.min_ground = this.serializeVector3(bounds.minimumWorld);
    this.config.max_ground = this.serializeVector3(bounds.maximumWorld);

    console.log(`[CanvasComponent] [setConfig] max.x: ${this.config.max_ground.x}`);
  }

  public set_paddleSide(side: string): void {
    this.paddleSide = side;
    console.log(`[CanvasComponent] Paddle side: ${this.paddleSide}`);
    this.paddle.setSide(this.paddleSide);
  }

  public updatePaddle(move: string): void {
    console.log(`[CanvasComponent] updatePaddle: ${move}`);
    this.paddle.update(move);
  }

  public updateOtherPaddle(move: boolean): void {
    console.log(`[CanvasComponent] updateOtherPaddle: ${move}`);
    this.paddle.updateOtherPaddleMovement(move);
  }

  public display(): void {
    const bounds = this.ground.getBoundingInfo().boundingBox;
    const min = bounds.minimumWorld;
    const max = bounds.maximumWorld;
    console.log(`[CanvasComponent] [Ground Size] min: ${min} max: ${max}`);
  }

  public run(): void {
    if (this.isRendering) {
      this.engine.runRenderLoop(() => {
        this.scene.render();
      });
    }
  }
}
