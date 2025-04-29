
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
        this.content = document.getElementById('content') ;
                
        if(!this.content)
          throw new Error(" no CanvasComponent");
          
        this.canvas = new CanvasComponent(content);
        this.init(URL);

    }


    init(URL)
    {
      this.ws = new WebSocket(`${URL}`)
         
      this.ws.onopen = () => 
          {
/*    
             this.ws.send(JSON.stringify({
                  event: "greeting",
                  succes: true,
                  data: "Hello from the frontend!"
              })); */
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
                
                    this.ws.addEventListener('open', () => {
                      console.log(`Connected to `);
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
    info()
    {
        this.canvas.ball.display();
    }

}