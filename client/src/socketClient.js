
import CanvasComponent from './CanvasComponent.js'

export default class socketClient 
{  
    constructor(URL)
    {

        /// init the rooms 
        let roomsid;
        let ball;
        let players  = [];
        let rooms = {
          id:roomsid,
          players: [], 
          ball:ball
        }
        this.isRendering = true;
        this.content = document.getElementById('content') ;
                
        if(!this.content)
          throw new Error(" no CanvasComponent");
          
        this.canvas = new CanvasComponent(content);
        this.init(URL);
        this.listen();

    }


    init(URL)
    {
      this.ws = new WebSocket(`${URL}`)
         
      this.ws.onopen = () => 
          {
   
             this.ws.send(JSON.stringify({
                  event: "greeting",
                  succes: true,
                  data: "Hello from the frontend!"
              }));
                  this.ws.addEventListener('message', (msg) => 
                    {
                      try {
                        const event = JSON.parse(msg.data);
                        const key = Object.keys(event)[0];
                        const state = Object.keys(event)[1];
                        const value = event[key]
                        
                        console.log(`[SocketClient] send : ${value}`)
                        if( state == "error")
                          throw new Error(`[Client] Invalide state : ${state} `);

                        switch (value) {
                          case 'init':
                            this.setup(event.rooms);
                            break;
                          case 'message':
                            console.log(` [server] : ${event.message}`);
                            break;
                          case 'Paddle':
                            this.updateMove(event)
                            break;
                          case 'ball':
                            this.info();
                            let x = event.x;
                            console.log(`[client] ball.x : ${event.x} - current_x ${event.ball_x}`);
                            this.canvas.ball.mesh.position.x += x;
                            break;
                          default:
                            break;
                        }
                      } catch (err) {
                        console.error(`Invalid JSON in:`, msg);
                      }
                    });

                
                    this.ws.addEventListener('close', () => {
                    console.log(`disconnected`);
                    });
          }
    }
    setup(rooms)
    {
      console.log(` [setup] rooms : ${rooms}`)
      if(!rooms)
        throw new Error("[setup]  no rooms");
      if(!rooms.id || !rooms.players || !rooms.ball)
        throw new Error("[setup] Invalide rooms");
      this.rooms  = rooms;
    }

    sendMove(data)
    {
      console.log(`[client] sendMove : ${data.key}`)
        if(this.ws.readyState  == 1)
        {
          this.ws.send(JSON.stringify(
            {
            event: "Paddle",
            succes: true,
            position: data.key
            }));

        
        } else 
          console.log("[client] sendMove : socket not ready")
    }

    updateMove(data)
    {
      console.log(` [SERVER] FOR PADDLE : ${Object.keys(data)}`)
      const event = JSON.parse(msg.data);
      const state = Object.keys(event)[1];
      if(!state)
        return; 
      else 
      this.canvas.updatePaddle(data);

    }

    listen()
    {
      window.addEventListener("keydown", (event) =>
      {
        
        this.sendMove(event);
        if (event.key === "p") 
        { // Press 'p' to pause/unpause
          this.isRendering = !this.isRendering;
          console.log(this.isRendering ? "Rendering resumed!" : "Rendering paused!");
          if (this.isRendering) {
              this.canvas.engine.runRenderLoop(() => {
              //    this.pong.update(); // Update paddles' movement based on key states
                  this.canvas.scene.render();
              });
          }
          else {
              // Stop the render loop
              this.canvas.engine.stopRenderLoop();
          }
        }
      })

    }
    info()
    {
        this.canvas.ball.display();
    }

}