$(document).ready(function() {
	// Stuff
	$('.court').on("click", function() {
		courtNum = this.id

		window.location = "reserve.html?court=" + courtNum;
	}); 
});
