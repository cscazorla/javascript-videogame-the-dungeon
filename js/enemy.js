var enemy = function(x,y,type)
{
    this.speed = 1; // 1: Slow, 10: Fast
    this.speed /= 50;

    this.x = x;
    this.y = y;
    this.type = type; // [1-3]
    this.counter = 0;

    const UP = 0;
    const DOWN = 1;
    const LEFT = 2;
    const RIGHT = 3;

    this.direction = Math.floor(Math.random()*4);

    this.isLocatedInPosition = function(x,y)
    {
        return (this.x == x && this.y == y)?true:false;
    }

    this.draw = function()
    {
        Game.ctx.drawImage(
            Game.tileAtlas,
            this.type * map.tsize,
            map.tsize,
            map.tsize,
            map.tsize,
            this.x * map.csize,
            this.y * map.csize,
            map.csize,
            map.csize
        );
    }

    this.isCollision = function(x,y)
    {
        var colision = false;

        if(map.getTile(x,y) == WALL || map.getTile(x,y) == EXIT_CLOSED || map.getTile(x,y) == EXIT_OPEN)
        {
            colision = true;
        }
        return colision;
    }


    this.move = function()
    {
        if (Game.main_player.isLocatedInPosition(this.x, this.y))
        {
            Game.main_player.gameOver();
        }

        if(this.counter < (1/this.speed))
        {
            this.counter++;
        }
        else
        {
            this.counter = 0;

            if(this.direction == UP)
            {
                if(this.isCollision(this.x, this.y - 1) == false)
                {
                    this.y--;
                }
                else
                {
                    this.direction = Math.floor(Math.random()*4);
                }
            }

            if(this.direction == DOWN)
            {
                if(this.isCollision(this.x, this.y + 1) == false)
                {
                    this.y++;
                }
                else
                {
                    this.direction = Math.floor(Math.random()*4);
                }
            }

            if(this.direction == LEFT)
            {
                if(this.isCollision(this.x - 1, this.y) == false)
                {
                    this.x--;
                }
                else
                {
                    this.direction = Math.floor(Math.random()*4);
                }
            }

            if(this.direction == RIGHT)
            {
                if(this.isCollision(this.x + 1, this.y) == false)
                {
                    this.x++;
                }
                else
                {
                    this.direction = Math.floor(Math.random()*4);
                }
            }
        }
    }
}
