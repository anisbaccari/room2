
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
                  this.ws.addEventListener('message', (event) => 
                    {
                      try {
                        const data = JSON.parse(event.data);
                        
                        if(data.init)
                          this.setup(data.rooms);
                        else if(data.message)
                         console.log(` [server] : ${data.message}`)
                        else if(data.ball)
                          {
                            this.info();
                            let x = data.x;
                            console.log(`[client] ball.x : ${data.x} - current_x ${data.ball_x}`)
                              this.canvas.ball.mesh.position.x += x; 
                          }    
                              

  
                      } catch (err) {
                        console.error(`Invalid JSON in:`, event.data);
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
        if(this.ws.readyState  == 1)
        {
          this.ws.send(JSON.stringify(
            {
            event: "paddle",
            succes: true,
            data: `${data}`
            }));

          this.canvas.updatePaddle(data);
        } else 
          console.log("[client] sendMove : socket not ready")
    }

    updateMove()
    {
      
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