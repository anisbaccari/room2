 class  s_ball {


    constructor(id) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.width = 2;
        this.height = 2;
        this.depth = 2;

        this.dx = 1; // movement direction
        this.dz = 1;
        this.display()
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

        return (
            Math.abs(a.position.x - b.position.x) < (a.size.width / 2 + b.size.width / 2) &&
            Math.abs(a.position.y - b.position.y) < (a.size.height / 2 + b.size.height / 2) &&
            Math.abs(a.position.z - b.position.z) < (a.size.depth / 2 + b.size.depth / 2)
        );
    }

    // Update position logic (example)
    move() {
        this.x += this.dx;
        this.z += this.dz;
    }

    interBound(position)
    {
        this.x = position
        if(  this.x   < this.left_bound || this.x   > this.right_bound )
            return true; 
        else 
            return false; 
    }
    display() 
    {
        console.log(` \x1b[31m%s\x1b[0m`,` BALL ID ${this.id} `);  
        console.log(` x : ${this.x} -  z ${this.z} `);  
    }

}
module.exports = {s_ball };

