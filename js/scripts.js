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
    var board = this;
    return rows.some(function(winningCombo) {
      return (board.spaces[winningCombo[0]].markedBy === player && board.spaces[winningCombo[1]].markedBy === player && board.spaces[winningCombo[2]].markedBy === player);
    });
  }
}

var Game = {
  initialize: function(playerOneName, playerTwoName) {
    this.board = Object.create(Board);
    this.board.initialize();
    this.playerOne = {name: playerOneName, player: Player.create("X"), turn: true};
    this.playerTwo = {name: playerTwoName, player: Player.create("O"), turn: false};
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
    (this.playerOne.turn)? this.playerOne.turn = false /*&& this.playerTwo.turn = true*/ : this.playerOne.turn = true /*&& this.playerTwo.turn = false*/;
  },
  howManyTurns: function() {
    var turns = 0;
    for (var i = 0; i <= 8; i += 1) {
      if (this.board.spaces[i].markedBy === this.playerOne.player || this.board.spaces[i].markedBy === this.playerTwo.player) {
        turns += 1;
      }
    }
    return turns;
  },
  gameOver: function() {
    if (this.board.threeInARow(this.playerOne.player)) {
      return this.playerOne.name;
    } else if (this.board.threeInARow(this.playerTwo.player)) {
      return this.playerTwo.name;
    } else if (this.howManyTurns() === 9) {
      return "draw";
    } else {
      return "in progress";
    }
  }
}

var markCheckAndChange = function(x,y,game) {
  if (game.playerOne.turn) {
    game.board.playerMarks(x,y,game.playerOne.player);
  } else {
    game.board.playerMarks(x,y,game.playerTwo.player);
  }
  if(game.gameOver() === "draw") {
    $("#draw-result").show();
  } else if (game.gameOver() !== "in progress") {
    $("#win-result").show();
    $("#winner-name").text(game.gameOver());
  }
  game.changeTurns();
  if (game.playerOne.turn) {
    $("#player-turn-symbol").text(game.playerOne.player.symbol);
    $("#whose-turn").text(game.playerOne.name);
  } else {
    $("#player-turn-symbol").text(game.playerTwo.player.symbol);
    $("#whose-turn").text(game.playerTwo.name);
  };
}

$(document).ready(function() {
  var currentGame;
  $("form#new-game").submit(function(event) {
    var playerOneName = $("input#player-one-name").val();
    var playerTwoName = $("input#player-two-name").val();
    $("input#player-one-name").val("");
    $("input#player-two-name").val("");
    $(".space-buttons").empty();
    $("#win-result").hide();
    $("#draw-result").hide();
    var newGame = {};
    newGame = Object.create(Game);
    newGame.initialize(playerOneName, playerTwoName);
    currentGame = newGame;
    currentGame.whoGoesFirst();
    if (currentGame.playerOne.turn) {
      $("#player-turn-symbol").text(currentGame.playerOne.player.symbol);
      $("#whose-turn").text(currentGame.playerOne.name);
    } else {
      $("#player-turn-symbol").text(currentGame.playerTwo.player.symbol);
      $("#whose-turn").text(currentGame.playerTwo.name);
    };
    $("#turn-display").show();

    $("#space-0").click(function(event) {
      if (currentGame.playerOne.turn) {
        $("#space-0").text(currentGame.playerOne.player.symbol);
      } else  {
        $("#space-0").text(currentGame.playerTwo.player.symbol);
      }
      markCheckAndChange(1,1,currentGame);
    });
    $("#space-1").click(function(event) {
      if (currentGame.playerOne.turn) {
        $("#space-1").text(currentGame.playerOne.player.symbol);
      } else  {
        $("#space-1").text(currentGame.playerTwo.player.symbol);
      }
      markCheckAndChange(1,2,currentGame);
    });
    $("#space-2").click(function(event) {
      if (currentGame.playerOne.turn) {
        $("#space-2").text(currentGame.playerOne.player.symbol);
      } else  {
        $("#space-2").text(currentGame.playerTwo.player.symbol);
      }
      markCheckAndChange(1,3,currentGame);
    });
    $("#space-3").click(function(event) {
      if (currentGame.playerOne.turn) {
        $("#space-3").text(currentGame.playerOne.player.symbol);
      } else  {
        $("#space-3").text(currentGame.playerTwo.player.symbol);
      }
      markCheckAndChange(2,1,currentGame);
    });
    $("#space-4").click(function(event) {
      if (currentGame.playerOne.turn) {
        $("#space-4").text(currentGame.playerOne.player.symbol);
      } else  {
        $("#space-4").text(currentGame.playerTwo.player.symbol);
      }
      markCheckAndChange(2,2,currentGame);
    });
    $("#space-5").click(function(event) {
      if (currentGame.playerOne.turn) {
        $("#space-5").text(currentGame.playerOne.player.symbol);
      } else  {
        $("#space-5").text(currentGame.playerTwo.player.symbol);
      }
      markCheckAndChange(2,3,currentGame);
    });
    $("#space-6").click(function(event) {
      if (currentGame.playerOne.turn) {
        $("#space-6").text(currentGame.playerOne.player.symbol);
      } else  {
        $("#space-6").text(currentGame.playerTwo.player.symbol);
      }
      markCheckAndChange(3,1,currentGame);
    });
    $("#space-7").click(function(event) {
      if (currentGame.playerOne.turn) {
        $("#space-7").text(currentGame.playerOne.player.symbol);
      } else  {
        $("#space-7").text(currentGame.playerTwo.player.symbol);
      }
      markCheckAndChange(3,2,currentGame);
    });
    $("#space-8").click(function(event) {
      if (currentGame.playerOne.turn) {
        $("#space-8").text(currentGame.playerOne.player.symbol);
      } else  {
        $("#space-8").text(currentGame.playerTwo.player.symbol);
      }
      markCheckAndChange(3,3,currentGame);
    });

    event.preventDefault();
  });
});
