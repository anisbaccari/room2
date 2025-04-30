
import SocketClient from './socketClient.js'
import ConfigGame from './ConfigGame.js'
class Client 
{ 

    constructor(arg)
    {   

        this.config  = new ConfigGame(arg)
        if(!this.config)
          throw new Error(" no ConfigGame");

        this.socket = new SocketClient(`ws://localhost:3000/`,this.config)
        
      
      
      };

  }
  

let arg  = {
  with :"50vw",
  height :"50vh",
  nbPlayers : 2
}
const config = new ConfigGame(arg)
const client = new Client(config);