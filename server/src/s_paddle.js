
class s_paddle 
{

    constructor(playground,playerid)
    {
        this.x  = 0; 
        this.y = 0; 
        this.z = 0;
        this.z_max = playground.g_width;
        this.x_max = playground.g_deepth;
        this.z_min = 0;
        this.x_min = 0;
        this.paddleSpeed = 1.5;
        this.paddleSide = playerid % 2 == 0 ? "L" : "R";
        console.log(` [s_paddle] paddle_side : ${this.paddleSide} `)
    }

    move(move)
    {

    }
        // from client to server
    updatePaddlesMovement(key) 
    {
 

        switch(key)
        {
            case "W":
            case "w":
            case "ArrowUp":
                console.log(" [Paddle] ArrowUp")
                return this.check_z_Bounderies(key,true)
            case "S":
            case "s":
            case "ArrowDown":
                console.log(" [Paddle]  ArrowDown")
               return this.check_z_Bounderies(key,false)
            default:
                break;
        }

        return false; 

    }  



    check_z_Bounderies(key,direction)
    {
        // direction : true = up 
        if(direction)
        {
            if( this.z < 37.5)
            {
                this.z +=this.paddleSpeed;
                return true

            }
        }
        else
        {
            if( this.z > -37.5)
            {
                this.z -=this.paddleSpeed;
                return true
            }
        }
        this.display()
        
        return false;
    }

    display()
    {
        console.log(` position x: ${this.x} - position y: ${this.y} - position z: ${this.z}`)
    }
}


module.exports  = {s_paddle}