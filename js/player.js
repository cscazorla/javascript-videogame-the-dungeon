var player = function()
{
    this.x = 1;
    this.y = 1;

    this.has_key = false;

    this.draw = function()
    {
        /*
        ---------------
        Drawing squares
        ---------------
        void ctx.fillRect(x, y, width, height);
        x: La componente x de la coordenada para el punto de comienzo del rectángulo.
        y: La componente y de la coordenada para el punto de comienzo del rectángulo.

        width: La anchura del rectángulo.
        height: La altura del rectángulo.
        ctx.fillStyle = '#820c01';
        ctx.fillRect(this.x*ROW_WIDTH, this.y*ROW_HEIGHT, ROW_WIDTH, ROW_HEIGHT);
        */

        /*
        ---------------
        TILEMAP
        ---------------
        void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

        sx: La coordenada X de la esquina superior izquierda del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.
        sy: La coordenada Y de la esquina superior izquierda del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.

        sWidth: El ancho del sub-rectangulo de la imagen origen a dibujar en el contexto de destino. Si no se especifica, se utiliza todo el rectangulo entero desde las coordenadas especificadas por sx y sy hasta la esquina inferior derecha de la imagen.
        sHeight: La altura del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.

        dx: La coordenada X del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.dy: La coordenada Y del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.

        dWidth: El ancho para dibujar la imagen en el canvas destino.
        dHeight: El alto para dibujar la imagen en el canvas destino. Esto permite escalar la imagen dibujada. Si no se especifica, el alto de la imagen no se escala al dibujar.
        */
        ctx.drawImage(tileMap,0,TILE_HEIGHT,TILE_WIDTH,TILE_HEIGHT,this.x*ROW_WIDTH,this.y*ROW_HEIGHT,ROW_WIDTH,ROW_HEIGHT);
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

        if(level[y][x] == WALL || level[y][x] == EXIT_CLOSED)
        {
            is_wall = true;
        }

        return(is_wall);
    }

    this.moveUp = function()
    {
        if(this.isWall(this.x, this.y-1) == false)
        {
            this.y--;
            this.touchObject();
        }
    }


    this.moveDown = function()
    {
        if(this.isWall(this.x, this.y+1) == false)
        {
            this.y++;
            this.touchObject();
        }
    }

    this.moveLeft = function()
    {
        if(this.isWall(this.x-1, this.y) == false)
        {
            this.x--;
            this.touchObject();
        }
    }

    this.moveRight = function()
    {
        if(this.isWall(this.x+1, this.y) == false)
        {
            this.x++;
            this.touchObject();
        }
    }

    this.victoria = function()
    {
        printMessage('¡Has ganado!');

        this.x = 1;
        this.y = 1;

        this.has_key = false;
        level[8][3] = KEY;
        for(y = 0; y < level.length; y++)
        {
            for(x = 0; x < level[0].length; x++)
            {
                if (level[y][x] == EXIT_OPEN)
                {
                    level[y][x] = EXIT_CLOSED;
                }
            }
        }
    }


    this.gameOver = function()
    {
        alert('¡Has perdido!')
        printMessage('&nbsp');

        this.x = 1;
        this.y = 1;

        this.has_key = false;
        level[8][3] = KEY;
    }

    this.touchObject = function()
    {
        var object = level[this.y][this.x];

        if(object == KEY)
        {
            this.has_key = true;
            level[this.y][this.x] = PATH;
            printMessage('¡Has obtenido la llave!');
            for(y = 0; y < level.length; y++)
            {
                for(x = 0; x < level[0].length; x++)
                {
                    if (level[y][x] == EXIT_CLOSED)
                    {
                        level[y][x] = EXIT_OPEN;
                    }
                }
            }
        }

        if(object == EXIT_OPEN)
        {
            if(this.has_key == true)
                this.victoria();
            else
                printMessage('No tienes la llave, no puedes pasar.');
        }
    }
}
