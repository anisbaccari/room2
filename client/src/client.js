

class Client 
{ 

    constructor()
    {
        console.log(" Building Client ...")
        this.socket = new WebSocket(`ws://localhost:3000/`)
        this.socket.onopen = () => {
            console.log('WebSocket connection established');
            this.socket.send(JSON.stringify({
                message: `🟢 You are connected as Socket`
            }));
            
            this.socket.send(JSON.stringify
                ({
                    message: `🟢 You are connected as Socket `
                }))
                
                this.socket.addEventListener('message', (event) => {
                    try {
                      const data = JSON.parse(event.data);
                      console.log(`(client) data from server : ${data.message}`)

                    } catch (err) {
                      console.error(`Invalid JSON in:`, event.data);
                    }
                  });
              
                  this.socket.addEventListener('open', () => {
                    console.log(`Connected to `);
                  });
              
                  this.socket.addEventListener('close', () => {
                  console.log(`disconnected`);
                  });
                }
        };

        // on join - connect 



        // oon message
  }



const client = new Client();