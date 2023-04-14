$(document).ready(function() {
	if (localStorage.getItem('myTasksData')) {
		$("#myTasks").html(localStorage.getItem('myTasksData'));
	}

	$("#myTasks").on('input', function() {
		localStorage.setItem('myTasksData', this.innerHTML);
	});
});
