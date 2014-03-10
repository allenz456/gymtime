$(document).ready(function() {
	var courtNum = GetQueryStringParams('court');
	
	if ((courtNum > 6) || (courtNum < 1))
		courtNum = undefined;

	$( "tr.court-" + courtNum + " td.headcol p" ).addClass("highlight");

    $('td.calEntry').on("click", function() {
        var classes = this.className.split(' ');

        if (classes.indexOf("free") >= 0) {
            $(this).removeClass("free");
            $(this).addClass("userReserved");
            bootbox.alert("Successfully reserved court.");
        } else {
            bootbox.alert("Court is already reserved :(");
        }
    });
});

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
