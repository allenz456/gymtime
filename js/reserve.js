$(document).ready(function() {
	var courtNum = GetQueryStringParams('court');
	
	if ((courtNum > 6) || (courtNum < 1))
		courtNum = undefined;

	$( "tr.court-" + courtNum + " td.headcol p" ).addClass("highlight");

    $('td.calEntry').on("click", function() {
        var classes = this.className.split(' ');
        var idArray = this.id.split('_');
        var id = idArray[0]
        var timeIndex = idArray[1]

        if (classes.indexOf("free") >= 0) {

            title = "<h3>Successfully reserved court.</h3>"
                        + "<h5>Details"
                        + "<br/>Court number: " + id
                        + "<br/>Timeslot: " + times[timeIndex] + "</h5>"

            // bootbox.alert("Successfully reserved court.");
            bootbox.alert(title);
            $(this).removeClass("free");
            $(this).addClass("userReserved");
            $(this).append("<p class='reservedText'>Confirmed</p>")
            
        } else {
            bootbox.alert("Court is already reserved :(");
        }
    });
});



var times = ["8:00am - 9:00am",
            "9:00am - 10:00am",
            "10:00am - 11:00am",
            "11:00am - 12:00pm",
            "12:00pm - 1:00pm",
            "1:00pm - 2:00pm",
            "2:00pm - 3:00pm",
            "3:00pm - 4:00pm",
            "4:00pm - 5:00pm",
            "5:00pm - 6:00pm",
            "6:00pm - 7:00pm",
            "7:00pm - 8:00pm",
            "8:00pm - 9:00pm",
            "9:00pm - 10:00pm"]

var b = "1"
function GetQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
