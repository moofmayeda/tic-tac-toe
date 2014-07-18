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
  },
  find: function(x,y) {
    if (this.xCoordinate === x && this.yCoordinate === y) {
      return this;
    } else {
      return 0;
    }
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
  },
  playerMarks: function(x,y,player) {
    this.spaces.forEach(function(space) {
        if (space.find(x,y) !== 0 ) {
          space.markBy(player);
        }
      });
  },
  threeInARow: function(player) {
    var rows = [[0,4,8],[2,4,6],[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8]];
    // rows.forEach(function(row) {
    //   if (this.spaces[row[0]].markedBy === player && this.spaces[row[1]].markedBy === player && this.spaces[row[2]].markedBy === player) {
    //     alert("hi");
    //     console.log(true); /* maybe try using continue here? it's returning a sequence of trues and falses */
    //   } else {
    //     console.log(false);
    //   }
    // });
    if (this.spaces[0].markedBy === player && this.spaces[4].markedBy === player && this.spaces[8].markedBy === player) {
      return true;
    } else if (this.spaces[2].markedBy === player && this.spaces[4].markedBy === player && this.spaces[6].markedBy === player) {
      return true;
    } else if (this.spaces[0].markedBy === player && this.spaces[1].markedBy === player && this.spaces[2].markedBy === player) {
      return true;
    } else if (this.spaces[3].markedBy === player && this.spaces[4].markedBy === player && this.spaces[5].markedBy === player) {
      return true;
    } else if (this.spaces[6].markedBy === player && this.spaces[7].markedBy === player && this.spaces[8].markedBy === player) {
      return true;
    } else if (this.spaces[0].markedBy === player && this.spaces[3].markedBy === player && this.spaces[6].markedBy === player) {
      return true;
    } else if (this.spaces[1].markedBy === player && this.spaces[4].markedBy === player && this.spaces[7].markedBy === player) {
      return true;
    } else if (this.spaces[2].markedBy === player && this.spaces[5].markedBy === player && this.spaces[8].markedBy === player) {
      return true;
    }
  }
}

var Game = {
  initialize: function(playerOneName, playerTwoName) {
    this.board = Object.create(Board);
    this.board.initialize();
    this.playerOne = {name: playerOneName, player: Player.create("X"), turn: true};
    this.playerTwo = {name: playerTwoName, player: Player.create("Y"), turn: false};
  },
  whoGoesFirst: function() {
    if (Math.random() >= .5) {
      this.playerOne.turn = true;
      this.playerTwo.turn = false;
      return this.playerOne.name;
    } else {
      this.playerOne.turn = false;
      this.playerTwo.turn = true;
      return this.playerTwo.name;
    }
  },
  changeTurns: function() {
    if (this.playerOne.turn) {
      this.playerOne.turn = false;
      this.playerTwo.turn = true;
    } else {
      this.playerOne.turn = true;
      this.playerTwo.turn = false
    }
  }
}

$(document).ready(function() {
  $("form#new-game").submit(function(event) {
    event.preventDefault();
    var playerOneName = $("input#player-one-name").val();
    var playerTwoName = $("input#player-two-name").val();

  });
});