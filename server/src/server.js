
const fastify = require('fastify')({logger: true }) // ✅ enables built-in logging
const cors = require('@fastify/cors'); // Import @fastify/cors using require
const websocketPlugin = require('@fastify/websocket')

fastify.register(websocketPlugin)

// Register plugins
fastify.register(cors, { origin: '*' });

 //// KEY [id] - value [socket]
let clients = new Map()

// test
let left_bound = -30;
let right_bound = 30;
let current_x = 0 ;
let playerCount = 0; 
let rooms = []
//


let socketidCount = 0;

function startGame(rooms)
{
  
  fastify.log.info( `room size  ${rooms.size}`);

  let is_ready = true; 
  rooms.forEach( socket  =>
    {
      if(socket.readyState !== 1)
        {
          is_ready = false; 
          console.log(" socket not ready");
          rooms.delete(socket);
        }
        
    })
    if(rooms.size !== 2)
          return; 
    if(is_ready)
    updateBall(rooms);
}

function updateBall(clients)
{

  dx =  Math.random() < 0.5 ? 10 : -10; 
  current_x += dx;

  if( current_x < left_bound || current_x > right_bound)
  {
      dx = -dx; 
      current_x += dx; 
  }
  clients.forEach( socket => 
  { 

    socket.send(JSON.stringify
      ({ 
        ball: true, x: dx, ball_x: current_x
      }));

  })


}
setInterval(() => {
  startGame(clients);
}, 2000);



fastify.register(async function (fastify) 
{
 
  fastify.get(`/`, { websocket: true }, (socket) => 
  {
      const socketid = socketidCount++;
      clients.set(socketid,socket);

              /// value - key
      clients.forEach((otherSocket, otherSocketId) =>
      {
            if (otherSocketId !== socketid && otherSocket.readyState === 1)
            {
              clients.get(otherSocketId).send(JSON.stringify
              ({ 
                system: true, message: `🟢  socket ${socketid} Joined ` 
              }));



              fastify.log.info(` socketid: ${socketid} send to  socketID : ${otherSocketId} ` )
              fastify.log.info(` the msg : 🟢  socket ${socketid} Joined ` )
            }

      });

                  /// test to count players; 
               
    if(socket.readyState === 1 )
     {
                      
      rooms.push(socket);
      if(rooms.length == 2)
      {
        fastify.log.info(` ROOM READY `);
        rooms.forEach( socket => 
        {
          socket.send(JSON.stringify
          ({ 
            game: true, message: `🟢 Game started ` 
          }));
        });
          
    }
    }
    
    
      socket.on('message', message => 
      {
          const msg = message.toString();
          fastify.log.info(`[server]  socket id ${socketid} receive :  ${msg}`);
          for (const [id,socket] of clients) 
          {
            
            if (id !== socketid && socket.readyState === 1)
            {
              socket.send(JSON.stringify({ message: msg }));
              fastify.log.info(`[server]  socket send msg to id  ${id} - ${msg}`);
            }
        }

      });
    
        socket.on('close', () =>
        {
          clients.delete(socket);
          for (const [id,socket] of clients)
          {
            if (socket.readyState === 1) 
            {
              socket.send(JSON.stringify({ system: true, message: `🔕 Someone left ` }));
            }
          }

        });
  });
});

// Start server
const start = async () => {
    try 
    {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('🚀 Server running on http://localhost:3000');
    } catch (err)
    {
        fastify.log.error(err);
        process.exit(1);
    }
    };
start();