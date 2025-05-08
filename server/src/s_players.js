const { s_paddle }  = require ('./s_paddle.js')

class s_players 
{

    constructor(socket,id,playground) {
        this.socket = socket;
        this.id = id;
        this.playground = playground;
        this.g_speedBall = this.playground.g_speedBall;
        this.paddle =  new s_paddle( this.playground ,this.id);
        this.current_x = 0 ;
        this.setup();
        this.display(); 

        // test 
        this.socket_state = false 
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

    get_pos_z()
    {
        return this.paddle.z; 
    }
    
    update(event)
    {
        let res =  this.paddle.updatePaddlesMovement(event);
        this.send(res);
        return res;
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
        {
            this.socket.send((JSON.stringify(
            {   
                type: "Paddle",
                succes: false,
                data: 0   
            })))       
        }
    }
}

module.exports = { s_players};

