const ROW_WIDTH = 60;
const ROW_HEIGHT = 60;

const TILEMAP_FILE = 'img/tilemap.png'; // 128px x 96px
const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

const WALL = 0; // The player cannot go through it
const EXIT_CLOSED = 1;
const EXIT_OPEN = 2;
const PATH = 3;
const KEY = 4;

// 10 rows x 15 columns
var level = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,3,3,0,0,0,3,3,3,3,0,0,3,3,0],
    [0,0,3,3,3,3,3,0,0,3,0,0,3,0,0],
    [0,0,3,0,0,0,3,3,0,3,3,3,3,0,0],
    [0,0,3,3,3,0,0,3,3,3,0,3,0,0,0],
    [0,0,3,0,3,3,0,3,0,0,0,3,0,0,0],
    [0,0,3,0,0,3,3,3,3,0,0,3,3,3,0],
    [0,3,3,3,0,0,3,0,0,0,0,0,0,3,0],
    [0,3,3,4,0,0,3,3,3,3,3,3,3,3,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

var tileMap;
tileMap = new Image();
tileMap.src = TILEMAP_FILE;

function drawLevel()
{
    // Clean up the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(y = 0; y < level.length; y++)
    {
        for(x = 0; x < level[0].length; x++)
        {
            var tile = level[y][x];

            /*
            ---------------
            Drawing squares
            ---------------
            void ctx.fillRect(x, y, width, height);
            x: La componente x de la coordenada para el punto de comienzo del rectángulo.
            y: La componente y de la coordenada para el punto de comienzo del rectángulo.

            width: La anchura del rectángulo.
            height: La altura del rectángulo.
            var color;
            switch(tile)
            {
                case WALL:
                color = '#044f14';
                break;

                case EXIT:
                color = '#3a1700';
                break;

                case PATH:
                color = '#c6892f';
                break;

                case KEY:
                color = '#c6bc00';
                break;
            }

            ctx.fillStyle = color;
            ctx.fillRect(x*ROW_WIDTH, y*ROW_HEIGHT, ROW_WIDTH, ROW_HEIGHT);
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
            ctx.drawImage(tileMap,tile*TILE_WIDTH,0,TILE_WIDTH,TILE_HEIGHT,ROW_WIDTH*x,ROW_HEIGHT*y,ROW_WIDTH,ROW_HEIGHT);
        }
    }
}
