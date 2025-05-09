
export default class ConfigGame
{
    constructor(arg)
    {
        this.g_width  = arg.width; 
        this.g_height = arg.height
        this.nbPlayers = arg.nbPlayers;
        this.height_bound = arg.height_bound; 
        this.width_bound = arg.width_bound
        this.min_ground = arg.min_ground
        this.max_ground = arg.max_ground

    }
}