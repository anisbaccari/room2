
class s_paddle 
{

    constructor()
    {
        this.x  = 0; 
        this.y = 0; 
        this.z = 0;
        this.z_min = 0;
        this.z_max = 0;
        this.x_min = 0;
        this.x_max = 0;
        this.paddleSpeed = 1.5;
    }

    move(move)
    {

    }

    updatePaddlesMovement() 
    {
        if (this.moveUpL /* && this.leftPaddle.position.z < this.z_max - this.depth / 2 */) 
            this.z += this.paddleSpeed;
        
        if (this.moveDownL /* && this.leftPaddle.position.z > this.z_min + this.depth / 2 */) 
            this.z -= this.paddleSpeed;
    }  

    display()
    {
        console.log(` position x: ${this.x} - position y: ${this.y} - position z: ${this.z}`)
    }
}


module.exports  = {s_paddle}