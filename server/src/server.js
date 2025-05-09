
const { s_rooms } = require ('./s_rooms.js')
const { s_ball } = require ('./s_ball.js')
const { s_players } = require ('./s_players.js')
const { game } = require ('./game.js')
const fastify = require('fastify')({logger: true }) // ✅ enables built-in logging
const cors = require('@fastify/cors'); // Import @fastify/cors using require
const websocketPlugin = require('@fastify/websocket')

fastify.register(websocketPlugin)

// Register plugins
fastify.register(cors, { origin: '*' });

 //// KEY [id] - value [socket]
let clients = new Map()

let rooms = []

let socketidCount = 0;

fastify.decorate('game', new game(fastify.log));


setInterval(() => {
/*   let rooms = fastify.game.rooms;
  startGame(rooms); */
  fastify.game.loop();
}, 500);



fastify.register(async function (fastify) 
{

  fastify.get(`/`, { websocket: true }, (socket) => 
  {
      
      
      fastify.game.setup(socket);
          
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

    
        socket.on('close', () =>
        {
          clients.delete(socket);
          // delete for rooms too 
          rooms = rooms.filter(roomSocket => roomSocket !== socket);
          for (const [id,socket] of clients)
          {
            if (socket.readyState === 1) 
            {
              socket.send(JSON.stringify({ 
                type: "message",
                succes : true,
                data: `🔕 Someone left ` }));
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