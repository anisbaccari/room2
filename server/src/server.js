
const fastify = require('fastify')({logger: true }) // ✅ enables built-in logging
const cors = require('@fastify/cors'); // Import @fastify/cors using require
const websocketPlugin = require('@fastify/websocket')

fastify.register(websocketPlugin)

// Register plugins
fastify.register(cors, { origin: '*' });

let clients = new Map()
let socketidCount =0;
fastify.register(async function (fastify) {
  
      fastify.get(`/`, { websocket: true }, (socket) => {
       
        const socketid = socketidCount++;
        clients.set(socketid,socket);

        fastify.log.info(`Socket added by client  to `);
        fastify.log.info(`Socket request : "/" , readyState: ${socket.readyState}`);
      
        clients.forEach((socketId, socket) => {

          console.log(`Socket: ${socket}, Socket ID: ${socketId}`);
          if (socketId !== socketid)

            clients.get(socketid).send(JSON.stringify({ system: true, message: `🟢 Joined ` }));
      });
    
        socket.on('message', message => {
          const msg = message.toString();
          fastify.log.info(`[server]  socket.on.message  ${msg}`);
          // Broadcast to all clients in the same room
          for (const client of clients) {
            if (client !== socket && client.readyState === 1) {
              client.send(JSON.stringify({ message: msg }));
              fastify.log.info(`[server]  socket send msg to   ${client}`);
            }
          }
        });
    
        socket.on('close', () => {
      //    clients.delete(socket);
          for (const client of clients) {
            if (client.readyState === 1) {
              client.send(JSON.stringify({ system: true, message: `🔕 Someone left ` }));
            }
          }
        });
      });
    });

// Start server
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('🚀 Server running on http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    };
start();