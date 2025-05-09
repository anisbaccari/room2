
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
  width_bound : 100, 
  height_bound : 100,
  max_ground : 0,
  min_ground : 0,
  nbPlayers : 2
}

const client = new Client(arg);