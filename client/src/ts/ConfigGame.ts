export default class ConfigGame {
    g_width: string;
    g_height: string;
    nbPlayers: number;
    height_bound: number;
    width_bound: number;
    public min_ground: { x: number; y: number; z: number };
    public max_ground: { x: number; y: number; z: number };
  
    constructor(arg: {
      width: string;
      height: string;
      width_bound: number;
      height_bound: number;
      max_ground: { x: number; y: number; z: number };
      min_ground:{ x: number; y: number; z: number };
      nbPlayers: number;
    })
    {
      this.g_width = arg.width;
      this.g_height = arg.height;
      this.nbPlayers = arg.nbPlayers;
      this.height_bound = arg.height_bound;
      this.width_bound = arg.width_bound;
      this.min_ground = arg.min_ground;
      this.max_ground = arg.max_ground;
    }
  }