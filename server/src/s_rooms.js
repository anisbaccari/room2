
const s_ball = require ('./s_ball.js')
const s_players  = require ('./s_players.js')

class  s_rooms {
    constructor() {
        this.id = 0;
        this.length = 0;
        this.players = [];
        this.balls = [];
    }



    init()
    {

    }

    setup(player)
    {
        this.players.push(player);
        this.length++;

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