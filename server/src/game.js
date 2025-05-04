const s_ball = require ('./s_ball.js');
const { s_players } = require ('./s_players.js');
const { s_rooms } = require('./s_rooms.js');


class game {

   constructor(logger)
   {
      this.rooms  = []
      this.rooms.push(new s_rooms()); 
      this.playerID = 0;
      // to use fastify log inside 
      this.log  = logger; 
      this.playground = {g_width:0,y:0,g_deepth:0,g_speedBall: 1.5};
   }

   init()
   {
     /*  this.display();
      this.rooms.forEach( room => 
      {
            if(room.length < 2 )
            {
              let newplayer = new s_players(0)
               room.setup(newplayer); 
               console.log("*********** NEW PLAYERS ADDED")
            }
      }) */
   
   }

   setup( socket)
   {
      //this.display();

      for (let i = 0; i < this.rooms.length; i++)
      {
         let room = this.rooms[i];
            if(room.length < 2 )
            {
               let newplayer = new s_players(socket,this.playerID,this.playground)
               this.playerID++;
               room.setup(newplayer); 
               room.broadcast(socket);
               /// TEST 
               console.log("*********** NEW PLAYERS ADDED");
               break;
            }
            else 
            this.rooms.push(new s_rooms()); 
      }
        
   }

   loop( )
   {
      for( let room of this.rooms)
      {
         if(room.init())
            room.loop()
      }
      
   }


   broadcast(socket)
   {
      const socketid = this.rooms.getsocket(socket); 
      for ( let room of this.rooms)
      {

      }
   }

   getsocket(socket)
   {
      for( let room of this.rooms)
      {
         for( players of room.players)
         {
            
         }
      }
   }
   display()
   {
      this.rooms.forEach( room =>
         {
            room.display();
         })
   }
}

module.exports = { game};