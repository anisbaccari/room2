import Ball from './ball.js'
import Paddle from './Paddle.js'

export default class CanvasComponent {
    constructor(containerId,ConfigGame) {
        
        this.config = ConfigGame
        if(!this.config)
            throw new Error(" no ConfigGame");
 
        this.container = containerId
        this.isRendering = true;
        this.paddleSide = null;


        this.canvas = document.createElement("canvas");
        this.canvas.style.width = this.config.g_width;
        this.canvas.style.height = this.config.g_height;
        
        // Add the object to the page 
        
        if(this.container)
            this.container.appendChild(this.canvas)

        /* ===========BABYLONEJS================== */

        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, -Math.PI / 2, 100, BABYLON.Vector3.Zero(), this.scene);
        // this.camera.attachControl(this.canvas, true);
        this.camera.inputs.removeByType("FreeCameraKeyboardMoveInput");
        this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        this.light.intensity = 0.7;


          /* =========== [GROUND] ================== */
        this.ground = BABYLON.MeshBuilder.CreateGround("ground", {
            width: this.config.width_bound,
            height: this.config.height_bound,
        }, this.scene);
        
        /* ============ [PLAYERS] ============ */
          
        this.paddle = new Paddle(this.scene)
            // ball 
        this.ball = new Ball(this.scene)

        /* ================================== */
        this.setConfig();
        this.run();
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }



    // Helper to convert Vector3 to plain object
    serializeVector3(v) {
        return { x: v.x, y: v.y, z: v.z };
    }

    setConfig() {
        const bounds = this.ground.getBoundingInfo().boundingBox;

        this.config.min_ground = this.serializeVector3(bounds.minimumWorld);
        this.config.max_ground = this.serializeVector3(bounds.maximumWorld);

        console.log(`[CanvasComponent] [setConfig] max.x: ${this.config.max_ground.x}`);
    }





    set_paddleSide(side)
    {
        this.paddleSide = side; 
        console.log(`[ [CanvasCompenent] |  : ${this.paddleSide}`)

        this.paddle.setSide(this.paddleSide);
    }

    updatePaddle(move)
    {
        console.log(`[ [CanvasCompenent] : ${move}`)
        this.paddle.update(move);
    }
    updateOtherPaddle(move)
    {
        console.log(`[ [CanvasCompenent] : ${move}`)
        this.paddle.updateOtherPaddleMovement(move);
    }



    display()
    {
        const bounds = this.ground.getBoundingInfo().boundingBox;
        const min = bounds.minimumWorld;
        const max = bounds.maximumWorld;
        console.log(`[ [CanvasCompenent]  [Ground - size ] min: ${min}    max: ${max}`)
    }
    run() {
        // Start the render loop initially
        if (this.isRendering) {
            this.engine.runRenderLoop(() => {
            //    this.pong.update(); 
                this.scene.render();
            });
        }
    }
}
