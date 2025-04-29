
const s_ball = require ('./s_ball.js')
const s_players  = require ('./s_players.js')

class  s_rooms {
    constructor() {
        this.id = 0;
        this.length = 0;
        this.players = [];
        this.balls = [];
        this.left_bound = -30 ;
        this.right_bound = 30 ;
        this.current_x = 0 ;
    }



    init()
    {
        if(this.players.length !=2)
            return false;
        for( let player of this.players)
        {
            if(player.socket.readyState != 1)
                return false; 
        }
        return true;
    }

    setup(player)
    {
        this.players.push(player);
        this.length++;
    }

    updateBall()
    {
    
      let dx =  Math.random() < 0.5 ? 10 : -10; 
      this.current_x += dx;
    
      if( this.current_x < this.left_bound || this.current_x > this.right_bound)
      {
          dx = -dx; 
          this.current_x += dx; 
      }
      this.players.forEach( player => 
      { 
    
        player.socket.send(JSON.stringify
          ({ 
            ball: true, x: dx, ball_x: this.current_x
          }));
    
      })
    }
    
    broadcast(senderSocket) {

        const senderPlayer = this.players.find(player => player.socket == senderSocket);
    
        if (!senderPlayer) {
            console.log("Sender not found in players.");
            return;
        }
    
        for (let player of this.players) {
            const isSender = (senderSocket == player.socket);
            const msg = isSender 
                ? `You are connected with id: ${player.id}` 
                : `New player connected with id: ${senderPlayer.id}`;
            
            player.socket.send(JSON.stringify({ system: true, message: msg }));
        }
    }
    display() {
        console.log(`s_rooms id: ${this.id}`);
        let count = 0;
        this.players.forEach(player => {
            console.log(`index[${count++}] : players_id : ${player.id} - paddle: ${player.paddle}`);
        });
    }
};

module.exports = { s_rooms};