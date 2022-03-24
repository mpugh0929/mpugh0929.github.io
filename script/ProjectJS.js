var game1;
var startButton = document.getElementById('startGame');
startButton.addEventListener('click', startGame);

class Game {
  constructor(player1, player2, maxScore) {
    this.players = [player1,player2];
    this.maxScore = parseInt(maxScore);
    this.scores = [0,0];
    this.rollResults = [0,0];
    this.currentTurn = 0;
    this.activePlayer = player1;
  }
  // roll the dice, change the rollResults, assess the roll
  roll() {
    var dice1 = Math.floor(Math.random() * 6 + 1);
    var dice2 = Math.floor(Math.random() * 6 + 1);
    this.rollResults = [dice1,dice2];
    this.assessRoll();
  }
  // see if the roll has a one (which ends the turn) and if not, add to the current turn
  assessRoll() {
    if (this.rollResults.includes(1)) {
      this.turnSwitch();
    }
    else this.currentTurn += this.rollResults[0] + this.rollResults[1];
  }
  // end the turn, if selected. add currentTurn in
  turnEnd() {
    if (this.activePlayer == this.players[0]) {
      this.scores[0] += this.currentTurn;
    }
    if (this.activePlayer == this.players[1]) {
      this.scores[1] += this.currentTurn;
    }
    if (this.scores[0] >= this.maxScore || this.scores[1] >= this.maxScore) {
      this.gameOver();
    }
    else this.turnSwitch();
  }
  // switch the turn to the other player
  turnSwitch() {
    this.currentTurn = 0;
    if (this.activePlayer == this.players[0]) this.activePlayer = this.players[1];
    else this.activePlayer = this.players[0];
  }
  // used for getReport()
  getScore() {

  const  scoreboard=document.querySelector("#scoreboard");
  scoreboard.style.background='yellow';
    return this.scores[0] + '-' + this.scores[1];
  }
  // used for getReport()
  getWinner() {
    if (this.scores[0] > this.scores[1]) return this.players[0];
    else if (this.scores[0] < this.scores[1]) return this.players[1];
    else return 'No one';
  }
  // generate the report, call gameOver() in the event maxScore() is reached. might need a better conditional in the event > maxScore
  getReport() {
    var s = "";

    if (this.scores[0] >= this.maxScore || this.scores[1] >= this.maxScore) {
      s +=  "<p > The players are " + this.players[0] + " and " + this.players[1] + "<br/> The score is: "+ this.getScore() + '<br/>The winner is: ' + this.getWinner() + "<br/> Hit the button above to play again!</p>";
      s += "<p>" + this.activePlayer + "'s points for this round: " + this.currentTurn;
    }
    else {
      s += "<p> The players are " + this.players[0] + " and " + this.players[1] + "<br/> The score is: "+ this.getScore() + '<br/>' + this.getWinner() + " is winning right now." + '<br/>It is ' + this.activePlayer + "'s turn right now.</p>";
      s += "<p>" + this.activePlayer + "'s points for this round: " + this.currentTurn;
    }
    return s;
  }
  // get the picture srcs for the die
  getPics() {
    var die1src = "";
    var die2src = "";
    // use a switch to get the src for the buttons we need to display
    switch (this.rollResults[0]) {
      case 1:
        die1src = "images/dicePics/Die1.png";
        break;
      case 2:
        die1src = "images/dicePics/Die2.png";
       break;
      case 3:
        die1src = "images/dicePics/Die3.png";
        break;
      case 4:
        die1src = "images/dicePics/Die4.png";
        break;
      case 5:
        die1src = "images/dicePics/Die5.png";
        break;
      case 6:
        die1src = "images/dicePics/Die6.png";
    }
    switch (this.rollResults[1]) {
      case 1:
        die2src = "images/dicePics/Die1.png";
        break;
      case 2:
        die2src = "images/dicePics/Die2.png";
       break;
      case 3:
        die2src = "images/dicePics/Die3.png";
        break;
      case 4:
        die2src = "images/dicePics/Die4.png";
        break;
      case 5:
        die2src = "images/dicePics/Die5.png";
        break;
      case 6:
        die2src = "images/dicePics/Die6.png";
    }
    var diceSRC = [die1src, die2src];
    return diceSRC;
  }
  displayDice() {
    // get the src for the dice the roll corresponds to
    var diceSRC = this.getPics();
    // get the display element
    var displayElement = document.getElementById('dice');
    // create img elements, assign src value
    var dicePic1 = document.createElement('img');
    var dicePic2 = document.createElement('img');
    dicePic1.src = diceSRC[0];
    dicePic2.src = diceSRC[1];
    // reset dice, if there are any in there
    displayElement.innerHTML = "";
    // append the imgs to the div
    displayElement.appendChild(dicePic1);
    displayElement.appendChild(dicePic2);
  }
  // end the game, change displays
  gameOver() {
    var pregame = document.getElementById('pregame');
    var dicePics = document.getElementById('dice');
    var gameButtons = document.getElementById('gameButtons');
    var gameStats = document.getElementById('gameStats');

    gameStats.innerHTML = "";
    gameStats.innerHTML += game1.getReport();
    // hide the dice and the game buttons; the game has ended. show pregame buttons to start a new game.
    gameButtons.style.display = "none";
    dicePics.style.display = "none";
    pregame.style.display = 'block';

  }
}

// game object must be global variable


// function to start the game onclick
function startGame() {

  var player1 = document.getElementById('player1').value;
  var player2 = document.getElementById('player2').value;
  var maxScore = document.getElementById('maxScore').value;

  game1 = new Game(player1,player2, maxScore);


  var gameStats = document.getElementById('gameStats');
  var gameButtons = document.getElementById('gameButtons');
  var pregame = document.getElementById('pregame');
  var dicePics = document.getElementById('dice');

  gameStats.innerHTML = "";
  gameStats.innerHTML += game1.getReport();
  // start game, show buttons needed to play and the stats
  pregame.style.display = 'none';
  // reset dice pics
  dicePics.innerHTML = "";
  dicePics.style.display = 'block';
  gameButtons.style.display = 'block';
}

function rollDice() {
  game1.roll();
  gameStats.innerHTML = "";
  gameStats.innerHTML += game1.getReport();
  game1.displayDice();
}

function endButton() {
  game1.turnEnd();
  var gameStats = document.getElementById('gameStats');
  gameStats.innerHTML = "";
  gameStats.innerHTML += game1.getReport();
}
