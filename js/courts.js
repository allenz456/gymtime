$(document).ready(function() {
	// Stuff
	$('.court').on("click", function() {
		courtNum = this.id
		console.log(this.id)
		

		load_calendar(courtNum)
	});
});

function load_calendar(courtNum) {
	$('p#desc').text("Reserve a court")
	$('.court-wrapper').text('viewing stuff for court num ' + courtNum)
}
 

