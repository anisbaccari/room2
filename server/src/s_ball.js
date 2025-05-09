 class  s_ball {


    constructor(id,) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.position = { x: 0, y: 0, z:0}
        this.direction = { dx: 0, dy: 0, dz: 0 }; 

        this.width = 2;
        this.height = 2;
        this.depth = 2;

        this.playground = null

        this.a = 10 // to test the bound with a cnst K
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
           
        this.left_bound =  ( this.playground.min_ground.x)  + this.width // + this.a   ;
        this.right_bound = (this.playground.max_ground.x )- this.width // - this.a ;
        this.top_bound =( this.playground.max_ground.z ) - this.height - this.a   ;
        this.bottom_bound =  ( this.playground.min_ground.z ) + this.height  + this.a  ;
        
        console.log(`[Ball]   this.playground.max_ground.x : ${this.playground.max_ground.x }`)
        console.log(`[Ball] this.playground.width_bound : ${this.playground.width_bound }`);
        
        console.log(`[Ball]   this.left_bound: ${this.left_bound}`)
        console.log(`[Ball] this.right_bound : ${this.right_bound }`);
        console.log(`[Ball] this.top_bound: ${this.top_bound}`);
        console.log(`[Ball] this.bottom_bound: ${this.bottom_bound}`);
    }


    getBoundingBox() {
        
        return {
            position: { x: this.position.x, y: this.position.y, z: this.position.z },
            size: { width: this.width, height: this.height, depth: this.depth }
        };
    }

    intersects(other) {
        const a = this.getBoundingBox();
        const b = other.getBoundingBox();
        return (
            Math.abs(a.position.x - b.position.x) < (a.size.width / 2 + b.size.width / 2) &&
            /*Math.abs(a.position.y - b.position.y) < (a.size.height / 2 + b.size.height / 2) && */
            Math.abs(a.position.z - b.position.z) < (a.size.depth / 2 + b.size.depth / 2)
        );
    }

    // Update position logic (example)
    move() 
    {
        this.position.x += this.direction.dx;
        this.position.z += this.direction.dz;
      //  this.z += this.dz;
    }

    interBoundX()
    {

      //  console.log(`[X CHECK] pos.x = ${this.position.x}, left = ${this.left_bound}, right = ${this.right_bound}`); 
        if( this.position.x  <= this.left_bound ||this.position.x  >= this.right_bound )
            return true; 
        else 
            return false; 
    }
    interBoundZ()
    {

     //   console.log(`[Z CHECK] pos.z = ${this.position.z}, bottom = ${this.bottom_bound}, top = ${this.top_bound}`); 
        if( this.position.z  <= this.bottom_bound ||this.position.z  >= this.top_bound )
            return true; 
        else 
            return false; 
    }

    checkGroundCollision(players)
    {
      //  console.log(` \x1b[31m%s\x1b[0m`,` [ checkGroundCollision ] position x  ${this.position.x}  z ${this.position.z} `); 
        for(let player of players)
        {
            if(this.intersects(player.paddle))
            {
               /*  console.log(` \x1b[31m%s\x1b[0m`,` [checkGroundCollision]player touched `); 
                player.paddle.display() */
            }
        }

            let hitX = this.interBoundX();
            let hitZ = this.interBoundZ();
            

            if( hitX)
            {
                    //console.log("HIT X WALL");
                    this.direction.dx  = -this.direction.dx ; 

            }
           /*  else    
                this.position.x += this.direction.dx ; */
        if( hitZ)
            {
                //console.log("HIT Z WALL");
                this.direction.dz  = -this.direction.dz ; 
            
            }

       
     
    }


    update(players)
    {
        this.checkGroundCollision(players)
        this.move()
    }


    reset()
    {
        this.position.x = 0; 
        this.position.z = 0;
    }
    display() 
    {
     
    //    console.log(` [BALL] position x : ${this.position.x} -  z ${this.position.z} `); 
      //  console.log(` playground { width : ${this.playground.g_width} -  depth : ${this.playground.g_deepth} `); 
    }

}
module.exports = {s_ball };

