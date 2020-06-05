var notified = true

function setUpSlider () {
    var slider = document.getElementById("myRange");
    var sliderVal = 0;
    
    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
      console.log(this.value)
    } 
}

function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Hi there!");
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
    }
  
    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
}

function main () {
    setUpSlider()
}

window.addEventListener("load", main)


function calculateActiveTable (showNote, currentTime) {
  return showNote.timeActive[0] < currentTime && showNote.timeActive[1] > currentTime
}

class ShowNotes {
  
  constructor (objName, objLink, timeActive) {

  }

}

class AudioMetadata {
  constructor (audioName, audio) {
    
  }
}