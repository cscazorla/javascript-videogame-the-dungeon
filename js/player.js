var player = function()
{
    this.max_lifes = 3;
    this.lifes = this.max_lifes;
    this.is_looking_right = false;
    this.speed_delay = 4;
    this.counter_speed_delay = 0;
    this.starting_x = 0;
    this.starting_y = 0;
    
    this.draw = function()
    {
        if(this.is_looking_right) {
            Game.ctx.drawImage(
                Game.tileAtlas,
                4 * map.tsize,
                2 * map.tsize,
                map.tsize,
                map.tsize,
                this.x * map.csize,
                this.y * map.csize,
                map.csize,
                map.csize
            );
        } else {
            Game.ctx.drawImage(
                Game.tileAtlas,
                0,
                map.tsize,
                map.tsize,
                map.tsize,
                this.x * map.csize,
                this.y * map.csize,
                map.csize,
                map.csize
            );
        }
    }
    
    this.isLocatedInPosition = function(x,y)
    {
        return (this.x == x && this.y == y)?true:false;
    }
    
    this.isWall = function(x,y)
    {
        var is_wall = false;
        
        if(map.getTile(Game.current_level, x, y) == WALL || map.getTile(Game.current_level, x, y) == EXIT_CLOSED)
        {
            is_wall = true;
        }
        
        return(is_wall);
    }
    
    this.move = function(direction)
    {
        if(this.counter_speed_delay < this.speed_delay)
        {
            this.counter_speed_delay++
        }
        else 
        {
            switch(direction)
            {
                case 'Up':
                if(this.isWall(this.x, this.y-1) == false)
                {
                    this.y--;
                }
                break;
                
                case 'Down':
                if(this.isWall(this.x, this.y+1) == false)
                {
                    this.y++;
                }
                break;
                
                case 'Left':
                if(this.isWall(this.x-1, this.y) == false)
                {
                    this.x--;
                    this.is_looking_right = false;
                }
                break;
                
                case 'Right':
                if(this.isWall(this.x+1, this.y) == false)
                {
                    this.x++;
                    this.is_looking_right = true;
                }
                break;
            }
            
            this.touchObject();
            this.counter_speed_delay = 0;
        }
    }

    this.hitByEnemy = function() {
        this.lifes -= 1;

        if (this.lifes == 0) {
            this.gameOver();
        } else {
            this.x = this.starting_x;
            this.y = this.starting_y;
        }
    }

    this.win = function()
    {
        if( Game.current_level + 1 == map.getTotalLevels()) {
            alert('¡Has ganado!');
            Game.init(0);
        } else {
            Game.init(Game.current_level + 1);
        }
            
    }
    
    this.gameOver = function()
    {
        alert('¡Has perdido! Comienza de nuevo');
        Game.init(0);
        
    }
    
    this.touchObject = function()
    {
        var object = map.getTile(Game.current_level, this.x, this.y);
        
        if(object == KEY)
        {
            this.has_key = true;
            map.setTile(Game.current_level, this.x, this.y, PATH);
            for(var c = 0; c < map.cols; c++)
            {
                for(var r = 0; r < map.rows; r++)
                {
                    if (map.getTile(Game.current_level, c, r) == EXIT_CLOSED)
                    {
                        map.setTile(Game.current_level, c, r, EXIT_OPEN);
                    }
                }
            }
        }
        
        if(object == EXIT_OPEN)
        {
            if(this.has_key == true)
            this.win();
            else
            alert('No tienes la llave, no puedes pasar.');
        }
    }
}
