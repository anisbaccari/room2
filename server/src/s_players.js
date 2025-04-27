 class s_players 
{

    constructor(socket,id) {
        this.socket = socket;
        this.id = id;
        this.paddle =  null; 
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

        })
    }
}

module.exports = { s_players};