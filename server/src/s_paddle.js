
class s_paddle 
{

    constructor(playground)
    {
        this.x  = 0; 
        this.y = 0; 
        this.z = 0;
        this.z_max = playground.g_width;
        this.x_max = playground.g_deepth;
        this.z_min = 0;
        this.x_min = 0;
        this.paddleSpeed = 1.5;
    }

    move(move)
    {

    }

    updatePaddlesMovement(key) 
    {
 

        switch(key)
        {
            case "ArrowUp":
                console.log(" [Paddle] ArrowUp")
                return this.check_z_Bounderies(key,true)
                break;
            case "ArrowDown":
                console.log(" [Paddle]  ArrowDown")
               return this.check_z_Bounderies(key,false)
                break;
            case "W":
            case "w":
                console.log(" [Paddle] w ")
               return this.check_z_Bounderies(key,true)
                break;
            case "S":
            case "s":
                console.log(" [Paddle] S ")
               return this.check_z_Bounderies(key,false)
                break;
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