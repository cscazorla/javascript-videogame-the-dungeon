const WALL = 0;
const EXIT_CLOSED = 1;
const EXIT_OPEN = 2;
const PATH = 3;
const KEY = 4;

var map = {
    cols: 15,
    rows: 10,
    tsize: 32,
    csize: 32,
    tiles: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 4, 4, 4, 4, 1, 1, 4, 4, 1, 1, 1, 4, 4, 4, 4, 4, 1, 1, 4, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1, 1, 4, 4, 1, 4, 4, 4, 4, 1, 1, 1, 1, 4, 4, 4, 1, 1, 4, 4, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 4, 4, 1, 4, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 4, 4, 4, 4, 1, 1, 4, 4, 4, 1, 1, 4, 4, 4, 1, 1, 4, 1, 1, 1, 1, 1, 1, 4, 1, 1, 4, 4, 5, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    getTile: function (x,y) { 
        return this.tiles[y*map.cols + x] - 1;
    },
    setTile: function (x,y, value) {
        this.tiles[y*map.cols + x] = value + 1;
    },
};