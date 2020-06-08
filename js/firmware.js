var smarti = require("Smartibot");
var counting = false;
var looking = false;
var count = 0;
var step = 2;

function go(drive){
if (drive == "F"){
 smarti.setLEDs([0,0,50],[0,0,50]);
 smarti.setMotor(3,0.7);
 smarti.setMotor(4,-0.7);
  step = 4;
 counting = true;
 }
 if (drive == "L"){
 smarti.setLEDs([50,0,50],[60,0,50]);
 smarti.setMotor(3,-0.6);
 smarti.setMotor(4,-0.6);
   step = 2;
 counting = true;

 
 }

  if (drive == "SL"){
 smarti.setLEDs([50,0,50],[60,0,50]);
  smarti.setMotor(3,-0.55);
 smarti.setMotor(4,-0.55);
   step = 1;
 counting = true;

 
 }
 if (drive == "R"){
 smarti.setLEDs([50,0,50],[50,0,50]);
 smarti.setMotor(3,0.6);
 smarti.setMotor(4,0.6);
   step = 2;
 counting = true;
 }
  if (drive == "SR"){
 smarti.setLEDs([50,0,50],[50,0,50]);
 smarti.setMotor(3,0.55);
 smarti.setMotor(4,0.55);
   step = 1;
 counting = true;
 }
 
 if (drive == "LU"){
 smarti.setMotor(2,-0.8);
  step = 1;
 counting = true;
 looking= true;
 }

   if (drive == "LD"){
 smarti.setMotor(2, 0.6);
  step = 1;
 counting = true;
 looking = true;
 }
  
  if (drive == "T"){
 smarti.setLEDs([50,0,50],[50,0,50]);
 smarti.setMotor(3,0.55);
 smarti.setMotor(4,0.55);
   step = 15;
 counting = true;
 }


 else if (drive == "B"){
 smarti.setLEDs([50,0,0],[50,0,0]);
 smarti.setMotor(3,-0.7);
 smarti.setMotor(4,0.7);
   step = 4;
 counting = true;
 }
 else if (drive == "S"){
 smarti.setLEDs([0,50,0],[0,50,0]);
 smarti.setMotor(3,0);
 smarti.setMotor(4,0);
 } 
}

setInterval(function() {
 if (counting == true){
 count = count + 1;
 }
 if (count > step){
   
 if(looking == true){
   smarti.setMotor(2,-0.3);
   step = 3;
   count = 0;
   looking = false;
 }
else{ 
 counting = false;
 count = 0;
 smarti.setMotor(2,0);
 smarti.setMotor(3,0);
 smarti.setMotor(4,0);
}
 }
}, 50);
