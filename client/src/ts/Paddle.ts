declare const BABYLON: any;

export default class Paddle {
    width: number = 1;
    height: number = 1;
    depth: number = 10;

    leftPaddle: any = null;
    rightPaddle: any = null;
    moveOtherUp: boolean = false;
    moveOtherDown: boolean = false;
    moveBoxUp: boolean = false;
    moveBoxDown: boolean = false;

    z_min: number = 0;
    z_max: number = 0;
    x_min: number = 0;
    x_max: number = 0;

    paddleSpeed: number = 1.5;
    side: string | null = null;
    box: any = null;
    otherBox: any = null;
    colors: any[] = [];

    constructor(scene: any) {
        this.init(scene, 100);
    }

    init(scene: any, g_width: number): void {
        this.colors = Array(6).fill(new BABYLON.Color3.Red());
        const positions = this.getPositions(g_width);

        this.leftPaddle = this.createPaddle("Left Paddle", positions.left, scene);
        this.rightPaddle = this.createPaddle("Right Paddle", positions.right, scene);
        this.setupInputControls();
    }

    getPositions(g_width: number): { left: number; right: number } {
        return {
            left: (-g_width / 2) + this.width,
            right: (g_width / 2) - this.width,
        };
    }

    createPaddle(name: string, positionX: number, scene: any): any {
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

    displayPosition(): void {
        if (!this.box) return;
        console.log(`[Paddle] Position: x ${this.box.position.x} y ${this.box.position.y} z ${this.box.position.z}`);
    }

    displayOtherPosition(): void {
        if (!this.otherBox) return;
        console.log(`[Paddle] Other Position: x ${this.otherBox.position.x} y ${this.otherBox.position.y} z ${this.otherBox.position.z}`);
    }

    updatePaddlesMovement(): void {
        if (this.moveBoxUp) {
            this.box.position.z += this.paddleSpeed;
        }
        if (this.moveBoxDown) {
            this.box.position.z -= this.paddleSpeed;
        }
        this.displayPosition();
    }

    updateOtherPaddleMovement(direction: boolean): void {
        if (direction) {
            this.otherBox.position.z += this.paddleSpeed;
        } else {
            this.otherBox.position.z -= this.paddleSpeed;
        }
        this.displayOtherPosition();
    }

    setSide(side: string): void {
        this.side = side;
        this.box = this.side === "R" ? this.rightPaddle : this.leftPaddle;
        this.otherBox = this.side === "R" ? this.leftPaddle : this.rightPaddle;
    }

    setBoundaries(x_bound: [number, number], z_bound: [number, number]): void {
        this.z_min = z_bound[0];
        this.z_max = z_bound[1];
        this.x_min = x_bound[0];
        this.x_max = x_bound[1];
        console.log("boundaries:", this.z_min);
    }

    display(): void {
        console.log("RightPaddle:", this.rightPaddle?.position);
        console.log("LeftPaddle:", this.leftPaddle?.position);
        console.log("Paddle boundaries: z_max", this.z_max, "z_min", this.z_min);
        console.log("Paddle boundaries: x_max", this.x_max, "x_min", this.x_min);
        console.log("Paddle depth:", this.depth);
    }

    handler(key: string): void {
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

    setupInputControls(): void {
        window.addEventListener("keydown", (e: KeyboardEvent) => {
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

        window.addEventListener("keyup", (e: KeyboardEvent) => {
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

    update(key: string): void {
        this.handler(key);
        this.updatePaddlesMovement();
    }
}