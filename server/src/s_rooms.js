
const { s_ball } = require ('./s_ball.js')
const s_players  = require ('./s_players.js')

class  s_rooms {
    constructor() {
        this.id = 0;
        this.is_set = false; 
        this.length = 0;
        this.players = [];
        this.balls = [];
        this.ball = null
        this.playground = null
        this.left_bound = -65 ;
        this.right_bound = 65 ;
        this.current_x = 0 ;
        this.position = { x: 0, y: 0, z: 0 };
        this.setDirection()
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
            this.ball = new s_ball(this.id++)
            //this.handler();
            this.sendReady()
            this.is_set = true;
        }
        return true;
    }

    setup(player)
    {
        this.players.push(player);
        this.length++;
        console.log(` [setup] PLAYER id : ${this.id} `);
        this.handler()
        if(player.is_ready())
            player.socket.send(JSON.stringify({
                type: 'init',
                succes: true, 
                data: player.paddleSide()
            }))
    }

    setDirection()
    {
/*         this.direction.dx  =  Math.random() < 0.5 ? 5 : -5
        this.direction.dz  =  Math.random() < 0.5 ? 5 : -5
        console.log(`[initBall] dx: ${this.direction.dx}`)
        console.log(`[initBall] dx: ${this.direction.dz}`) */
    }
    setGround(event)
    {
        

      try {
            if (!event.data) throw new Error("Missing 'data' in event");
    
            const data = event.data;
  
         /*    console.log(`[setGround] g_width: ${data.g_width}`);
            console.log(`[setGround] g_height: ${data.g_height}`);
            console.log(`[setGround] nbPlayers: ${data.nbPlayers}`);
            console.log(`[setGround] width_bound: ${data.width_bound}`);
            console.log(`[setGround] height_bound: ${data.height_bound}`); */
            this.ball.setGround(data)
            
            // If needed, store or process this data here
    
        } catch (error) {
            console.error(`[setGround] Error accessing data: ${error}`);
        } 
    }
    loop()
    {
        this.updateBall(); 
    }

    checkPaddleCollision() {
/*         for (let player of this.players) {

            if (this.ball.intersects(player.paddle)) {
                this.direction.dx  = -this.direction.dx ;
                console.log(`[COLLISION] Ball hit paddle of player ${player.id}`);
             //   console.log(`[COLLISION] player  ${player.get_pos_z()}`);
                return  this.direction.dx  ; 
            }
        }
        return  this.direction.dx  ;  */
    }
    
    checkGroundCollision()
    {
        /*   
        if( this.ball.interBoundX(this.position.x))
            {
                    this.direction.dx  = -this.direction.dx ; 
                    this.position.x += this.direction.dx ; 
                    console.log(`== BOUND : 
                      current_x  ${this.position.x} 
                      left_bound  ${this.left_bound} 
                      right_bound  ${this.right_bound} `);
            }
            else    
                this.position.x += this.direction.dx ;
      if( this.ball.interBoundZ(this.position.z))
            {
                this.direction.dz  = -this.direction.dz ; 
                this.position.z += this.direction.dz ; 
                console.log(`== BOUND : 
                current_z  ${this.position.z} 
                left_bound  ${this.left_bound} 
                right_bound  ${this.right_bound} `);
            }
                    else    
                        this.position.z += this.direction.dz ; */
        
    }
    updateBall()
    {

      
        this.ball.update(this.players)
        //this.position.x += this.checkPaddleCollision();
        //this.ball.move();
        this.position = this.ball.position
        this.ball.display()
        console.log( `[s_rooms] position x:  ${this.position.x} -  z:${this.position.z}  ` )
        this.players.forEach( player => 
        { 
    
            player.socket.send(JSON.stringify
            ({ 
                    type: "ball", 
                    succes: true,
                    x: this.ball.direction.dx ,
                    z: this.ball.direction.dz ,
                    ball_x: this.position.x
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


    sendReady()
    {
        for (let player of this.players)
            player.socket.send(JSON.stringify({
                type: 'ready',
                succes: true, 
                data: player.id
            }))
    }



    sendEvent( playerid,event,resulte)
    {

        if(!resulte)
                return;
        const key_type = Object.keys(event)[0];
        const type = event[key_type]
        const succes = Object.keys(event)[1];
        const key = Object.keys(event)[2]; 
        const response = event[key]
        console.log(`[SendEvent] [PLAYER ${playerid}] (type) ${type} :  ${response}`);

        const tosend  = {   
            type: "move",
            succes: true,
            data: response,
            opt : playerid
        }

        console.log(` \x1b[31m%s\x1b[0m`,` [SENDMOVE] ${tosend["type"]} from ${playerid} `)
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
            if(player.is_ready()  && !player.socket_state)
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
                            console.log('\x1b[32m%s\x1b[0m', ` [Handler] [PLAYER ${player.id}]  get :  ${response[key]}`);
            
                            if(!state)
                                throw new Error(`[Server] Invalide state : ${state} `);
                            
                            switch (value)
                            {
                                case 'setup' : 
                                      //  this.setGround(response)
                                    break;
                                case 'ready' : 
                                    console.log(` [Handler] Received ready event: ${JSON.stringify(response)}`);
                                    this.setGround(response)
                                    break;
                                case 'move' :
                                console.log(` [move] : ${ Object.keys(response)[2]}`)
                                    break;
                                case 'Paddle':
                                    resulte =  player.update(response["data"])
                                    break; 
                                default: 
                                console.log(` ==== msg : ${response}`)
                                break;
                            }

                            console.log(` \x1b[31m%s\x1b[0m`,` [HANDLER] ${value} `)
                            // need to handle the validation of the response 
                            this.sendEvent(player.id,response,resulte);
                            player.socket_state = true; 
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
        console.log(`playground: ${this.playground}`);
        let count = 0;
        this.players.forEach(player => {
            console.log(`index[${count++}] : players_id : ${player.id} - paddle: `);
            player.paddle.display()
            console.log(" BALL")
            this.ball.display()
        });
    }
};

module.exports = { s_rooms};