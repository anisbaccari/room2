import SocketClient from './socketClient.js'; // Consider converting this to .ts
import ConfigGame from './ConfigGame.js';

class Client {
  id: number;
  config: ConfigGame;
  socket: SocketClient;

  constructor(arg: ConstructorParameters<typeof ConfigGame>[0]) {
    this.id = 0;
    this.config = new ConfigGame(arg);

    if (!this.config) {
      throw new Error("No ConfigGame");
    }

    this.socket = new SocketClient(`ws://localhost:3001/`, this.config, this.id);
  }
}

const arg = {
  width: "50vw",
  height: "50vh",
  width_bound: 100,
  height_bound: 100,
  max_ground: { x: 0, y: 0, z: 0 }, // ✅
  min_ground: { x: 0, y: 0, z: 0 }, // ✅
  nbPlayers: 2
};

const client = new Client(arg);
