var boardSize = 3;
var XsTurn = true;
var board = {
	row: []
}

$(function(){
	initGame();
});



function restart() {
	event.preventDefault();
	console.log(1);
	$('.js-boardDiv').html();
	initGame();
}


function initGame() {
	for (i=1; i <= boardSize; i++) {
		board.row[i] = [];
		for (j=1; j <= boardSize; j++) {
			var currentUnit = "unknown";
			board.row[i][j] = currentUnit;
		}
	}
	renderBoard();
}

function renderBoard(){
	var boardHtml = '';
	for (i=1; i <= boardSize; i++) {
		boardHtml += '<div class="boardRow" data-row="' + i + '">';
		for (j=1; j <= boardSize; j++) {
			boardHtml += '<span class="unit empty js-unit" data-column="' + j + '">' + '</span>';
		}
		boardHtml += '</div>';
	}
	$('.js-board').html(boardHtml);
	playGame();

}


function playGame() {
	$('.js-unit').click(function(event){
		console.log(this);
		var coordinate = $(this).text();
		//var currentRow = coordinate[0];
		var currentRow = $(this).closest('div').attr('data-row');
		var currentColumn = $(this).closest('span').attr('data-column');
		if (XsTurn===true) {
			$(event.currentTarget).toggleClass('X');
			board.row[currentRow][currentColumn] = "X";
		}
		else {
			$(event.currentTarget).toggleClass('O');
			board.row[currentRow][currentColumn] = "O";
		}
		console.log("currentRow", currentRow, "currentColumn", currentColumn);
		
		//check if game is finished
		var gameOver = true;
			//check row
			for (j=1; j <=boardSize; j++) {
				if (board.row[currentRow][currentColumn] != board.row[currentRow][j]) {gameOver = false;}
			}
			if (gameOver===true) {alertFinish();}
			//check column
			var gameOver = true;
			for (i=1; i <=boardSize; i++) {
				if (board.row[currentRow][currentColumn] != board.row[i][currentColumn]) {gameOver = false;}
			}
			if (gameOver===true) {alertFinish();}
			//check diagonal
			if (board.row[1][1]===board.row[currentRow][currentColumn] && board.row[2][2]===board.row[currentRow][currentColumn] && board.row[3][3]===board.row[currentRow][currentColumn]) {alertFinish();}
			if (board.row[1][3]===board.row[currentRow][currentColumn] && board.row[2][2]===board.row[currentRow][currentColumn] && board.row[3][1]===board.row[currentRow][currentColumn]) {alertFinish();}
			//
		XsTurn = !XsTurn;
	});	

	$('.js-newgame').click(function(){
		restart();
	});
}

function alertFinish(){
	alert("Game Over");
}	
	