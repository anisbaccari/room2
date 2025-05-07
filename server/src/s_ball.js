 class  s_ball {


    constructor(id)
    {
        this.id = id
        this.x  =  10;
        this.y  =  0;
        this.z  =  0;
        this.dx  =  0;
        this.left_bound = -60 ;
        this.right_bound = 60 ;
        this.display()
    }

    setup(id)
    {
        this.id = id;
    }


    interPlayers(left_paddle,right_paddle)
    {
        if(  this.x   == left_paddle || this.x  == right_paddle )
            return true; 
        else 
            return false; 
    }
    interBound(position)
    {

        this.x = position
        if(  this.x   < this.left_bound || this.x   > this.right_bound )
            return true; 
        else 
            return false; 
    }
    display() {
        console.log(`************** BALL id : ${this.id} ****************`);
       
        
    }
}
module.exports = {s_ball };