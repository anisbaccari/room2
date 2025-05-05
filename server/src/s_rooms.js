
const s_ball = require ('./s_ball.js')
const s_players  = require ('./s_players.js')

class  s_rooms {
    constructor() {
        this.id = 0;
        this.is_set = false; 
        this.length = 0;
        this.players = [];
        this.balls = [];
        this.left_bound = -60 ;
        this.right_bound = 60 ;
        this.current_x = 0 ;
        this.dx  =  Math.random() < 0.5 ? 20 : -20
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
        if(!this.is_set)
        {
            this.handler();
            this.is_set = true;
        }
        return true;
    }

    setup(player)
    {
        this.players.push(player);
        this.length++;
        console.log(` [setup] PLAYER id : ${this.id} `);
        if(player.is_ready())
            player.socket.send(JSON.stringify({
                type: 'init',
                succes: true, 
                data: player.paddleSide()
            }))
    }

    loop()
    {
        this.updateBall(); 
    }

    updateBall()
    {
    
      
        
        if( this.current_x   < this.left_bound || this.current_x   > this.right_bound)
            {
                this.dx = -this.dx; 
                this.current_x += this.dx; 
                console.log(`== BOUND : 
                  current_x  ${this.current_x} 
                  left_bound  ${this.left_bound} 
                  right_bound  ${this.right_bound} `);
            }
        else    
            this.current_x += this.dx;
        
        this.players.forEach( player => 
        { 
    
            player.socket.send(JSON.stringify
            ({ 
                    type: "ball", 
                    succes: true,
                    x: this.dx,
                    ball_x: this.current_x
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
            
            player.socket.send(JSON.stringify({ 
                type: "message", 
                succes: true, 
                data : null
            }));
        }
    }

    getOpt(event)
    {
        try 
        {
            console.log(` [SendEvent] opt : ${ Object.keys(event)}`) ;
        } catch (error) {
           console.error(`Cant acces opt`);
        }
    }

    sendEvent( playerid,event)
    {
        const key_type = Object.keys(event)[0];
        const type = event[key_type]
        const succes = Object.keys(event)[1];
        const key = Object.keys(event)[2]; 
        const response = event[key]
        let resulte =false;

        console.log(`[SendEvent] [PLAYER ${playerid}] (type) ${type} :  ${response}`);

        const tosend  = {   
            type: "move",
            succes: true,
            data: response,
            opt : playerid
        }

        console.log(` \x1b[31m%s\x1b[0m`,` [SENDMOVE] ${tosend["type"]} `)
        for ( let player of this.players)
        {
            if( player.id != playerid && player.is_ready())
            {
                console.log(`[SendEvent] from [${playerid}] to [${player.id}] : ${response}`);
                player.socket.send(JSON.stringify(tosend));
            }
        } 
    }


        /// HAndle socket message receveid
    handler()
    {
        for (let player of this.players)
        {
            if(player.is_ready())
            {
                player.socket.on('message', msg => 
                    {
                        try
                        {
                            const response = JSON.parse(msg);
                            const key = Object.keys(response)[0];
                            const state = Object.keys(response)[1];
                            const value = response[key];
                            let resulte =false;
                            console.log(` [Handler] [PLAYER ${player.id}]  get :  ${response[key]}`);
            
                            if(!state)
                                throw new Error(`[Server] Invalide state : ${state} `);
                            
                            switch (value)
                            {
                                case 'init' : 
                                    break;
                                case 'move' :
                                console.log(` [move] : ${ Object.keys(response)[2]}`)
                                    break;
                                case 'Paddle':
                                 player.update(response["data"])
                                    break; 
                                case 'ball': 
                                break; 
                                default: 
                                console.log(` ==== msg : ${response}`)
                                break;
                            }
                            this.sendEvent(player.id,response);
                         
                        } 
                        catch(e)
                        {
                            console.error(`Invalid JSON: in:`, msg);
                        }
                            
                    }) 
            }
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