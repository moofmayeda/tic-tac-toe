describe("Player", function() {
  describe("initialize", function() {
    it("is initialized with a symbol", function() {
      var testPlayer = Object.create(Player);
      testPlayer.initialize("X");
      testPlayer.symbol.should.equal("X");
      Player.isPrototypeOf(testPlayer).should.equal(true);
    });
  });

  describe("create", function() {
    it("creates a new Player object", function() {
      var testPlayer = Player.create("X");
      Player.isPrototypeOf(testPlayer).should.equal(true);
      testPlayer.symbol.should.equal("X");
    });
  });
});

describe("Space", function() {
  describe("initialize", function() {
    it("is initialized with an x and y coordinate", function() {
      var testSpace = Object.create(Space);
      testSpace.initialize(1, 2);
      testSpace.xCoordinate.should.equal(1);
      testSpace.yCoordinate.should.equal(2);
    });
  });

  describe("create", function() {
    it('creates a new Space object', function() {
      var testSpace = Space.create(1, 2);
      Space.isPrototypeOf(testSpace).should.equal(true);
      testSpace.xCoordinate.should.equal(1);
    });
  });

  describe("markBy", function() {
    it("lets a player mark the space", function() {
      var testPlayer = Player.create("X");
      var testSpace = Space.create(1, 2);
      testSpace.markBy(testPlayer);
      testSpace.markedBy.should.equal(testPlayer);
    });
  });

  describe("find", function() {
    it("returns a space object by its coordinates", function() {
      var testSpace = Space.create(2,3);
      testSpace.find(2,3).should.equal(testSpace);
    });
  });
});

describe("Board", function() {
  describe("initialize", function() {
    it("creates 9 spaces when it is initialized", function() {
    var testBoard = Object.create(Board);
    testBoard.initialize();
    testBoard.spaces[0].xCoordinate.should.eql(1);
    });
  });

  describe("playerMarks", function() {
    it("given coordinates and a player, finds and marks the appropriate space", function() {
      var testBoard = Object.create(Board);
      testBoard.initialize();
      var testPlayer = Player.create("X");
      testBoard.playerMarks(1,2,testPlayer);
      testBoard.spaces[1].markedBy.should.equal(testPlayer);
    });
  });

  describe("threeInARow", function() {
    it("determines when a board has 3 marks on a diagonal by the same player", function() {
      var testBoard = Object.create(Board);
      testBoard.initialize();
      var testPlayer = Player.create("X");
      testBoard.playerMarks(2,2,testPlayer);
      testBoard.playerMarks(3,1,testPlayer);
      testBoard.playerMarks(1,3,testPlayer);
      testBoard.threeInARow(testPlayer).should.equal(true);
    });
    it("determines when a board has 3 marks in a row or column by the same player", function() {
      var testBoard = Object.create(Board);
      testBoard.initialize();
      var testPlayer = Player.create("X");
      testBoard.playerMarks(2,1,testPlayer);
      testBoard.playerMarks(2,2,testPlayer);
      testBoard.playerMarks(2,3,testPlayer);
      testBoard.threeInARow(testPlayer).should.equal(true);
    });
  });
});

describe("Game", function() {
  describe("initialize", function() {
    it("creates two players", function() {
      var testGame = Object.create(Game);
      testGame.initialize();
      Player.isPrototypeOf(testGame.playerOne.player).should.equal(true);
    });
    it("stores the names and symbols of the two players", function() {
      var testGame = Object.create(Game);
      testGame.initialize("moof","ali");
      testGame.playerTwo.name.should.equal("ali");
      testGame.playerTwo.player.symbol.should.equal("Y");
    });
    it("initializes the board", function() {
      var testGame = Object.create(Game);
      testGame.initialize();
      Board.isPrototypeOf(testGame.board).should.equal(true);
      testGame.board.spaces[5].yCoordinate.should.eql(3);
    });
  });
  describe("whoGoesFirst", function() {
    it("randomly decides which player starts the game", function() {
      var testGame = Object.create(Game);
      testGame.initialize("moof", "ali");
      testGame.whoGoesFirst().should.equal("moof");
    });
  });
  describe("changeTurns", function() {
    it("switches from one player's turn to the other", function() {
      var testGame = Object.create(Game);
      testGame.initialize();
      testGame.whoGoesFirst();
      testGame.changeTurns();
      testGame.playerOne.turn.should.equal(true);
    });
  });
  describe("howManyTurns", function() {
    it("counts the number of times spaces have been marked", function() {
      var testGame = Object.create(Game);
      testGame.initialize();
      testGame.board.playerMarks(2,1,testGame.playerOne.player);
      testGame.board.playerMarks(3,1,testGame.playerTwo.player);
      testGame.board.playerMarks(1,1,testGame.playerOne.player);
      testGame.board.playerMarks(1,2,testGame.playerTwo.player);
      testGame.howManyTurns().should.equal(4);
    });
  });
  describe("gameOver", function() {
    it("determines who the winner was", function() {
    // it("determines whether the game is in progress, who the winner was, or if it was a draw", function() {
      var testGame = Object.create(Game);
      testGame.initialize("moof", "ali");
      testGame.board.playerMarks(2,1,testGame.playerOne.player);
      testGame.board.playerMarks(3,1,testGame.playerOne.player);
      testGame.board.playerMarks(1,1,testGame.playerOne.player);
      testGame.gameOver().should.equal("moof");
    });
    it("determines if the game is a draw", function() {
      var testGame = Object.create(Game);
      testGame.initialize("moof", "ali");
      testGame.board.playerMarks(1,1,testGame.playerTwo.player);
      testGame.board.playerMarks(1,2,testGame.playerOne.player);
      testGame.board.playerMarks(1,3,testGame.playerTwo.player);
      testGame.board.playerMarks(2,1,testGame.playerOne.player);
      testGame.board.playerMarks(2,2,testGame.playerOne.player);
      testGame.board.playerMarks(2,3,testGame.playerTwo.player);
      testGame.board.playerMarks(3,1,testGame.playerOne.player);
      testGame.board.playerMarks(3,2,testGame.playerTwo.player);
      testGame.board.playerMarks(3,3,testGame.playerOne.player);
      testGame.gameOver().should.equal("draw");
    });
    it("determines if the game is still in progress", function() {
      var testGame = Object.create(Game);
      testGame.initialize("moof", "ali");
      testGame.board.playerMarks(1,1,testGame.playerTwo.player);
      testGame.board.playerMarks(1,2,testGame.playerOne.player);
      testGame.board.playerMarks(1,3,testGame.playerTwo.player);
      testGame.board.playerMarks(2,1,testGame.playerOne.player);
      testGame.board.playerMarks(2,2,testGame.playerOne.player);
      testGame.board.playerMarks(2,3,testGame.playerTwo.player);
      testGame.board.playerMarks(3,1,testGame.playerOne.player);
      testGame.board.playerMarks(3,2,testGame.playerTwo.player);
      testGame.gameOver().should.equal("in progress");
    });
  });
});
