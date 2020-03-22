var player = function()
{
    this.x = 1;
    this.y = 1;
    
    this.has_key = false;
    
    this.speed_delay = 4;
    this.counter_speed_delay = 0;
    
    this.draw = function()
    {
        Game.ctx.drawImage(Game.tileAtlas,0,TILE_HEIGHT,TILE_WIDTH,TILE_HEIGHT,this.x*ROW_WIDTH,this.y*ROW_HEIGHT,ROW_WIDTH,ROW_HEIGHT);
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
    
    this.isWall = function(x,y)
    {
        var is_wall = false;
        
        if(map.getTile(x,y) == WALL || map.getTile(x,y) == EXIT_CLOSED)
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
                }
                break;
                
                case 'Right':
                if(this.isWall(this.x+1, this.y) == false)
                {
                    this.x++;
                }
                break;
            }
            
            this.touchObject();
            this.counter_speed_delay = 0;
        }
    }
    
    this.win = function()
    {
        Game.printMessage('¡Has ganado!');
        
        this.x = 1;
        this.y = 1;
        
        this.has_key = false;
        map.setTile(3,8,KEY);
        for(var c = 0; c < map.cols; c++)
        {
            for(var r = 0; r < map.rows; r++)
            {
                if (map.getTile(c,r) == EXIT_OPEN)
                {
                    map.setTile(c,r,EXIT_CLOSED);
                }
            }
        }
    }
    
    
    this.gameOver = function()
    {
        Game.printMessage('¡Has perdido! Comienza de nuevo');
        
        this.x = 1;
        this.y = 1;
        
        this.has_key = false;
        map.setTile(3,8,KEY);
    }
    
    this.touchObject = function()
    {
        var object = map.getTile(this.x,this.y);
        
        if(object == KEY)
        {
            this.has_key = true;
            map.setTile(this.x,this.y,PATH);
            Game.printMessage('¡Has obtenido la llave!');
            for(var c = 0; c < map.cols; c++)
            {
                for(var r = 0; r < map.rows; r++)
                {
                    if (map.getTile(c,r) == EXIT_CLOSED)
                    {
                        map.setTile(c,r,EXIT_OPEN);
                    }
                }
            }
        }
        
        if(object == EXIT_OPEN)
        {
            if(this.has_key == true)
            this.win();
            else
            Game.printMessage('No tienes la llave, no puedes pasar.');
        }
    }
}
