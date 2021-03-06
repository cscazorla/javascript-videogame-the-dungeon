var Loader = {
    images: {}
};

Loader.loadImage = function (key, src) {
    var img = new Image();

    var d = new Promise(function (resolve, reject) {
        img.onload = function () {
            this.images[key] = img;
            resolve(img);
        }.bind(this);

        img.onerror = function () {
            reject('Could not load image: ' + src);
        };
    }.bind(this));

    img.src = src;
    return d;
};

Loader.getImage = function (key) {
    return (key in this.images) ? this.images[key] : null;
};

var Game = {}


window.onload = function () {
    canvas = document.getElementById('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    context = canvas.getContext('2d');
    Game.run(context);
};


Game.run = function (context) {
    this.is_paused = false;
    this.ctx = context;
    this._previousElapsed = 0;
    var p = this.load();

    Input.init();

    Promise.all(p).then(function (loaded) {
        this.init(0);
        window.requestAnimationFrame(this.tick);
    }.bind(this));
}

Game.load = function () {
    return [
        Loader.loadImage('tiles', './img/tilemap.png'),
    ];
};


Game.init = function (level) {
    this.tileAtlas = Loader.getImage('tiles');

    this.main_player = new player();
    this.main_player.has_key = false;
    
    this.enemies = [];

    this.current_level = level;

    map.resetMapTiles();

    // Look for the coordinates of the Player, Enemies and Exit
    for(var c = 0; c < map.cols; c++)
    {
        for(var r = 0; r < map.rows; r++)
        {
            var tile = map.getTile(this.current_level, c, r);

            switch (tile) {
                case MAP.PLAYER:
                    this.main_player.x = c;
                    this.main_player.y = r;
                    this.main_player.starting_x = c;
                    this.main_player.starting_y = r;
                    
                    map.setTile(this.current_level, c, r, MAP.PATH);
                break;

                case MAP.ENEMY1:
                case MAP.ENEMY2:
                case MAP.ENEMY3:
                case MAP.ENEMY4:
                    this.enemies.push(new enemy(c, r, tile - 6));
                    map.setTile(this.current_level, c, r, MAP.PATH);
                break;

                case MAP.EXIT_CLOSED:
                    this.exit_coordinate_x = c;
                    this.exit_coordinate_y = r;
                    break;
            }
        }
    }

    // Spawn torches
    this.torches = [
        new torch(0, 0),
        new torch(14, 0),
        new torch(0, 9),
        new torch(14, 9),
    ];

}

Game.tick = function (elapsed) {
    window.requestAnimationFrame(this.tick);

    // Clear previous frame
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;
    this.update(delta);

    this.render();

}.bind(Game);


Game.update = function (delta) {
    // console.log(Math.round((delta + Number.EPSILON) * 100) / 100);

    if(!this.is_paused)
    {
        // Player movement
        if( Input.isPressed('up') ) {
            this.main_player.move('up');
        }
        if( Input.isPressed('down') ) {
            this.main_player.move('down');
        }
        if( Input.isPressed('left') ) {
            this.main_player.move('left');
        }
        if( Input.isPressed('right') ) {
            this.main_player.move('right');
        }

        // Enemies
        for (i = 0; i < this.enemies.length; i++) {
            this.enemies[i].move();
        }
    }
    
};

Game.render = function () 
{
    var camera_size = 2;
    
    // Camera view
    for(var c = this.main_player.x - camera_size; c < this.main_player.x + camera_size + 1; c++)
    {
        for(var r = this.main_player.y - camera_size; r < this.main_player.y + camera_size + 1; r++)
        {
            // Tilemap
            var tile = map.getTile(this.current_level, c , r);
            Game.ctx.drawImage(
                this.tileAtlas,
                (tile - 1) * map.tsize,
                0,
                map.tsize,
                map.tsize,
                map.csize * (c),
                map.csize * (r),
                map.csize,
                map.csize
            );

            // Torches
            for (i = 0; i < this.torches.length; i++) {
                if (this.torches[i].isLocatedInPosition(c,r)) 
                    this.torches[i].draw();
            }

            // Enemies
            for (i = 0; i < this.enemies.length; i++) {
                if (this.enemies[i].isLocatedInPosition(c,r)) 
                    this.enemies[i].draw();
            }
        }
    }

    // Player
    this.main_player.draw();

    // Exit
    Game.ctx.drawImage(
        Game.tileAtlas,
        ((this.main_player.has_key)?2:1) * map.tsize,
        0,
        map.tsize,
        map.tsize,
        this.exit_coordinate_x * map.csize,
        this.exit_coordinate_y * map.csize,
        map.csize,
        map.csize
    );

    // Toolbar background
    for (i = 0; i < map.cols; i++)
    {
        Game.ctx.drawImage(
            Game.tileAtlas,
            map.tsize * 3,
            0,
            map.tsize,
            map.tsize,
            map.csize * i,
            CANVAS_MAP_HEIGHT,
            map.csize,
            map.csize
        );
    }
    
    // Toolbar lifes
    this.ctx.fillStyle = '#421e02';
    this.ctx.font = '18px Rock Salt';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText('Lifes', 5, CANVAS_MAP_HEIGHT + 10);
    for(i = 0; i < this.main_player.lifes; i++)
    {
        Game.ctx.drawImage(
            Game.tileAtlas,
            0,
            map.tsize,
            map.tsize,
            map.tsize,
            65 + i * map.tsize,
            CANVAS_MAP_HEIGHT,
            map.tsize,
            map.tsize
        );
    }
    
    // Key
    if(Game.main_player.has_key)
    {
        Game.ctx.drawImage(
            Game.tileAtlas,
            map.tsize * 4,
            0,
            map.tsize,
            map.tsize,
            CANVAS_WIDTH/2,
            CANVAS_MAP_HEIGHT + 2,
            map.tsize,
            map.tsize
        );
    }

    // Toolbar level
    this.ctx.fillStyle = '#421e02';
    this.ctx.font = '18px Rock Salt';
    this.ctx.textBaseline = 'top';
    var level = 'Level: ' + (this.current_level + 1);
    this.ctx.fillText(level, CANVAS_WIDTH * (8/10), CANVAS_MAP_HEIGHT + 10);

    // Pause
    if(this.is_paused) {
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, CANVAS_HEIGHT/2 - 40, CANVAS_WIDTH, 45);
        this.ctx.globalAlpha = 1.0;
        
        this.ctx.fillStyle = '#421e02';
        this.ctx.font = '18px Rock Salt';
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = "center";
        this.ctx.fillText('Game Paused', CANVAS_WIDTH / 2, CANVAS_MAP_HEIGHT / 2);
        this.ctx.textAlign = "left";
    }
}