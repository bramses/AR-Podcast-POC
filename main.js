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


function calculateActiveTable (showNote, currentTime) {
  return showNote.timeActive[0] < currentTime && showNote.timeActive[1] > currentTime
}

let timeElapsed = 0

function startTimer (audioLength) {
  setInterval(() => {
    if (timeElapsed < audioLength) timeElapsed++
  },1000)
}

/*
TODO: render an empty table
TODO: try to stagger objects showing up in table
*/
function renderTable (data) {
  document.getElementById("wrapper").innerHTML = ""
  console.log(data)
  new gridjs.Grid({
    columns: ["Name", "Link"],
    data: data
  }).render(document.getElementById("wrapper"))
}

function renderTableData (data) {
  const newTable = []
  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    // console.log(calculateActiveTable(row, timeElapsed))
    if (calculateActiveTable(row, timeElapsed)) {
      newTable.push([row.objName, row.objLink])
    }
  }

  return newTable
}

class ShowNotes {
  
  constructor (objName, objLink, timeActive) {
    this.objName = objName
    this.objLink = objLink
    this.timeActive = timeActive
  }

}

class AudioMetadata {
  constructor (audioName, audio, audioLength) {
    this.audioName = audioName
    this.audio = audio
    this.audioLength = audioLength
  }
}


function main () {
    setUpSlider()
    const showNotes = new ShowNotes("elephant", "/assets/models/Elephant.usdz", [0, 10])
    const audio = new AudioMetadata("Naval On Truth", "/assets/audio/Naval-Ep67.mp3", 124)
    startTimer(audio.audioLength)
    
    const data = [showNotes]
    setInterval(() => renderTable(renderTableData(data)), 1000)

}

// new gridjs.Grid({
//   columns: ["Name", "Email", "Phone Number"],
//   data: [
//     ["John", "john@example.com", "(353) 01 222 3333"],
//     ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
//     ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
//     ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
//     ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
//   ]
// }).render(document.getElementById("wrapper"));

window.addEventListener("load", main)


