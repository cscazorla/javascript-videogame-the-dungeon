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
Game.CANVAS_WIDTH = 900;
Game.CANVAS_HEIGHT = 600;

window.onload = function () {
    canvas = document.getElementById('canvas');
    canvas.width = Game.CANVAS_WIDTH;
    canvas.height = Game.CANVAS_HEIGHT;
    context = canvas.getContext('2d');
    Game.run(context);
};


Game.run = function(context)
{
    this.ctx = context;
    this.ctx.translate(0.5, 0.5); // Canvas drawImage - visible edges of tiles
    //ctx.imageSmoothingEnabled = false; // Canvas drawImage - visible edges of tiles

    this._previousElapsed = 0;

    var p = this.load();
    Promise.all(p).then(function (loaded) {
        this.init();
        window.requestAnimationFrame(this.tick);
    }.bind(this));

}

Game.load = function () {
    return [
        Loader.loadImage('tiles', './img/tilemap.png'),
    ];
};


Game.init = function() 
{
    this.tileAtlas = Loader.getImage('tiles');

    this.main_player = new player();

    // Spawn torches
    this.torches = [
        new torch(0,0),
        new torch(7,0),
        new torch(14,0),
        new torch(0,9),
        new torch(7,9),
        new torch(14,9),
    ];
    
    // Spawn enemies
    this.enemies = [
        new enemy(1,8,1),
        new enemy(7,3,2),
        new enemy(12,3,3),
        new enemy(7,8,4)
    ];
    
    Keyboard.listenForEvents([Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
}

Game.tick = function(elapsed) 
{
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


Game.update = function (delta) 
{
    //console.log(Math.round((delta + Number.EPSILON) * 100) / 100);
    
    // Player movement
    if (Keyboard.isDown(Keyboard.LEFT)) { Game.main_player.move('Left'); }
    if (Keyboard.isDown(Keyboard.RIGHT)) { Game.main_player.move('Right'); }
    if (Keyboard.isDown(Keyboard.UP)) { Game.main_player.move('Up'); }
    if (Keyboard.isDown(Keyboard.DOWN)) { Game.main_player.move('Down'); }
    

    // Enemies
    for(i = 0; i < this.enemies.length; i++)
    {
        this.enemies[i].move();
    }
};

Game.render = function () 
{
    // Map
    for(var c = 0; c < map.cols; c++)
    {
        for(var r = 0; r < map.rows; r++)
        {
            var tile = map.getTile(c,r);

            Game.ctx.drawImage(
                this.tileAtlas,
                tile * map.tsize,
                0,
                map.tsize,
                map.tsize,
                map.csize * c,
                map.csize * r,
                map.csize,
                map.csize
            );
        }
    }

    // Player
    this.main_player.draw();

    // Enemies
    for(i = 0; i < this.enemies.length; i++)
    {
        this.enemies[i].draw();
    }
    
    // Torches
    for(i = 0; i < this.torches.length; i++)
    {
        this.torches[i].draw();
    }
}

Game.printMessage = function(message) {
    document.getElementById("messages").innerHTML = message;
}