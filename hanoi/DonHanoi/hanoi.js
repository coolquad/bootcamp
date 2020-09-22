var processing = "";
var diskNum;
var total_count = 0;
function myLoad(){
  diskNum = prompt("Please enter Number of Disk", "1");
  if (diskNum != null) {
    moveNDisks( parseInt(diskNum), "A", "B", "C" );
    drawHanoi(parseInt(diskNum));
  }
}

function moveNDisks( N,  fromPeg, toPeg, extraPeg ) {
   // if there's only one disk to move, then just print the move required
   if ( N==1 ){
     processing = processing + "Move disk from Peg " + fromPeg + " to " + toPeg + "<br>";
     total_count += 1;
     document.getElementById("progress").innerHTML = processing;
   }
   else {
       // otherwise, then call the function to move N-1 disks out of the way...
       moveNDisks( N-1, fromPeg, extraPeg, toPeg );
       // then move 1 disk to the destination
       moveNDisks( 1, fromPeg, toPeg, extraPeg );
       // and the N-1 that were out of the way should be brought back
       moveNDisks( N-1, extraPeg, toPeg, fromPeg );
   }
}

function drawHanoi(N){
	var holding = [],
		moves,
		disksNum = N,
		minMoves = total_count,
		$canves = $("#canves"),
		$restart = $canves.find(".restart"),
		$tower = $canves.find(".tower"),
		$scorePanel = $canves.find("#score-panel"),
		$movesCount = $scorePanel.find("#moves-num");
		// $ratingStars = $scorePanel.find("i"),
		// rating = 3;

	// Set Rating and final Score
	// function setRating(moves) {
	// 	if (moves === total_count) {
	// 		$ratingStars.eq(2).removeClass("fa-star").addClass("fa-star-o");
	// 		rating = 2;
	// 	} else if (moves >= 128 && moves <= 228) {
	// 		$ratingStars.eq(1).removeClass("fa-star").addClass("fa-star-o");
	// 		rating = 1;
	// 	} else if (moves >= 229) {
	// 		$ratingStars.eq(0).removeClass("fa-star").addClass("fa-star-o");
	// 		rating = 0;
	// 	}
	// 	return { score: rating };
	// }

	// Init Game
	function initGame(tower) {
		$tower.html("");
		moves = 0;
		$movesCount.html(0);
		holding = [];
		for (var i = 1; i <= disksNum; i++) {
			tower.prepend(
				$('<li class="disk disk-' + i + '" data-value="' + i + '"></li>')
			);
		}
		// $ratingStars.each(function () {
		// 	$(this).removeClass("fa-star-o").addClass("fa-star");
		// });
	}

	// Game Logic
	function countMove() {
		moves++;
		$movesCount.html(moves);

		console.log(moves + " : ");

		if (moves > minMoves - 1) {
			if (
				$tower.eq(1).children().length === disksNum ||
				$tower.eq(2).children().length === disksNum
			) {
				alert("you were win");
				initGame($tower.eq(0));
			}
		}

		// setRating(moves);
	}

	function tower(tower) {
		var $disks = tower.children(),
			$topDisk = tower.find(":last-child"),
			topDiskValue = $topDisk.data("value"),
			$holdingDisk = $canves.find(".hold");

			console.log(topDiskValue + " : " +$holdingDisk.length);

		if ($holdingDisk.length !== 0) {
			if (topDiskValue === holding[0]) {
				$holdingDisk.removeClass("hold");
			} else if (topDiskValue === undefined || topDiskValue > holding[0]) {
				$holdingDisk.remove();
				tower.append(
					$(
						'<li class="disk disk-' +
							holding[0] +
							'" data-value="' +
							holding[0] +
							'"></li>'
					)
				);
				countMove();
			}
		} else if ($topDisk.length !== 0) {
			$topDisk.addClass("hold");
			holding[0] = topDiskValue;
		}


	}

	initGame($tower.eq(0));

	// Event Handlers
	$canves.on("click", ".tower", function () {
		var $this = $(this);
		tower($this);
	});

	$restart.on("click", function () {
		alert("Restart game");
		location.reload();
	});
}