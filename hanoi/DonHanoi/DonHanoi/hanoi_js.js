var processing = "";
var diskNum;
var total_count = 0;
var base_width = 15;
var base_color = 10
function myLoad(){
  diskNum = prompt("Please enter Number of Disk", "1");
  if (diskNum != null) {
    // moveNDisks( parseInt(diskNum), "A", "B", "C" );
    // drawCSS(parseInt(diskNum));
    drawHanoi(parseInt(diskNum));
  }
}
// movement guid
// function moveNDisks( N,  fromPeg, toPeg, extraPeg ) {
//    // if there's only one disk to move, then just print the move required
//    if ( N==1 ){
//      processing = processing + "Move disk from Peg " + fromPeg + " to " + toPeg + "\n";
//      total_count += 1;
//      document.getElementById("progress").innerHTML = processing;
//    }
//    else {
//        // otherwise, then call the function to move N-1 disks out of the way...
//        moveNDisks( N-1, fromPeg, extraPeg, toPeg );
//        // then move 1 disk to the destination
//        moveNDisks( 1, fromPeg, toPeg, extraPeg );
//        // and the N-1 that were out of the way should be brought back
//        moveNDisks( N-1, extraPeg, toPeg, fromPeg );
//    }
// }
// end
// function drawCSS(N){

// }
function drawHanoi(N){
	var holding = [],
		moves,
		disksNum = N,
		minMoves = total_count,
		canves = document.querySelector('#canves'),
		tower = canves.getElementsByClassName('tower'),
		tower_1 = document.getElementById('tower-1'),
		tower_2 = document.getElementById('tower-2'),
		tower_3 = document.getElementById('tower-3'),
		movesCount = document.getElementById('moves-num');



	function initGame(tower){
		tower.innerHTML = "";
		moves = 0;
		movesCount.innerHTML = 0;
		holding = [];
		for(var i = 1; i <= disksNum; i++){
			let li = document.createElement('li');
			li.setAttribute ("class", "disk disk-" + i);
			li.setAttribute('value', i);
			li.style.width = (base_width + 15 * (i - 1)) + "px";
			li.style.border = "1px solid #0000FF";
			tower.prepend(
				li
			);
		}
	}
// count move number
	function countMove(){
		moves++;
		movesCount.innerHTML = moves;

		if (moves > minMoves - 1) {
			if (tower[1].childElementCount == disksNum || tower[2].childElementCount == disksNum) {
				alert("you were win");
				location.reload();
			}
		}
	}
// end
//start move disk
	function tower_f(tower){
		var disks = tower.childNodes;
		var topDisk = tower.lastElementChild;
		var	topDiskValue;

			if (topDisk != null) {
				topDiskValue = topDisk.getAttribute('value');
			}else{
				topDiskValue = null
			}

		var	holdingDisk = canves.getElementsByClassName('hold');

		if (holdingDisk.length !== 0) {

			if (topDiskValue === holding[0]) {
				holdingDisk[0].classList.remove("hold");
			}else if(topDiskValue === null || topDiskValue > holding[0]){

				tower.appendChild(holdingDisk[0]);
				holdingDisk[0].classList.remove("hold");

				countMove();
			}
		}else if(topDiskValue === null && holdingDisk.length == 0){
			alert("This tower is empty");
		}
		else{
			topDisk.classList.add("hold");
			holding[0] = topDiskValue;
		}
	}
// end move disk
//tower init
	initGame(tower[0]);
// add event handler to tower
	tower_1.addEventListener("click", function(event){
		var cell = event.currentTarget;
		tower_f(cell);
	});
	tower_2.addEventListener("click", function(event){
		var cell = event.currentTarget;
		tower_f(cell);
	});
	tower_3.addEventListener("click", function(event){
		var cell = event.currentTarget;
		tower_f(cell);
	});
//  end
}



function restart(){
  	alert("Restart game");
	location.reload();
};