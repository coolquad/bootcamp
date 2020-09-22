var processing = "";
var diskNum;
function myLoad(){
  diskNum = prompt("Please enter Number of Disk", "1");
  if (diskNum != null) {
    moveNDisks( parseInt(diskNum), "A", "B", "C" );
  }
}

function moveNDisks( N,  fromPeg, toPeg, extraPeg ) {
   // if there's only one disk to move, then just print the move required
   if ( N==1 ){
           // document.write( "Move disk from Peg " + fromPeg + " to " + toPeg + "<br>" );
     processing = processing + "Move disk from Peg " + fromPeg + " to " + toPeg + "<br>";
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