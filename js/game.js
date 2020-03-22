const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;

// Global variables
var canvas;
var ctx;
var main_player;
var enemies = [];
var torches = [];
var music;
var sfx_key;
var sfx_dead;


function setup()
{
    canvas = document.getElementById('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    ctx = canvas.getContext('2d');
    ctx.translate(0.5, 0.5); // Canvas drawImage - visible edges of tiles
    //ctx.imageSmoothingEnabled = false; // Canvas drawImage - visible edges of tiles
    
    main_player = new player();

    // Spawn torches
    torches.push(new torch(0,0));
    torches.push(new torch(7,0));
    torches.push(new torch(14,0));
    torches.push(new torch(0,9));
    torches.push(new torch(7,9));
    torches.push(new torch(14,9));
    
    // Spawn enemies
    enemies.push(new enemy(1,8,1));
    enemies.push(new enemy(7,3,2));
    enemies.push(new enemy(12,3,3));
    enemies.push(new enemy(7,8,4));
    
    // Listen for the keyboard events
    document.addEventListener('keydown',input);
    
    gameLoop();
}

function gameLoop() 
{
    drawLevel();
    
    main_player.draw();
    
    // Enemies
    for(i = 0; i < enemies.length; i++)
    {
        enemies[i].move();
        enemies[i].draw();
    }
    
    // Torches
    for(i = 0; i < torches.length; i++)
    {
        torches[i].draw();
    }

    requestAnimationFrame(gameLoop);
}

function printMessage(message) {
    document.getElementById("messages").innerHTML = message;
}