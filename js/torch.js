var torch = function(x,y)
{
    this.animation_speed = 0.2; // [0-1] [Slow-Fast]

    this.x = x;
    this.y = y;
    this.counter = 0;
    this.current_frame = 0;

    this.animate = function()
    {
        if(this.current_frame < 3)
        this.current_frame++;
        else
        this.current_frame = 0;
    }

    this.draw = function()
    {
        if(this.counter < (1/this.animation_speed) )
        {
            this.counter++;
        }
        else
        {
            this.counter = 0;
            this.animate();
        }

        Game.ctx.drawImage(
            Game.tileAtlas,
            this.current_frame * map.tsize,
            2 * map.tsize,
            map.tsize,
            map.tsize,
            map.csize * x,
            map.csize * y,
            map.csize,
            map.csize
        );
    }

    this.isLocatedInPosition = function(x,y)
    {
        if(this.x == x && this.y == y)
        {
            return true;
        } else {
            return false;
        }
    }

}
