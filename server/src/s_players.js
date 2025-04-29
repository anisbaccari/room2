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
                const response = JSON.parse(msg);
                const key = Object.keys(response)[0];
                const state = Object.keys(response)[1];
                const value = response[key]
                console.log(` [PLAYER ${this.id}] : ${response[key]}`);

                if(!state)
                    throw new Error(`[Server] Invalide state : ${state} `);

                switch (value)
                {
                    case 'Paddle':
                      console.log(` ==== Paddle msg : ${response["position"]}`)
                        break; 
                    case 'ball': 
                        break; 
                    default: 
                    console.log(` ==== msg : ${key}`)
                    break;
                }

            } catch(e)
            {
                console.error(`Invalid JSON in:`, msg);
            }
                
        })
    }
}

module.exports = { s_players};

