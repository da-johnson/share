// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "YOUR_API_KEY",
	authDomain: "YOUR_AUTH_DOMAIN",
	databaseURL: "YOUR_DATABASE_URL",
	projectId: "YOUR_PROJECT_ID",
	storageBucket: "YOUR_STORAGE_BUCKET",
	messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
	appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var addTaskForm = document.getElementById("addTaskForm");

addTaskForm.addEventListener("submit", function(event) {
	event.preventDefault(); // prevent the default form submission behavior

	var taskInput = document.getElementById("taskInput");
	var newTask = taskInput.value;

	// write the new task to the Firebase Realtime Database
	firebase.database().ref("tasks").push(newTask);

	// reset the form
	taskInput.value = "";
});

// get a reference to the tasks collection in the Firebase Realtime Database
var tasksRef = firebase.database().ref("tasks");

// listen for changes to the tasks collection
tasksRef.on("value", function(snapshot) {
	var tasksList = document.getElementById("myTasks");

	// clear the current list items
	tasksList.innerHTML = "";

	// iterate over the tasks in the snapshot and add them to the list
	snapshot.forEach(function(childSnapshot) {
		var task = childSnapshot.val();
		var taskItem = document.createElement("li");
		taskItem.innerText = task;

		// create a delete button for each task item
		var deleteButton = document.createElement("button");
		deleteButton.innerHTML = "<span style='color: red'>X</span>";
		deleteButton.addEventListener("click", function() {
			childSnapshot.ref.remove();
		});
		taskItem.appendChild(deleteButton);

		tasksList.appendChild(taskItem);
	});
});
