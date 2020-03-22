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

        /*
        ---------------
        Drawing squares
        ---------------
        void ctx.fillRect(x, y, width, height);
        x: La componente x de la coordenada para el punto de comienzo del rectángulo.
        y: La componente y de la coordenada para el punto de comienzo del rectángulo.

        width: La anchura del rectángulo.
        height: La altura del rectángulo.
        ctx.fillStyle = '#999999';
        ctx.fillRect(this.x*ROW_WIDTH, this.y*ROW_HEIGHT, ROW_WIDTH, ROW_HEIGHT);
        */

        /*
        void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

        sx: La coordenada X de la esquina superior izquierda del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.
        sy: La coordenada Y de la esquina superior izquierda del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.

        sWidth: El ancho del sub-rectangulo de la imagen origen a dibujar en el contexto de destino. Si no se especifica, se utiliza todo el rectangulo entero desde las coordenadas especificadas por sx y sy hasta la esquina inferior derecha de la imagen.
        sHeight: La altura del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.

        dx: La coordenada X del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.dy: La coordenada Y del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.

        dWidth: El ancho para dibujar la imagen en el canvas destino.
        dHeight: El alto para dibujar la imagen en el canvas destino. Esto permite escalar la imagen dibujada. Si no se especifica, el alto de la imagen no se escala al dibujar.
        */
        ctx.drawImage(tileMap,this.current_frame*TILE_WIDTH,2*TILE_HEIGHT,TILE_WIDTH,TILE_HEIGHT,ROW_WIDTH*x,ROW_HEIGHT*y,ROW_WIDTH,ROW_HEIGHT);
    }

}
