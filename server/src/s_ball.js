 class  s_ball {


    constructor(id,) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.position = { x: 0, y: 0, z:0}
        this.direction = { dx: 1, dy: 0, dz: 1 }; 

        this.width = 2;
        this.height = 2;
        this.depth = 2;

/*         this.left_bound = -100 - this.width / 2;
        this.right_bound = 100 + this.width / 2; */

        this.playground = null
        this.dx = 1; // movement direction
        this.dz = 1;
        console.log(` constructor x -  : ${ this.position.x} -  z ${ this.position.z} `);  
        this.setDirection()
        this.display()
    }

    setDirection()
    {
        this.direction.dx  =  Math.random() < 0.5 ? 5 : -5
        this.direction.dz  =  Math.random() < 0.5 ? 5 : -5
        console.log(`[initBall] dx: ${this.direction.dx}`)
        console.log(`[initBall] dx: ${this.direction.dz}`)
    }

    setGround(playground)
    {
        this.playground = playground;
           
        this.left_bound = - (this.playground.width_bound) - this.width / 2;
        this.right_bound = this.playground.width_bound + this.width / 2;
        this.top_bound = this.playground.height_bound + this.height / 2;
        this.bottom_bound =  - this.playground.height_bound + this.height / 2;
       /*  console.log(`[Ball]   this.left_bound: ${this.left_bound}`)
        console.log(`[Ball] this.right_bound : ${this.right_bound }`);
        console.log(`[Ball] this.top_bound: ${this.top_bound}`);
        console.log(`[Ball] this.bottom_bound: ${this.bottom_bound}`); */
    }


    getBoundingBox() {
        
        return {
            position: { x: this.x, y: this.y, z: this.z },
            size: { width: this.width, height: this.height, depth: this.depth }
        };
    }

    intersects(other) {
        const a = this.getBoundingBox();
        const b = other.getBoundingBox();


        
        other.display()
        console.log(`[intersecte] {a} x : ${a.position.x}  - z : ${a.position.z}` )
        console.log(`[intersecte] {b} x : ${b.position.x}  - z : ${b.position.z}` )
        return (
/*             Math.abs(a.position.x - b.position.x) < (a.size.width / 2 + b.size.width / 2) &&
            Math.abs(a.position.y - b.position.y) < (a.size.height / 2 + b.size.height / 2) && */
            Math.abs(a.position.z - b.position.z) < (a.size.depth / 2 + b.size.depth / 2)
        );
    }

    // Update position logic (example)
    move(direction) {
       
        
        console.log(` x -  : ${ this.position.x} -  z ${ this.position.z} `);  
        console.log(` Direction : x -  : ${ this.direction.dx} -  z ${ this.direction.dz} `); 
        this.position.x += direction.dx;
        this.position.z += direction.dz;
      //  this.z += this.dz;
    }

    interBoundX(position)
    {

      //  console.log(` \x1b[31m%s\x1b[0m`,` BALL x ${this.x} `);  
        if( position  < this.left_bound ||position  >= this.right_bound )
            return true; 
        else 
            return false; 
    }
    interBoundZ(position)
    {

    //    console.log(` \x1b[31m%s\x1b[0m`,` BALL z ${this.z} `);      
        if(  position  < this.bottom_bound || position  >= this.top_bound )
            return true; 
        else 
            return false; 
    }

    checkGroundCollision()
    {
        console.log(` \x1b[31m%s\x1b[0m`,` [BEFORE] position x  ${this.position.x}  z ${this.position.z} `); 
     
        if( this.interBoundX(this.position.x))
            {
                    this.direction.dx  = -this.direction.dx ; 
                    this.position.x += this.direction.dx ; 
                    console.log(`== BOUND : 
                      current_x  ${this.position.x} 
                      left_bound  ${this.left_bound} 
                      right_bound  ${this.right_bound} `);
            }
            else    
                this.position.x += this.direction.dx ;
        if( this.interBoundZ(this.position.z))
            {
                this.direction.dz  = -this.direction.dz ; 
                this.position.z += this.direction.dz ; 
                console.log(`== BOUND : 
                current_z  ${this.position.z} 
                left_bound  ${this.left_bound} 
                right_bound  ${this.right_bound} `);
            }
                    else    
                        this.position.z += this.direction.dz ;
        console.log(` \x1b[31m%s\x1b[0m`,` [AFTER] position x  ${this.position.x}  z ${this.position.z} `); 
     
       // return this.position 
    }


    update()
    {

    }
    display() 
    {
     
        console.log(` [BALL] position x : ${this.position.x} -  z ${this.position.z} `); 
      //  console.log(` playground { width : ${this.playground.g_width} -  depth : ${this.playground.g_deepth} `); 
    }

}
module.exports = {s_ball };

