const { s_paddle }  = require ('./s_paddle.js')

class s_players 
{

    constructor(socket,id) {
        this.socket = socket;
        this.id = id;
        this.paddle =  new s_paddle();
        this.listen(); 
        this.display(); 
    }   


    setup(id)
    {
        this.id = id;
    }
    display()
    {
        console.log(`************** PLAYER id : ${this.id} ****************`);
    }


    listen()
    {    
        this.socket.on('message', msg => 
        {
            try
            {
                const event = JSON.parse(msg);
                console.log(` [PLAYER ${this.id}] : ${event.data}`);
            } catch(e)
            {
                console.error(`Invalid JSON in:`, msg);
            }
                
        })
    }
}

module.exports = { s_players};