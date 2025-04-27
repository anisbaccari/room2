 class  s_ball {


    constructor(id)
    {
        this.id = id
        this.x  =  10;
        this.y  =  0;
        this.z  =  0;
        this.dx  =  0;
        this.display()
    }

    setup(id)
    {
        this.id = id;
    }

    display() {
        console.log(`************** BALL id : ${this.id} ****************`);
       
        
    }
}
module.exports = {s_ball };