const { s_paddle }  = require ('./s_paddle.js')

class s_players 
{

    constructor(socket,id,playground) {
        this.socket = socket;
        this.id = id;
        this.playground = playground;
        this.g_speedBall = this.playground.g_speedBall;
        this.paddle =  new s_paddle( this.playground ,this.id);
        this.setup();
        this.listen(); 
        this.display(); 
    }   


    setup()
    {

        this.socket.send((JSON.stringify(
            {   
                type: "player",
                succes: true,
                data: this.id
                
            })))
    }
    display()
    {
        console.log(`************** PLAYER id : ${this.id} ****************`);
    }

    is_ready()
    {
        return (this.socket.readyState == 1)
    }


    paddleSide()
    {
        return this.paddle.paddleSide;
    }
    listen()
    {   /*  
        this.socket.on('message', msg => 
        {
            try
            {
                const response = JSON.parse(msg);
                const key = Object.keys(response)[0];
                const state = Object.keys(response)[1];
                const value = response[key];
                let resulte =false;
                console.log(` [PLAYER ${this.id}] : ${response[key]}`);

                if(!state)
                    throw new Error(`[Server] Invalide state : ${state} `);

                switch (value)
                {
                    case 'Paddle':
                      console.log(` ==== Paddle msg : ${response["position"]}`)
                     this.update(response["position"])
                        break; 
                    case 'ball': 
                    console.log(` ==== Ball msg : ${response["position"]}`)
                        break; 
                    default: 
                    console.log(` ==== msg : ${key}`)
                    break;
                }
            } catch(e)
            {
                console.error(`Invalid JSON: in:`, msg);
            }
                
        }) */
    }

    update(event)
    {
      //  console.log(` [update] event : ${event}`)
        // check if we can 
        let res =  this.paddle.updatePaddlesMovement(event);
        this.send(res);
    }

    send(resulte)
    {

        if(resulte && this.socket.readyState ===1)
            this.socket.send((JSON.stringify(
            {   
                type: "Paddle",
                succes: true,
                data: this.g_speedBall
                
            })))
        else
            this.socket.send((JSON.stringify(
            {   
            
                type: "Paddle",
                succes: false,
                data: 0
            
            })))
    
        console.log(` send : REsulte : ${resulte}`);

    }
}

module.exports = { s_players};

