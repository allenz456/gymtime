var schedule = loadSchedule()["schedule"];
$(document).ready(function(){
  
  var classes = loadClasses()["classes"];
  displayType("MB");
  var classesCS = classes["MB"];
  document.getElementById("class-filter").innerHTML = '<option value="MB">All Classes</option>';
  document.getElementById("class-filter").innerHTML += '<option value="MB">My Classes</option>';

  for (var classCS in classesCS) {
      document.getElementById("class-filter").innerHTML += '<option>' + classesCS[classCS] + '</option>';
    }

  $('#CS').bind("click", function() {
    console.log("CS");
    displayType("CS");
    changeFilterClasses(classes["CS"]);
  });

  $('#MB').bind("click", function() {
    console.log("MB");
    displayType("MB");
    changeFilterClasses(classes["MB"]);
  });

  $("input.sign-up").change(function() {
    var className = $(this).attr("id");
    className = className.replace(/-/g, ' ');
    if (!$(this).prop('checked')) {
      bootbox.confirm("Cancelling sign-up for " + className, function(result) {

      });
    } else {
      bootbox.prompt("What is your netID?", function(result) {
                if (result === null) {
                    console.log("prompt cancelled")
                }
                else if (result.length != 6) {
                    bootbox.alert("Invalid netID, please try again.");
                } else {

                    $(this).prop( "checked", true );
                    bootbox.alert("Successfully signed up for " + className);
                }
      });
    }
    
  });

  recallSelectedClasses();
  rememberSelectedClasses();

});

function recallSelectedClasses() {
  $("input.sign-up").each(function() {
  var mycookie = $.cookie($(this).attr('id'));
  if (mycookie && mycookie == "true") {
      $(this).prop('checked', true);
      $(this).parent().addClass("active");
  }
  });
}

function rememberSelectedClasses() {
  $("input.sign-up").change(function() {
    console.log("clicked" + $(this).attr("id"));
  
    $.cookie($(this).attr("id"), $(this).prop('checked'), {
        path: '/',
        expires: 365
    });
  });
}

function changeFilterClasses(classes) {
  document.getElementById("class-filter").innerHTML = '<option value="CS">All Classes</option>';
  document.getElementById("class-filter").innerHTML += '<option value="CS">My Classes</option>';
    for (var filterClass in classes) {
      document.getElementById("class-filter").innerHTML += '<option>' + classes[filterClass] + '</option>';
    }
}

function filterClass() {
  var selected = document.getElementById("class-filter");
  selectedClass = selected.options[selected.selectedIndex].text;
  if (selectedClass == "All Classes") {
    selectedClass = selected.options[selected.selectedIndex].value;
    displayType(selectedClass);
  } 
  else if (selectedClass == "My Classes"){
    displayMyClasses();
  } else {
    displayClass(selectedClass);
  }
  console.log(selectedClass);

}

function displayMyClasses() {
  document.getElementById("classes").innerHTML = "";
  var numClassesTotal = 0;  
  for (var day in schedule) {
    var numClasses = 0;
    var HTML = "";
    var classInfo = schedule[day];
    HTML += "<h3>"+ day + "</h3><hr><div class='row'>"
          + "<div class='col-sm-2 col-sm-offset-10 col-xs-offset-8 text-center'><h6>Attending?</h6></div>"
          + "</div>"; 
    for (var info in classInfo) {
        var className = classInfo[info]["name"];
        var classTime = timeConverter(classInfo[info]["time"]);
        var mycookie = $.cookie(className+"-"+day+"-"+classTime);
      if (mycookie && mycookie == "true") {
        numClasses += 1;
        numClassesTotal += 1;

        HTML += "<div class='row'>"
            + "<div class='col-sm-10 col-xs-9'><h4>"+className+"</h4><p>"+classTime+"</p></div>"
            + "<div class='col-sm-2 text-center'><div class='btn-group' data-toggle='buttons'><label class='btn attending-btn btn-info'><input type='checkbox' class='sign-up' id='"+className+"-"+day+"-"+classTime+"'></label></div></div>"
            + "</div>"; 
      }
    }
    if (numClasses > 0) {
      document.getElementById("classes").innerHTML += HTML;
    }
  }
  if(numClassesTotal == 0) {
      document.getElementById("classes").innerHTML += "<div class='row text-center'><h4>You have not signed up for any classes</h4></div>";

  }
  recallSelectedClasses();
  rememberSelectedClasses();
}

function displayClass(selectedClass) {
  document.getElementById("classes").innerHTML = "";
  
  for (var day in schedule) {
    var numClasses = 0;
    var HTML = "";
    var classInfo = schedule[day];
    HTML += "<h3>"+ day + "</h3><hr><div class='row'>"
          + "<div class='col-sm-2 col-sm-offset-10 col-xs-offset-8 text-center'><h6>Attending?</h6></div>"
          + "</div>"; 
    for (var info in classInfo) {
      if (classInfo[info]["name"] == selectedClass) {
        numClasses += 1;
        var className = classInfo[info]["name"];
        var classTime = timeConverter(classInfo[info]["time"]);

       HTML += "<div class='row'>"
            + "<div class='col-sm-10 col-xs-9'><h4>"+className+"</h4><p>"+classTime+"</p></div>"
            + "<div class='col-sm-2 text-center'><div class='btn-group' data-toggle='buttons'><label class='btn attending-btn btn-info'><input type='checkbox' class='sign-up' id='"+className+"-"+day+"-"+classTime+"'></label></div></div>"
            + "</div>"; 
      }
    }
    if (numClasses > 0) {
      document.getElementById("classes").innerHTML += HTML;
    }
  }
  recallSelectedClasses();
  rememberSelectedClasses();
}

function displayType(type) {
  document.getElementById("classes").innerHTML = "";
  for (var day in schedule) {
    var classInfo = schedule[day];
    document.getElementById("classes").innerHTML += "<h3>"+ day + "</h3><hr><div class='row'>"
                                                  + "<div class='col-sm-2 col-sm-offset-10 col-xs-offset-8 text-center'><h6>Attending?</h6></div>"
                                                  + "</div>"; 
    for (var info in classInfo) {
      if (classInfo[info]["type"] == type) {
      var className = classInfo[info]["name"];
      var classTime = timeConverter(classInfo[info]["time"]);

     document.getElementById("classes").innerHTML += "<div class='row'>"
                                                  + "<div class='col-sm-10 col-xs-9'><h4>"+className+"</h4><p>"+classTime+"</p></div>"
                                                  + "<div class='col-sm-2 text-center'><div class='btn-group' data-toggle='buttons'><label class='btn attending-btn btn-info'><input type='checkbox' class='sign-up' id='"+className+"-"+day+"-"+classTime+"'></label></div></div>"
                                                  + "</div>"; 
      }
    }
  }
  recallSelectedClasses();
  rememberSelectedClasses();
}

function timeConverter(time){
  time = time.split(" - ");
  sTime = time[0];
  eTime = time[1];

  var newTime = "";
  // start time
  sTime = sTime.split(":");
  newTime += (sTime[0] % 12) || 12;
  newTime += ":" + sTime[1];
  if (sTime[0] < 12 ) { newTime += "AM" }
  else { newTime += "PM" }

  newTime += " - ";

  eTime = eTime.split(":");
  newTime += (eTime[0] % 12) || 12;
  newTime += ":" + eTime[1];
  if (eTime[0] < 12 ) { newTime += "AM" }
  else { newTime += "PM" }

  return newTime;
}


// Need better way to retrieve JSON
function loadSchedule() {

  var classes = jQuery.parseJSON('{"schedule": {"Monday": [{ "name": "Aqua Fitness", "type": "CS", "time": "08:30 - 09:30"},\
          { "name": "Bodypump", "type": "CS", "time": "12:00 - 12:30"},\
          { "name": "H.I.I.T", "type": "CS", "time": "12:35 - 13:00"},\
          { "name": "Cardio Blast", "type": "CS", "time": "16:15 - 16:45"},\
          { "name": "Core Conditioning", "type": "CS", "time": "16:50 - 17:20"},\
          { "name": "Zumba", "type": "CS", "time": "17:30 - 18:30"},\
          { "name": "WERQ", "type": "CS", "time": "18:45 - 19:45"},\
          { "name": "Hatha 1-2", "type": "MB", "time": "12:00 - 13:00"},\
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
          { "name": "Vinyasa", "type": "MB", "time": "12:00 - 13:00"},\
          { "name": "Yoga - All Levels", "type": "MB", "time": "17:30 - 18:30"},\
          { "name": "Athletic Pilates", "type": "MB", "time": "19:00 - 20:00"}],\
      "Wednesday":  [{ "name": "Aqua Fitness", "type": "CS", "time": "08:30 - 09:30"},\
          { "name": "Bodypump", "type": "CS", "time": "12:00 - 12:30"},\
          { "name": "Cycle Circuit", "type": "CS", "time": "16:15 - 16:45"},\
          { "name": "Cardio Blast", "type": "CS", "time": "17:30 - 18:30"},\
          { "name": "Core Conditioning", "type": "CS", "time": "18:05 - 18:35"},\
          { "name": "WERQ", "type": "CS", "time": "18:45 - 19:45"},\
          { "name": "Athletic Yoga", "type": "MB", "time": "7:00 - 8:00"},\
          { "name": "Yoga - All Levels", "type": "MB", "time": "12:00 - 13:00"},\
          { "name": "Vinyasa", "type": "MB", "time": "17:30 - 18:30"},\
          { "name": "Yoga - All Levels", "type": "MB", "time": "19:00 - 20:00"}],\
      "Thursday":  [{ "name": "Cycle Express", "type": "CS", "time": "06:10 - 06:50"},\
          { "name": "Circuit Conditioning", "type": "CS", "time": "07:00 - 08:00"},\
          { "name": "Cycle Express", "type": "CS", "time": "12:10 - 12:50"},\
          { "name": "Cardio Combat", "type": "CS", "time": "16:15 - 16:45"},\
          { "name": "Bodypump", "type": "CS", "time": "17:30 - 18:30"},\
          { "name": "Zumba", "type": "CS", "time": "18:45 - 19:45"},\
          { "name": "Athletic Yoga", "type": "MB", "time": "7:00 - 8:00"},\
          { "name": "Vinyasa", "type": "MB", "time": "12:00 - 13:00"},\
          { "name": "Yoga - All Levels", "type": "MB", "time": "17:30 - 18:30"},\
          { "name": "Pilates", "type": "MB", "time": "19:00 - 20:00"}],\
      "Friday":  [{ "name": "Aqua Fitness", "type": "CS", "time": "08:30 - 09:30"},\
          { "name": "H.I.I.T", "type": "CS", "time": "12:00 - 12:30"},\
          { "name": "Core Conditioning", "type": "CS", "time": "12:35 - 13:00"},\
          { "name": "Cycle Circuit", "type": "CS", "time": "17:30 - 18:30"},\
          { "name": "Hatha 1-2", "type": "MB", "time": "12:00 - 13:00"},\
          { "name": "Hatha 1-2", "type": "MB", "time": "17:30 - 18:30"}],\
      "Saturday":  [{ "name": "Bodypump", "type": "CS", "time": "09:45 - 10:45"},\
          { "name": "Cycle Circuit", "type": "CS", "time": "12:00 - 13:00"},\
          { "name": "Yoga - All Levels", "type": "MB", "time": "11:00 - 12:00"}],\
      "Sunday":  [{ "name": "Cycle Challenge", "type": "CS", "time": "12:00 - 13:00"},\
          { "name": "Zumba", "type": "CS", "time": "15:00 - 16:00"},\
          { "name": "Yoga - All Levels", "type": "MB", "time": "12:00 - 13:00"}]}}');

  return classes
}

function loadClasses() {
  var classes = jQuery.parseJSON('{"classes": {"MB": ["Athletic Pilates",\
          "Athletic Yoga",\
          "Hatha 1-2",\
          "Hatha 2-3",\
          "Pilates",\
          "Vinyasa",\
          "Yoga - All Levels"],\
      "CS": ["Aqua Fitness",\
          "Bodypump",\
          "Cardio Blast",\
          "Cardio Combat",\
          "Circuit Conditioning",\
          "Core Conditioning",\
          "Cycle Challenge",\
          "Cycle Circuit",\
          "Cycle Express",\
          "H.I.I.T",\
          "WERQ",\
          "Zumba"]}}');

  return classes
}