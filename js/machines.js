$(document).ready(function() {
	writeTable();
});

var machines = [
{"key": "treadmill", "free": 5, "occupied": 3},
{"key": "ellyptical", "free": 4, "occupied": 1},
{"key": "bicycle", "free": 2, "occupied": 2},
{"key": "rowing", "free": 4, "occupied": 0},
{"key": "stairmaster", "free": 3, "occupied": 2},
]

function writeTable() {
	for (var i = 0; i < machines.length; i++) {
		class_name = "." + machines[i].key;
		key = machines[i].key;
		free = machines[i].free;
		occupied = machines[i].occupied;
		img = "img/i_" + machines[i].key + ".png";
		$(".machines").append('<tr class="' + key + '">');
		$("." + key).append('<td><img src="' + img + '" width="50"></td>');
		$(class_name).append('<td class="name">' + key + '</td>');
		$(class_name).append('<td><span class="free">&bull;</span><span>' + free + '</span></td>');
		$(class_name).append('<td><span class="occupied">&bull;</span><span>' + occupied + '</span></td></tr>')
	}
}