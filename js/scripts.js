var Player = {
  initialize: function(symbol){
    this.symbol = symbol;
  },
  create: function(symbol) {
    var playerInstance = Object.create(Player);
    playerInstance.initialize(symbol);
    return playerInstance;
  }
}

var Space = {
  initialize: function(x,y) {
    this.xCoordinate = x;
    this.yCoordinate = y;
  },
  create: function(x,y) {
    var spaceInstance = Object.create(Space);
    spaceInstance.initialize(x,y);
    return spaceInstance;
  },
  markBy: function(player) {
    this.markedBy = player;
  }
}

var Board = {
  initialize: function() {
    this.spaces = [];
    for (var i = 1; i <= 3; i += 1) {
      for (var j = 1; j <= 3; j += 1) {
        this.spaces.push(Space.create(i, j));
      };
    };
    console.log(this.spaces);
  }
}
