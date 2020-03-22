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
        ctx.fillStyle = '#fc03ca';
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
        ctx.drawImage(tileMap,this.type*TILE_WIDTH,TILE_HEIGHT,TILE_WIDTH,TILE_HEIGHT,this.x*ROW_WIDTH,this.y*ROW_HEIGHT,ROW_WIDTH,ROW_HEIGHT);
    }


    this.isCollision = function(x,y)
    {
        var colision = false;

        if(level[y][x] == WALL || level[y][x] == EXIT_CLOSED || level[y][x] == EXIT_OPEN)
        {
            colision = true;
        }
        return colision;
    }


    this.move = function()
    {
        if (main_player.isLocatedInPosition(this.x, this.y))
        {
            main_player.gameOver();
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
