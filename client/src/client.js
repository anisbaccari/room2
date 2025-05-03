
import SocketClient from './socketClient.js'
import ConfigGame from './ConfigGame.js'
class Client 
{ 

     
    constructor(arg)
    {   

        this.id= 0; 
        this.config  = new ConfigGame(arg)
        if(!this.config)
          throw new Error(" no ConfigGame");

        this.socket = new SocketClient(`ws://localhost:3000/`,this.config,this.id)
        
      
      
      };

  }
  

let arg  = {
  width :"50vw",
  height :"50vh",
  nbPlayers : 2
}

const client = new Client(arg);