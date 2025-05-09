
class s_paddle 
{

    constructor(playground, playerid) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        //vector3D
        this.position = {x: this.x, y: this.y, z: this.z}

        this.width = 1;
        this.height = 1;
        this.depth = 10;

        this.z_max =0
        this.x_max = playground.g_deepth;
        this.z_min = 0
        this.x_min = 0;

        this.paddleSpeed = 4;
        this.paddleSide = playerid % 2 == 0 ? "L" : "R";
        console.log(` [s_paddle] paddle_side : ${this.paddleSide} `);
    }



    setGround(playground)
    {
        this.z_max =playground.max_ground.z
        this.z_min = playground.min_ground.z
        console.log(` [s_paddle] [setGround]: z_max ${this.z_max} - z_min ${this.z_min} `);
    }
    getBoundingBox() {


        return {
            position: { x: this.position.x, y: this.position.y, z: this.position.z },
            size: { width: this.width, height: this.height, depth: this.depth }
        };
    } 

    // Check AABB collision with another bounding box (e.g., the ball)
    intersects(other) {
        const a = this.getBoundingBox();
        const b = other.getBoundingBox();

        return (
            Math.abs(a.position.x - b.position.x) < (a.this.width / 2 + b.this.width / 2) &&
           /*  Math.abs(a.position.y - b.position.y) < (a.this.height / 2 + b.this.height / 2) && */
            Math.abs(a.position.z - b.position.z) < (a.this.depth / 2 + b.this.depth / 2)
        );
    }
        // from client to server
    updatePaddlesMovement(key) 
    {
 

        this.display()
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
        this.display()
        // direction : true = up 
        if(direction)
        {
            if( this.z < 100 )
            {
                this.z +=this.paddleSpeed;
                return true

            }
        }
        else
        {
            if( this.z > - 100)
            {
                this.z -=this.paddleSpeed;
                return true
            }
        }
        
        return false;
    }

    display()
    {
        console.log( '\x1b[32m%s\x1b[0m', ` [s_paddle] position x: ${this.x} - position y: ${this.y} - position z: ${this.z}`)
        console.log( '\x1b[32m%s\x1b[0m', ` [s_paddle]  z_max: ${this.z_max}   z_min: ${this.z_min}   `)
    }
}


module.exports  = {s_paddle}