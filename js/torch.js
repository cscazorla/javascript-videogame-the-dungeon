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

        Game.ctx.drawImage(Game.tileAtlas,this.current_frame*TILE_WIDTH,2*TILE_HEIGHT,TILE_WIDTH,TILE_HEIGHT,ROW_WIDTH*x,ROW_HEIGHT*y,ROW_WIDTH,ROW_HEIGHT);
    }

}
