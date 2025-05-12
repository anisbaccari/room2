import Ball from './ball.js';
import Paddle from './Paddle.js';
export default class CanvasComponent {
    constructor(container, config) {
        this.container = container;
        this.config = config;
        this.paddleSide = null;
        if (!config)
            throw new Error("No ConfigGame");
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
    serializeVector3(v) {
        return { x: v.x, y: v.y, z: v.z };
    }
    setConfig() {
        const bounds = this.ground.getBoundingInfo().boundingBox;
        this.config.min_ground = this.serializeVector3(bounds.minimumWorld);
        this.config.max_ground = this.serializeVector3(bounds.maximumWorld);
        console.log(`[CanvasComponent] [setConfig] max.x: ${this.config.max_ground.x}`);
    }
    set_paddleSide(side) {
        this.paddleSide = side;
        console.log(`[CanvasComponent] Paddle side: ${this.paddleSide}`);
        this.paddle.setSide(this.paddleSide);
    }
    updatePaddle(move) {
        console.log(`[CanvasComponent] updatePaddle: ${move}`);
        this.paddle.update(move);
    }
    updateOtherPaddle(move) {
        console.log(`[CanvasComponent] updateOtherPaddle: ${move}`);
        this.paddle.updateOtherPaddleMovement(move);
    }
    display() {
        const bounds = this.ground.getBoundingInfo().boundingBox;
        const min = bounds.minimumWorld;
        const max = bounds.maximumWorld;
        console.log(`[CanvasComponent] [Ground Size] min: ${min} max: ${max}`);
    }
    run() {
        if (this.isRendering) {
            this.engine.runRenderLoop(() => {
                this.scene.render();
            });
        }
    }
}
