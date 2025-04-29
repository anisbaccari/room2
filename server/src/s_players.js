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
        this.socket.on('message', message => 
        {
            try
            {
                const data = JSON.parse(message);
                console.log(` [PLAYER ${this.id}] : ${data}`);
            } catch(e)
            {
                console.error(`Invalid JSON in:`, message.data);
            }
                
        })
    }
}

module.exports = { s_players};