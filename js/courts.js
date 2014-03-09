$(document).ready(function() {
	// Stuff
	$('.court').on("click", function() {
		courtNum = this.id
		console.log("you clicked: " + this.id)
		
		writeCalendar(courtNum)
	});

	$('div.calFix.slot').on("click", function() {
		alert('hi')
	});

});

var calendarTimes = [
{"timeSlot": "8:00am - 9:00am"},
{"timeSlot": "9:00am - 10:00am"},
{"timeSlot": "10:00am - 11:00am"},
{"timeSlot": "11:00am - 12:00pm"},
{"timeSlot": "12:00pm - 1:00pm"},
{"timeSlot": "1:00pm - 2:00pm"},
{"timeSlot": "2:00pm - 3:00pm"},
{"timeSlot": "3:00pm - 4:00pm"},
{"timeSlot": "4:00pm - 5:00pm"},
{"timeSlot": "5:00pm - 6:00pm"},
{"timeSlot": "6:00pm - 7:00pm"},
{"timeSlot": "7:00pm - 8:00pm"},
{"timeSlot": "8:00pm - 9:00pm"},
{"timeSlot": "9:00pm - 10:00pm"}];

var table = "<div class='col-sm-8 col-sm-offset-2'>"
			+ "<div class='overflow'>"
			+ "<table class='calendar-wrapper panel-info'>"
			+ "<thead class='panel-heading'></thead>"
			+ "<tbody>"
			+ "<tr class='headers'><td class='headcol'>&nbsp;</td></tr>"
			+ "</tbody>"
			+ "</table>"
			+ "</div>"
			+ "</div>"

function randomStatus() {
	var rand = Math.random() < 0.5;

	if (rand) {
		return "free"
	} else {
		return "taken"
	}
}

function writeCalendar(courtNum) {
	$('p#desc').text("Reserve a court")

	$('.content-wrapper').html(table)
	
	// Write headers
	for (var i = 0; i < calendarTimes.length; i++) {
		class_name = "tr.headers"
		time = calendarTimes[i].timeSlot;
		
		$(class_name).append('<td><div class="calFix">' + time + '</div></td>')
	}

	// Write content
	var courtNums = 6
	for (var i = 1; i <= courtNums; i++) {
		
		class_name = ".court-" + i.toString()
		time = calendarTimes[i].timeSlot;

		$(".calendar-wrapper").append('<tr class="calRow court-' + i.toString() + '">');
		$(class_name).append('<td class="headcol"><p>' + i.toString() + '</p></td>')

		for (var j = 0; j < calendarTimes.length; j++) {

			status = randomStatus()

			$(class_name).append('<td class="calEntry ' + status + '" id="' + i.toString() + '"><div class="calFix slot">' + "&nbsp;" + '</div></td>')
		}

		$(class_name).append('</tr>')

	}
}
