import CanvasComponent from './CanvasComponent.js';
import ConfigGame from './ConfigGame.js';

interface ServerEvent {
  [key: string]: any;
}

export default class SocketClient {
  private ws!: WebSocket;
  private canvas: CanvasComponent;
  private isRendering: boolean;
  private content: HTMLElement;
  private paddleSide: string | null = null;

  constructor(
    private URL: string,
    public config: ConfigGame,
    public playerid: number
  ) {
    const content = document.getElementById('content');
    if (!content) throw new Error("No CanvasComponent");

    this.content = content;
    this.canvas = new CanvasComponent(this.content, config);
    this.isRendering = true;

    this.init(URL);
    this.listen();
  }

  private init(URL: string): void {
    this.ws = new WebSocket(URL);

    this.ws.onopen = () => {
      this.ws.addEventListener('message', (msg: MessageEvent) => {
        try {
          const event: ServerEvent = JSON.parse(msg.data);
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
        } catch (err) {
          console.error(`Invalid JSON in:`, msg);
        }
      });

      this.ws.addEventListener('close', () => {
        console.log(`Disconnected`);
      });
    };
  }

  private setup(event: ServerEvent): void {
    const key = Object.keys(event)[2];
    this.paddleSide = event[key];
    this.canvas.set_paddleSide(event[key]);
  }

  private sendReady(): void {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          event: "ready",
          succes: true,
          data: this.canvas.config,
        })
      );
    } else {
      console.error("WebSocket is not ready to send messages.");
    }
  }

  public sendMove(data: KeyboardEvent): void {
    const key = data.key;

    if (["ArrowUp", "ArrowDown", "W", "w", "S", "s"].includes(key)) {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(
          JSON.stringify({
            event: "Paddle",
            succes: true,
            data: key,
            opt: this.playerid,
          })
        );
      } else {
        console.log("[client] sendMove : socket not ready");
      }
    }
  }

  private updateBall(event: ServerEvent): void {
    const x = event.x;
    const z = event.z;
    this.canvas.ball.mesh.position.x += x;
    this.canvas.ball.mesh.position.z += z;
  }

  private updateMove(event: ServerEvent): void {
    const state = event["succes"];
    const paddleSpeed = event["data"];
    if (state) {
      this.canvas.updatePaddle(paddleSpeed);
    }
  }

  private updateOthemove(event: string): void {
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

  private handlemove(event: ServerEvent): void {
    const { data } = this.parseJson(event);
    try {
      const key_opt = Object.keys(event)[3];
      const opt = event[key_opt];
      this.updateOthemove(data);
    } catch (error) {
      console.error(`Can't access opt`);
    }
  }

  private parseJson(event: ServerEvent): {
    type: any;
    succes: boolean;
    data: any;
  } {
    const [key_type, key_succes, key_data] = Object.keys(event);
    const type = event[key_type];
    const succes = event[key_succes];
    const data = event[key_data];

    if (!data || !succes || !type) {
      throw new Error(`Error parseJson: ${Object.keys(event)}`);
    }

    return { type, succes, data };
  }

  private listen(): void {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
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
        } else {
          this.canvas.engine.stopRenderLoop();
        }
      }
    });
  }

  private info(): void {
    this.canvas.ball.display();
  }
}
