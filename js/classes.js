$(document).ready(function(){

  var schedule = loadAllClasses()["schedule"];
  displayMB(schedule);

  $('#CS').bind("click", function() {
    console.log("CS");
    displayCS(schedule);
  });

  $('#MB').bind("click", function() {
    console.log("MB");
    displayMB(schedule);
  });

});

function displayMB(schedule) {
  document.getElementById("classes").innerHTML = "";
  for (var day in schedule) {
    var classInfo = schedule[day];
    document.getElementById("classes").innerHTML += "<h3>"+ day + "</h3><hr><div class='row'>"
                                                  + "<div class='col-sm-2 col-sm-offset-10 text-center'><h6>Attending?</h6></div>"
                                                  + "</div>"; 
    for (var info in classInfo) {
      if (classInfo[info]["type"] == "MB") {
      var className = classInfo[info]["name"];
      var classTime = classInfo[info]["time"];

     document.getElementById("classes").innerHTML += "<div class='row'>"
                                                  + "<div class='col-sm-10'><h4>"+className+"</h4><p>"+classTime+"</p></div>"
                                                  + "<div class='col-sm-2 text-center'><div class='btn-group' data-toggle='buttons'><label class='btn attending-btn btn-info'><input type='checkbox'></label></div></div>"
                                                  + "</div>"; 
      }
    }
  }
}

function displayCS(schedule) {
  document.getElementById("classes").innerHTML = "";
  for (var day in schedule) {
    var classInfo = schedule[day];
    document.getElementById("classes").innerHTML += "<h3>"+ day + "</h3><hr><div class='row'>"
                                                  + "<div class='col-sm-2 col-sm-offset-10 text-center'><h6>Attending?</h6></div>"
                                                  + "</div>"; 
    for (var info in classInfo) {
      if (classInfo[info]["type"] == "CS") {
      var className = classInfo[info]["name"];
      var classTime = classInfo[info]["time"];

     document.getElementById("classes").innerHTML += "<div class='row'>"
                                                  + "<div class='col-sm-10'><h4>"+className+"</h4><p>"+classTime+"</p></div>"
                                                  + "<div class='col-sm-2 text-center'><div class='btn-group' data-toggle='buttons'><label class='btn attending-btn btn-info'><input type='checkbox'></label></div></div>"
                                                  + "</div>"; 
      }
    }
  }
}

function displayBoth(schedule) {
  for (var day in schedule) {
    var classInfo = schedule[day];
    document.getElementById("classes").innerHTML = "<h3>"+ day + "</h3><hr><div class='row'>"
                                                  + "<div class='col-sm-2 col-sm-offset-10 text-center'><h6>Attending?</h6></div>"
                                                  + "</div>"; 
    for (var info in classInfo) {
      if (classInfo[info]["type"] == "MB" || classInfo[info]["type"] == "CS") {
      var className = classInfo[info]["name"];
      var classTime = classInfo[info]["time"];

     document.getElementById("classes").innerHTML += "<div class='row'>"
                                                  + "<div class='col-sm-10'><h4>"+className+"</h4><p>"+classTime+"</p></div>"
                                                  + "<div class='col-sm-2 text-center'><div class='btn-group' data-toggle='buttons'><label class='btn attending-btn btn-info'><input type='checkbox'></label></div></div>"
                                                  + "</div>"; 
      }
    }
  }
}
// Need better way to retrieve JSON
function loadAllClasses() {

  var classes = jQuery.parseJSON('{"schedule": {"Monday": [{ "name": "Aqua Fitness", "type": "CS", "time": "08:30 - 09:30"},\
          { "name": "Bodypump", "type": "CS", "time": "12:00 - 12:30"},\
          { "name": "H.I.I.T", "type": "CS", "time": "12:35 - 13:00"},\
          { "name": "Cardio Blast", "type": "CS", "time": "16:15 - 16:45"},\
          { "name": "Core Conditioning", "type": "CS", "time": "16:50 - 17:20"},\
          { "name": "Zumba", "type": "CS", "time": "17:30 - 18:30"},\
          { "name": "WERQ", "type": "CS", "time": "18:45 - 19:45"},\
          { "name": "Hatha 1-2", "type": "MB", "time": "12:00 - 1:00"},\
          { "name": "Pilates", "type": "MB", "time": "17:30 - 18:30"},\
          { "name": "Yoga - All Levels", "type": "MB", "time": "19:00 - 20:00"}],\
      "Tuesday":  [{ "name": "Cycle Express", "type": "CS", "time": "06:10 - 06:50"},\
          { "name": "Circuit Conditioning", "type": "CS", "time": "07:00 - 08:00"},\
          { "name": "Cycle Express", "type": "CS", "time": "12:10 - 12:50"},\
          { "name": "H.I.I.T", "type": "CS", "time": "16:15 - 16:45"},\
          { "name": "Core Conditioning", "type": "CS", "time": "16:50 - 17:20"},\
          { "name": "Bodypump", "type": "CS", "time": "17:30 - 18:30"},\
          { "name": "Cardio Combat", "type": "CS", "time": "18:45 - 19:45"},\
          { "name": "Athletic Yoga", "type": "MB", "time": "7:00 - 8:00"},\
          { "name": "Vinyasa", "type": "MB", "time": "12:00 - 1:00"},\
          { "name": "Yoga - All Levels", "type": "MB", "time": "17:30 - 18:30"},\
          { "name": "Athletic Pilates", "type": "MB", "time": "19:00 - 20:00"}]}}');

  console.log(classes)
  return classes
}
// Load Mind/Body Classes
// Load Cardio/Strength Classes
// Load selected classes 