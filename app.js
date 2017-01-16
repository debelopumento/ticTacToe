$(function(){
	var boardSize = 3;
	initGame(boardSize);
});

function restart(boardSize) {
	event.preventDefault();
	$(".ui-dialog").remove();
	$('.js-boardDiv').html();
	$('#dialog').toggleClass("hidden");
	XsTurn = true;
	initGame(boardSize);
}

function initGame(boardSize) {
	var board = {
		row: []
	}
	for (i=1; i <= boardSize; i++) {
		board.row[i] = [];
		for (j=1; j <= boardSize; j++) {
			var currentUnit = "unknown";
			board.row[i][j] = currentUnit;
		}
	}
	renderBoard(boardSize, board);
}

function renderBoard(boardSize, board){
	var deviceWidth = window.screen.width;
	var deviceHeight = window.screen.height;
	if (deviceWidth < deviceHeight) {
		var unitSize = (deviceWidth-30)/boardSize;
	}
		else {
			var unitSize = (deviceHeight-30)/boardSize;
			console.log("who am i ", unitSize);
		}
	var boardRowWidth = boardSize*unitSize;
	var boardHtml = '';
	for (i=1; i <= boardSize; i++) {
		//boardHtml = '';
		boardHtml += '<div class="boardRow" style="width: ' + boardRowWidth + 'px" data-row="' + i + '">';
		for (j=1; j <= boardSize; j++) {
			boardHtml += '<span class="unit empty js-unit" style="width: ' + unitSize + 'px; height: ' + unitSize + 'px"  data-column="' + j + '">' + '</span>';
		}
		boardHtml += '</div>';
	}
	$('.js-board').html(boardHtml);
	
	playGame(boardSize, board);
}


function playGame(boardSize, board) {
	var turn=1;
	var XsTurn = true;
	var gameFinished = false;
	$('.js-unit').click(function(event){
		console.log(this);
		var currentRow = $(this).closest('div').attr('data-row');
		var currentColumn = $(this).closest('span').attr('data-column');
		
		//check if game has finished
		if (gameFinished === false) {

			//check if this unit is empty
			if (board.row[currentRow][currentColumn]==="unknown") {
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
				if (gameOver===true) {
					gameFinished = true;
					alertFinish(XsTurn, boardSize);
				}
				//check column
				var gameOver = true;
				for (i=1; i <=boardSize; i++) {
					if (board.row[currentRow][currentColumn] != board.row[i][currentColumn]) {gameOver = false;}

				}
				if (gameOver===true) {
					gameFinished = true;
					alertFinish(XsTurn, boardSize);
				}
				//check diagonal
				if(boardSize===3) {
					if (board.row[1][1]===board.row[currentRow][currentColumn] && board.row[2][2]===board.row[currentRow][currentColumn] && board.row[3][3]===board.row[currentRow][currentColumn]) {alertFinish(XsTurn, boardSize); gameFinished = true;}
					if (board.row[1][3]===board.row[currentRow][currentColumn] && board.row[2][2]===board.row[currentRow][currentColumn] && board.row[3][1]===board.row[currentRow][currentColumn]) {alertFinish(XsTurn, boardSize); gameFinished = true;}
				}

				if (boardSize===4) {
					if (board.row[1][1]===board.row[currentRow][currentColumn] && board.row[2][2]===board.row[currentRow][currentColumn] && board.row[3][3]===board.row[currentRow][currentColumn] && board.row[4][4]===board.row[currentRow][currentColumn]) {alertFinish(XsTurn, boardSize); gameFinished = true;}
					if (board.row[1][4]===board.row[currentRow][currentColumn] && board.row[2][3]===board.row[currentRow][currentColumn] && board.row[3][2]===board.row[currentRow][currentColumn] && board.row[4][1]===board.row[currentRow][currentColumn]) {alertFinish(XsTurn, boardSize); gameFinished = true;}
				}
				if (boardSize===5) {
					if (board.row[1][1]===board.row[currentRow][currentColumn] && board.row[2][2]===board.row[currentRow][currentColumn] && board.row[3][3]===board.row[currentRow][currentColumn] && board.row[4][4]===board.row[currentRow][currentColumn] && board.row[5][5]===board.row[currentRow][currentColumn]) {alertFinish(XsTurn, boardSize); gameFinished = true;}
					if (board.row[1][5]===board.row[currentRow][currentColumn] && board.row[2][4]===board.row[currentRow][currentColumn] && board.row[3][3]===board.row[currentRow][currentColumn] && board.row[4][2]===board.row[currentRow][currentColumn] && board.row[5][1]===board.row[currentRow][currentColumn]) {alertFinish(XsTurn, boardSize); gameFinished = true;}
				}

				if (turn === boardSize * boardSize) {
					gameFinished = true;
					alertDraw(boardSize);
				}
				XsTurn = !XsTurn;
				turn = turn + 1;
			}
		}
		
	});	

	$('.js-newgame').click(function(){
		restart(boardSize);
	});

	$("#boardSize").change(function () {
           boardSize = Number($(this).find("option:selected").text());
           //document.getElementById("p2").style.background = "blue";
           restart(boardSize);
    });

}

function alertFinish(XsTurn, boardSize) {
	if (XsTurn===true) {
		var winner = "X";
	}
	else {var winner = "O"}
	var endalert = '';
	endalert += '<div id="dialog" title="Game Over">';
	endalert += '<p>' + winner + ' won!</p>';
	endalert += '<button class="js-newgame">New Game</button></div>'
	$(".message").html(endalert);
	$( "#dialog" ).dialog();
	$('.js-newgame').click(function(){
		restart(boardSize);
	});
	//restart(boardSize);
}	

function alertDraw(boardSize) {
	var endalert = '';
	endalert += '<div id="dialog" title="Game Over">';
	endalert += '<p>Draw!</p>';
	endalert += '<button class="js-newgame">New Game</button></div>'
	$(".message").html(endalert);
	$( "#dialog" ).dialog();
	$('.js-newgame').click(function(){
		restart(boardSize);
	});
	//restart(boardSize);
}