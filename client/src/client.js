import CanvasComponent from './CanvasComponent.js'
import SocketClient from './socketClient.js'
class Client 
{ 

    constructor()
    {   
    /*     this.content = document.getElementById('content') ;
        if(this.content)
          this.canvas = new CanvasComponent(content); */
        
        
        /* ================socket ============== */
        this.socket = new SocketClient(`ws://localhost:3000/`)
        
      
      
      };

  }



const client = new Client();