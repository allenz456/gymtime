$(document).ready(function() {
	writeTable();
});

var machines = [
{"key": "treadmill", "free": 5, "occupied": 3},
{"key": "ellyptical", "free": 5, "occupied": 3},
{"key": "bicycle", "free": 5, "occupied": 3},
{"key": "rowing", "free": 5, "occupied": 3},
{"key": "stairmaster", "free": 5, "occupied": 3},
]

function writeTable() {
	for (var i = 0; i < machines.length; i++) {
		class_name = "." + key;
		key = machines[i].key;
		free = machines[i].free;
		occupied = machines[i].occupied;
		img = "img/i_" + machines[i].key + ".png";
		$(".machines tbody").append('<tr class="' + key + '">');
		$("." + key).append('<td><img src="' + img + '" width="50"></td>');
		$(class_name).append('<td>' + key + '</td>');
		$(class_name).appeend('<td><span>' + free + '</span></td>');
		$(class_name).append('<td><span>' + occupied + '</span></td></tr>')
	}

}