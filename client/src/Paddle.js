export  default class Paddle {
    constructor(scene) {
        this.width = 1;
        this.height = 1;
        this.depth = 10;
        this.leftPaddle = null;
        this.rightPaddle = null;
        this.moveOtherUp = false;
        this.moveOtherDown = false;
        this.moveBoxUp = false;
        this.moveBoxDown = false;
        this.z_min = 0;
        this.z_max = 0;
        this.x_min = 0;
        this.x_max = 0;
        this.paddleSpeed = 1.5;
        this.side = null;
        this.box = null
        this.otherBox  = null
        this.init(scene, 50);
    }
    // Initialize paddles with given scene and ground width
    init(scene, g_width) {
        this.colors = [
            new BABYLON.Color3.Red(),
            new BABYLON.Color3.Red(),
            new BABYLON.Color3.Red(),
            new BABYLON.Color3.Red(),
            new BABYLON.Color3.Red(),
            new BABYLON.Color3.Red(),
        ];
        const positions = this.getPositions(g_width);
        this.leftPaddle = this === null || this === void 0 ? void 0 : this.createPaddle("Left Paddle", positions.left, scene);
        this.rightPaddle = this === null || this === void 0 ? void 0 : this.createPaddle("Right Paddle", positions.right, scene);
        this.setupInputControls();
    }
    getPositions(g_width) {
        return {
            left: -g_width / 2 + this.width / 2,
            right: g_width / 2 - this.width / 2,
        };
    }
    createPaddle(name, positionX, scene) {
        const paddleOpt = {
            width: this.width,
            height: this.height,
            depth: this.depth,
            faceColors: this.colors,
        };
        const paddle = BABYLON.MeshBuilder.CreateBox(name, paddleOpt, scene);
        paddle.position = new BABYLON.Vector3(positionX, 0, 0);
        return paddle;
    }
    updatePaddlesMovement() {


        if (this.moveBoxUp /* && this.leftPaddle.position.z < this.z_max - this.depth / 2 */) {
            this.box.position.z += this.paddleSpeed;
        }
        if (this.moveBoxDown /* && this.leftPaddle.position.z > this.z_min + this.depth / 2 */) {
            this.box.position.z -= this.paddleSpeed;
        }
        if (this.moveOtherUp /* && this.rightPaddle.position.z < this.z_max - this.depth / 2 */) {
            this.otherBox.position.z += this.paddleSpeed;
        }
        if (this.moveOtherDown/*  && this.rightPaddle.position.z > this.z_min + this.depth / 2 */) {
            this.otherBox.position.z -= this.paddleSpeed;
        }

    }

    setSide(side)
    {
        this.side = side;
        console.log(`[Paddleside] : side  ${this.side}`)
        this.box =  this.side == "R" ? this.rightPaddle :  this.leftPaddle
        this.otherBox = this.side == "R" ? this.leftPaddle :  this.rightPaddle
        console.log(`[box] : side  ${this.box}`)
    }
    /// min - max
    setBoundaries(x_bound, z_bound) {
        this.z_min = z_bound[0];
        this.z_max = z_bound[1];
        this.x_min = x_bound[0];
        this.x_max = x_bound[1];
        console.log("boundarie:", this.z_min);
    }
    display() {
        console.log("RightPaddle : ", this === null || this === void 0 ? void 0 : this.rightPaddle.position);
        console.log("LeftPaddle : ", this === null || this === void 0 ? void 0 : this.leftPaddle.position);
        console.log("Paddle boundaries : z_max", this.z_max, " z_min", this.z_min);
        console.log("Paddle boundaries : x_max", this.x_max, " x_min", this.x_min);
        console.log("Paddle depth :", this.depth);
    }
    handler(key) // move on permission server
    {
        console.log(` [Paddle] key pressed ${key}`)
        switch (key) {
            case "ArrowUp":
                this.moveBoxUp = true;
                console.log(" [Paddle] ArrowUp")
                break;
            case "ArrowDown":
                this.moveBoxDown = true;
                console.log(" [Paddle]  ArrowDown")
                break;
            case "W":
            case "w":
                this.moveOtherUp = true;
                console.log(" [Paddle] w ")
                break;
            case "S":
            case "s":
                this.moveOtherDown = true;
                console.log(" [Paddle] S ")
                break;
        }
    }
    // need to incorpore sendevent()
    setupInputControls() {
        // Key Press (Start Movement)
        window.addEventListener('keydown', (e) => {
            console.log(` key pressed  ${e.key} `)
            switch (e.key) {
                case "ArrowUp":
                    this.moveBoxUp = true;
                    break;
                case "ArrowDown":
                    this.moveBoxDown = true;
                    break;
                case "W":
                case "w":
                    this.moveOtherUp = true;
                    break;
                case "S":
                case "s":
                    this.moveOtherDown = true;
                    break;
            }
            // Apply the key event on the paddle 
       // this.updatePaddlesMovement();
        });
        // Key Release (Stop Movement)
        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case "w":
                case "W":
                    this.moveOtherUp = false;
                    break;
                case "s":
                case "S":
                    this.moveOtherDown = false;
                    break;
                case "ArrowUp":
                    this.moveBoxUp = false;
                    break;
                case "ArrowDown":
                    this.moveBoxDown = false;
                    break;
            }
        });
    }
    update(key) {
        // handle move for this box based on server permission 
        this.handler(key)
        this.updatePaddlesMovement(); 
    }
}
