var smarti = require("Smartibot");
var counting = false;
var lookUp = false;
var lookDw = false;
var lookSt = false;
var count = 0;
var step = 2;

function go(drive){
if (drive == "B"){
 smarti.setLEDs([0,0,50],[0,0,50]);
 smarti.setMotor(1,0.7);
 smarti.setMotor(2,-0.7);
  step = 8;
 counting = true;
 }
 if (drive == "R"){
 smarti.setLEDs([50,0,50],[60,0,50]);
 smarti.setMotor(1,-0.6);
 smarti.setMotor(2,-0.6);
   step = 4;
 counting = true;

 
 }

  if (drive == "SR"){
 smarti.setLEDs([50,0,50],[60,0,50]);
  smarti.setMotor(1,-0.55);
 smarti.setMotor(24,-0.55);
   step = 2;
 counting = true;

 
 }
 if (drive == "L"){
 smarti.setLEDs([50,0,50],[50,0,50]);
 smarti.setMotor(1,0.6);
 smarti.setMotor(2,0.6);
   step = 4;
 counting = true;
 }
  if (drive == "SL"){
 smarti.setLEDs([50,0,50],[50,0,50]);
 smarti.setMotor(1,0.55);
 smarti.setMotor(2,0.55);
   step = 2;
 counting = true;
 }
 
 if (drive == "LU"){
 smarti.setMotor(4,0.9);
  step = 2;
 counting = true;
 lookUp= true;
 }

   if (drive == "LD"){
 smarti.setMotor(4,-0.80);
  step = 4;
 counting = true;
 lookDw = true;
 }
  
  if (drive == "T"){
 smarti.setLEDs([50,0,50],[50,0,50]);
 smarti.setMotor(1,0.55);
 smarti.setMotor(2,0.55);
   step = 30;
 counting = true;
 }


 else if (drive == "F"){
 smarti.setLEDs([50,0,0],[50,0,0]);
 smarti.setMotor(1,-0.7);
 smarti.setMotor(2,0.7);
   step = 8;
 counting = true;
 }
 else if (drive == "S"){
 smarti.setLEDs([0,50,0],[0,50,0]);
 smarti.setMotor(1,0);
 smarti.setMotor(2,0);
 } 
}

setInterval(function() {
 if (counting == true){
 count = count + 1;
 }
 if (count > step){
   
 if(lookUp == true){
   smarti.setMotor(4,0.5);
   step = 1;
   count = 0;
   lookUp = false;
   lookSt = true;
 }
  else if(lookDw == true){
   smarti.setMotor(4,0.5);
   step = 1;
   count = 0;
   lookDw = false;
   lookSt = true;
 }
   else if(lookSt == true){
   smarti.setMotor(4,0.30);
   step = 15;
   count = 0;
   lookSt = false;
 }
else{ 
 counting = false;
 count = 0;
 smarti.setMotor(1,0);
 smarti.setMotor(2,0);
 smarti.setMotor(4,0);
}
 }
}, 25);
