//js for bot side video publishing
var audioEnabled = "";
var audioToken = "";


function connect(){
   //use provided bot name, key and owner to form a POST request to Altrubots audion/visual broker.
   //the response will allow an audio/video session to form
   //once the video connection is forming connect to altrubots session engine via wss and authenticate.
   //Upon authentication the bot will now be available to play at https://altrubots.com/play.php
   var botNameVal = document.getElementById("botName").value;
   var ownerNameVal = document.getElementById("ownerName").value;
   var botKeyVal = document.getElementById("botKey").value;
   //
   var xhr = new XMLHttpRequest();
   var url = "https://lveysei1u3.execute-api.us-east-2.amazonaws.com/prod/createaudiovideosession";
   xhr.open("POST", url, true);
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.onreadystatechange = function () {
       if (xhr.readyState === 4 && xhr.status === 200) {
           var json = JSON.parse(xhr.responseText);

           if(json.Success ==  "True"){
             //parse response
             apiKey = json.apiKey;
             sessionId = json.session_id;
             token = json.publisherToken;
             audioToken = json.botAudioSubToken;
             initializeSession();
             //Websockets are the standard comunication vector used by Altrubots for bot-server interactions
             //the below connects to altrubots, authenticates and recieves a users message who goes to https://altrubots.com/play.php
             connSocket = new WebSocket("wss://altrubots.com:8080/MultibotMavenProject/botConnEndpoint");
             msgString = botNameVal + "," + botKeyVal + ",";
             connSocket.onopen = function(message){ csOpen(message);};
             connSocket.onmessage = function(message){ csGetMessage(message);};
             connSocket.onclose = function(message){ csClose(message);};
             connSocket.onerror = function(message){ csError(message);};
          }else{
             console.log("Error");
          }

       }
   };
   var data = JSON.stringify({"botName": botNameVal, "owner": ownerNameVal, "botKey": botKeyVal });
   xhr.send(data);
}

//Websocket Conn Methods
function csOpen(message){
   initmsg = document.getElementById("botName").value + "," + document.getElementById("botKey").value + "," +  document.getElementById("ownerName").value;
   console.log(initmsg);
   connSocket.send(initmsg);
}

///If you want to flip a message to the server/user, call this!
function csSendMessage(msg){
   newMsg = msgString + msg;
   connSocket.send(newMsg);
}

function csGetMessage(message){
    console.log("conn recvd: " + message.data);
    //console.log(messageCount);
   if(message.data == "Hrt"){
      csSendMessage("Hrt" + ","+  document.getElementById("ownerName").value);
   }else if(message.data == "-"){
      console.log("just a nothing");
   }else{
      console.log("Its a real user command! do something with it here.");
      if(message.data == "!"){
         console.log("Execute Stop");
      }else if(message.data == "F"){
          Puck.write('go("F");\n');
         console.log("Forward Increment");
      }else if(message.data == "B"){
        Puck.write('go("B");\n');
         console.log("Reverse Inrement");
      }else if(message.data == "R"){
        Puck.write('go("R");\n');
         console.log("Right Increment");
      }else if(message.data == "L"){
        Puck.write('go("L");\n');
         console.log("Left Increment");
      }else if(message.data == "O"){
	Puck.write('go("LD");\n');
         console.log("Boost");
      }
      }else if(message.data == "U"){
	Puck.write('go("LU");\n');
         console.log("Up");
      }
   }
}

function csClose(message){
console.log("Conn terminated");
}


//Handling all of our errors here by alerting them, hopefully not used much...
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}


//Preload Bot Configs
function autopop(){
   document.getElementById("botName").value = "SmartiBotTest";
   document.getElementById("ownerName").value = "Ross";
   document.getElementById("botKey").value = "ywpjqFv1RO0Urbdes15IxfaIdLV1cEFIsQp30YS5v-VeY_v2o2DCSfRgCihT3kSDqLONXtWh_QwOWN6wIXBvSdPvcH-CHkcWGBSccgiVAkwWQimpcjStcRnHcz_o3nQ0jCV1VrrhLPIHZ2h1pkapjacaCkGYgFJsADhZhry4DMtflMU-sqOJ6kWzbzD7oHiUaE8fSwahuRd04bLPbO8zjQDeSGJhu55zt95e2OmoxmRvasQYQsIxUVFABqyRlIXQ_RipHHuOXLbJrKh7NUKTzLhcIJ9tlRQFPwQn01_SH1LJ9ZO0YzchOKYpej4Pqf13R82IVK5DLSdYHnbyu_pgsA";
}

/////Video Setup
function initializeSession() {
  console.log("init vid session");
  arr = apiKey.split(',');
  unsaltedApiKey = arr.pop(); // .pop() removes and returns the last item of the array
 var session = OT.initSession(unsaltedApiKey, sessionId);

  // Subscribe to a newly created stream when a new user joins
  //TODO: use audio enabled a conditional to open subscriptions
  session.on('streamCreated', function(event) {
	  session.subscribe(event.stream, 'subscriber', {
	    insertMode: 'append',
	    width: '100%',
	    height: '100%'
	  }, handleError);
	});

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '300'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      //wu wuh wuhhhhhh
     handleError(error);
    } else {
      session.publish(publisher, handleError);

    }
  });
}
