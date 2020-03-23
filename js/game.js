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
Game.CANVAS_WIDTH = 480;
Game.CANVAS_HEIGHT = 320;

window.onload = function () {
    canvas = document.getElementById('canvas');
    canvas.width = Game.CANVAS_WIDTH;
    canvas.height = Game.CANVAS_HEIGHT;
    context = canvas.getContext('2d');
    Game.run(context);
};


Game.run = function (context) {
    this.ctx = context;
    this._previousElapsed = 0;

    var p = this.load();
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
    this.enemies = [];

    this.current_level = level;
    Game.setLevelLabel();

    map.resetMapTiles();

    // Look for the coordinates of the Player, Enemies and Exit
    for(var c = 0; c < map.cols; c++)
    {
        for(var r = 0; r < map.rows; r++)
        {
            var tile = map.getTile(this.current_level, c, r);

            switch (tile) {
                case PLAYER:
                    this.main_player.x = c;
                    this.main_player.y = r;
                    this.main_player.has_key = false;
                    map.setTile(this.current_level, c, r, PATH);
                break;

                case ENEMY1:
                case ENEMY2:
                case ENEMY3:
                case ENEMY4:
                    this.enemies.push(new enemy(c, r, tile - 6));
                    map.setTile(this.current_level, c, r, PATH);
                break;

                case EXIT_CLOSED:
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

    Keyboard.listenForEvents([Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
}

Game.tick = function (elapsed) {
    window.requestAnimationFrame(this.tick);

    // Clear previous frame
    this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;
    this.update(delta);

    this.render();

}.bind(Game);


Game.update = function (delta) {
    //console.log(Math.round((delta + Number.EPSILON) * 100) / 100);

    // Player movement
    if (Keyboard.isDown(Keyboard.LEFT)) {
        Game.main_player.move('Left');
    }
    if (Keyboard.isDown(Keyboard.RIGHT)) {
        Game.main_player.move('Right');
    }
    if (Keyboard.isDown(Keyboard.UP)) {
        Game.main_player.move('Up');
    }
    if (Keyboard.isDown(Keyboard.DOWN)) {
        Game.main_player.move('Down');
    }

    // Enemies
    for (i = 0; i < this.enemies.length; i++) {
        this.enemies[i].move();
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
}

Game.setLevelLabel = function () {
    var level = this.current_level + 1;
    document.getElementById("level").innerHTML = "Level: " + level;
}