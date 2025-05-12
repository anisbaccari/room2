export default class Paddle {
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
        this.box = null;
        this.otherBox = null;
        this.colors = [];
        this.init(scene, 100);
    }
    init(scene, g_width) {
        this.colors = Array(6).fill(new BABYLON.Color3.Red());
        const positions = this.getPositions(g_width);
        this.leftPaddle = this.createPaddle("Left Paddle", positions.left, scene);
        this.rightPaddle = this.createPaddle("Right Paddle", positions.right, scene);
        this.setupInputControls();
    }
    getPositions(g_width) {
        return {
            left: (-g_width / 2) + this.width,
            right: (g_width / 2) - this.width,
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
    displayPosition() {
        if (!this.box)
            return;
        console.log(`[Paddle] Position: x ${this.box.position.x} y ${this.box.position.y} z ${this.box.position.z}`);
    }
    displayOtherPosition() {
        if (!this.otherBox)
            return;
        console.log(`[Paddle] Other Position: x ${this.otherBox.position.x} y ${this.otherBox.position.y} z ${this.otherBox.position.z}`);
    }
    updatePaddlesMovement() {
        if (this.moveBoxUp) {
            this.box.position.z += this.paddleSpeed;
        }
        if (this.moveBoxDown) {
            this.box.position.z -= this.paddleSpeed;
        }
        this.displayPosition();
    }
    updateOtherPaddleMovement(direction) {
        if (direction) {
            this.otherBox.position.z += this.paddleSpeed;
        }
        else {
            this.otherBox.position.z -= this.paddleSpeed;
        }
        this.displayOtherPosition();
    }
    setSide(side) {
        this.side = side;
        this.box = this.side === "R" ? this.rightPaddle : this.leftPaddle;
        this.otherBox = this.side === "R" ? this.leftPaddle : this.rightPaddle;
    }
    setBoundaries(x_bound, z_bound) {
        this.z_min = z_bound[0];
        this.z_max = z_bound[1];
        this.x_min = x_bound[0];
        this.x_max = x_bound[1];
        console.log("boundaries:", this.z_min);
    }
    display() {
        var _a, _b;
        console.log("RightPaddle:", (_a = this.rightPaddle) === null || _a === void 0 ? void 0 : _a.position);
        console.log("LeftPaddle:", (_b = this.leftPaddle) === null || _b === void 0 ? void 0 : _b.position);
        console.log("Paddle boundaries: z_max", this.z_max, "z_min", this.z_min);
        console.log("Paddle boundaries: x_max", this.x_max, "x_min", this.x_min);
        console.log("Paddle depth:", this.depth);
    }
    handler(key) {
        console.log(`[Paddle] key pressed: ${key}`);
        switch (key) {
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
            default:
                break;
        }
    }
    setupInputControls() {
        window.addEventListener("keydown", (e) => {
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
                case "i":
                    this.displayPosition();
                    this.displayOtherPosition();
                    break;
            }
        });
        window.addEventListener("keyup", (e) => {
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
        this.handler(key);
        this.updatePaddlesMovement();
    }
}
