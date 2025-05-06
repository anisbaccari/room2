
import CanvasComponent from './CanvasComponent.js'

export default class socketClient 
{  
    constructor(URL,cfg,playerid)
    {
        this.playerid = playerid;
        this.isRendering = true;
        this.content = document.getElementById('content') ;
        this.paddleSide = null
        if(!this.content)
          throw new Error(" no CanvasComponent");
          
        this.canvas = new CanvasComponent(content,cfg);
        this.init(URL);
        this.listen();
    }

    init(URL)
    {
      this.ws = new WebSocket(`${URL}`)
         
      this.ws.onopen = () => 
          {
   
             this.ws.send(JSON.stringify({
                  type: "greeting",
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
                        
                        console.log(` [server] event: ${Object.keys(event)}`);
                        if( state == "error")
                          throw new Error(`[Client] Invalide state : ${state} `);
                        switch (value) {
                          case 'init':
                            this.setup(event);
                            break;
                          case 'message':
                            break;
                          case 'player':
                            console.log(` [server] playerid : ${event.data}`);
                            break;
                          case 'Paddle':
                            this.updateMove(event)
                            break;
                          case 'ball':
                            this.info();
                            let x = event.x;
                            this.canvas.ball.mesh.position.x += x;
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
                    console.log(`disconnected`);
                    });
          }
    }
    setup(event)
    {
      console.log(` [setup]  : ${Object.keys(event)}`);
      const key = Object.keys(event)[2];
      this.paddleSide = event[key]
      console.log(` [setup]  : ${event[key]}`);
      this.canvas.set_paddleSide(event[key])
    }

    sendMove(data) // send to other 
    {
      console.log(`[client] [${this.playerid}] sendMove : ${data.key}`)

      switch (data.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "W":
        case "w":
        case "S":
        case "s":
          if(this.ws.readyState  == 1)
            {
              this.ws.send(JSON.stringify(
                {
                event: "Paddle",
                succes: true,
                data: data.key,
                opt: this.playerid
                }));
    
            
            } else 
              console.log("[client] sendMove : socket not ready")
          break;
        default:
          break;
      }

      console.log(` [client] sendMove : ${data.key}`) 
    }

    updateMove(event) // receive from server  
    {
      console.log(` [SERVER] FOR PADDLE : ${Object.keys(event)}`)
   
      
      const state =event["succes"];
      const paddleSpeed = event["data"]; 

      console.log(` [SERVER] FOR PADDLE  (State) : ${state}  ${paddleSpeed} `)
      if(!state)
        return; 
      else 
      this.canvas.updatePaddle(paddleSpeed);
    }

    handlemove(event) // move other paddle 
    {
    
      
      console.log(`[handlemove] ${Object.keys(event)}  `);
       const {type, succes, data} = this.parsJson(event)
       
       try {
         const key_opt = Object.keys(event)[3];
         const opt  = event[key_opt];
         console.log(`[handlemove] from ${opt} to ${this.playerid}  `);
         console.log(`[handlemove] data : ${data}  `);

      } catch (error) {
        console.error(`Cant acces opt`);
      }
    }

    parsJson(event)
    {
      const key_type = Object.keys(event)[0];
      const key_succes  = Object.keys(event)[1]; 
      const key_data = Object.keys(event)[2]

      const type  = event[key_type];
      const succes  = event[key_succes];
      const data  = event[key_data];
      
      if(!data || !succes || !type)
        throw new Error(`Error parsJson ${Object.key(event)}  `);

      return { type, succes, data}
        
    }

    listen()
    {
      window.addEventListener("keydown", (event) =>
      {
        
        this.sendMove(event); // to othher & server 


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