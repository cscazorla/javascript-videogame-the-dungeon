function input(key)
{
    switch(key.keyCode) 
    {
        case 37: 
        main_player.moveLeft();
        break;
        
        case 38: 
        main_player.moveUp();
        break;
        
        case 39: 
        main_player.moveRight();
        break;
        
        case 40: 
        main_player.moveDown();
        break;
    }
}
