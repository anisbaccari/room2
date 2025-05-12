import CanvasComponent from './CanvasComponent.js';
export default class SocketClient {
    constructor(URL, config, playerid) {
        this.URL = URL;
        this.config = config;
        this.playerid = playerid;
        this.paddleSide = null;
        const content = document.getElementById('content');
        if (!content)
            throw new Error("No CanvasComponent");
        this.content = content;
        this.canvas = new CanvasComponent(this.content, config);
        this.isRendering = true;
        this.init(URL);
        this.listen();
    }
    init(URL) {
        this.ws = new WebSocket(URL);
        this.ws.onopen = () => {
            this.ws.addEventListener('message', (msg) => {
                try {
                    const event = JSON.parse(msg.data);
                    const [key, state] = Object.keys(event);
                    const value = event[key];
                    if (state === "error") {
                        throw new Error(`[Client] Invalid state: ${state}`);
                    }
                    switch (value) {
                        case 'init':
                            this.setup(event);
                            break;
                        case 'ready':
                            this.sendReady();
                            break;
                        case 'message':
                            break;
                        case 'player':
                            break;
                        case 'Paddle':
                            this.updateMove(event);
                            break;
                        case 'ball':
                            this.info();
                            this.updateBall(event);
                            break;
                        case 'move':
                            this.handlemove(event);
                            break;
                        default:
                            break;
                    }
                }
                catch (err) {
                    console.error(`Invalid JSON in:`, msg);
                }
            });
            this.ws.addEventListener('close', () => {
                console.log(`Disconnected`);
            });
        };
    }
    setup(event) {
        const key = Object.keys(event)[2];
        this.paddleSide = event[key];
        this.canvas.set_paddleSide(event[key]);
    }
    sendReady() {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                event: "ready",
                succes: true,
                data: this.canvas.config,
            }));
        }
        else {
            console.error("WebSocket is not ready to send messages.");
        }
    }
    sendMove(data) {
        const key = data.key;
        if (["ArrowUp", "ArrowDown", "W", "w", "S", "s"].includes(key)) {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({
                    event: "Paddle",
                    succes: true,
                    data: key,
                    opt: this.playerid,
                }));
            }
            else {
                console.log("[client] sendMove : socket not ready");
            }
        }
    }
    updateBall(event) {
        const x = event.x;
        const z = event.z;
        this.canvas.ball.mesh.position.x += x;
        this.canvas.ball.mesh.position.z += z;
    }
    updateMove(event) {
        const state = event["succes"];
        const paddleSpeed = event["data"];
        if (state) {
            this.canvas.updatePaddle(paddleSpeed);
        }
    }
    updateOthemove(event) {
        switch (event) {
            case 'ArrowUp':
                this.canvas.updateOtherPaddle(true);
                break;
            case 'ArrowDown':
                this.canvas.updateOtherPaddle(false);
                break;
            default:
                console.log(`[updateOthermove] undefined key  ${event}`);
                break;
        }
    }
    handlemove(event) {
        const { data } = this.parseJson(event);
        try {
            const key_opt = Object.keys(event)[3];
            const opt = event[key_opt];
            this.updateOthemove(data);
        }
        catch (error) {
            console.error(`Can't access opt`);
        }
    }
    parseJson(event) {
        const [key_type, key_succes, key_data] = Object.keys(event);
        const type = event[key_type];
        const succes = event[key_succes];
        const data = event[key_data];
        if (!data || !succes || !type) {
            throw new Error(`Error parseJson: ${Object.keys(event)}`);
        }
        return { type, succes, data };
    }
    listen() {
        window.addEventListener("keydown", (event) => {
            this.sendMove(event);
            if (event.key === "z") {
                this.canvas.display();
            }
            if (event.key === "p") {
                this.isRendering = !this.isRendering;
                console.log(this.isRendering ? "Rendering resumed!" : "Rendering paused!");
                if (this.isRendering) {
                    this.canvas.engine.runRenderLoop(() => {
                        this.canvas.scene.render();
                    });
                }
                else {
                    this.canvas.engine.stopRenderLoop();
                }
            }
        });
    }
    info() {
        this.canvas.ball.display();
    }
}
