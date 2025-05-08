 class  s_ball {


    constructor(id,) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.width = 2;
        this.height = 2;
        this.depth = 2;

        this.left_bound = -100 - this.width / 2;
        this.right_bound = 100 + this.width / 2;

        this.playground = null
        this.dx = 1; // movement direction
        this.dz = 1;
        this.display()
    }

    setGround(playground)
    {
        this.playground = playground;
        console.log(`[Ball] g_width: ${playground}`)
        console.log(`[Ball] g_height: ${this.playground.g_height}`);
        console.log(`[Ball] nbPlayers: ${this.playground.nbPlayers}`);
        console.log(`[Ball] width_bound: ${this.playground.width_bound}`);
        console.log(`[Ball] height_bound: ${this.playground.height_bound}`);
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
    move(dx) {
        
        console.log(` x : ${this.x} -  z ${this.z} `);  
        this.x += dx;
      //  this.z += this.dz;
    }

    interBound(position)
    {

        console.log(` \x1b[31m%s\x1b[0m`,` BALL x ${this.x} `);  
        this.x = position
        if(  this.x   < this.left_bound || this.x   >= this.right_bound )
            return true; 
        else 
            return false; 
    }
    display() 
    {
        console.log(` \x1b[31m%s\x1b[0m`,` BALL ID ${this.id} `);  
        console.log(` x : ${this.x} -  z ${this.z} `); 
      //  console.log(` playground { width : ${this.playground.g_width} -  depth : ${this.playground.g_deepth} `); 
    }

}
module.exports = {s_ball };

