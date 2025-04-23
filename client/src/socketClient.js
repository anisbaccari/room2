
import CanvasComponent from './CanvasComponent.js'

export default class socketClient 
{  
    constructor(URL)
    {

        /// init the rooms 
        let rooms = []

        let ball; 
        this.content = document.getElementById('content') ;
                
        if(this.content)
            this.canvas = new CanvasComponent(content);
        
        this.ws = new WebSocket(`${URL}`)
         
        this.ws.onopen = () => 
            {
     
                    this.ws.addEventListener('message', (event) => {
                        try {
                          const data = JSON.parse(event.data);
                          if(data.message)
                           console.log(`(client) data from server : ${data.message}`)
                          if(data.ball)
                            {
                              this.info();
                              let x = data.x;
                              console.log(`(client) ball.x : ${data.x} - current_x ${data.ball_x}`)
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


    info()
    {
        this.canvas.ball.display();
    }

}