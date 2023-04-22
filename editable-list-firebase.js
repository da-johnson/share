// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyBhVNRKyjPQpJi2AYhRe6PB1KMd8s2eW54",
	authDomain: "bio-manufacturing-in-space.firebaseapp.com",
	databaseURL: "https://bio-manufacturing-in-space-default-rtdb.firebaseio.com/",
	projectId: "bio-manufacturing-in-space",
	storageBucket: "bio-manufacturing-in-space.appspot.com",
	messagingSenderId: "48129260661",
	appId: "1:48129260661:web:4407baaf4a7a7bae440c3c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create the LabList variable
var LabList = document.getElementById("LabList");

// Create the SEC103 variable
var SEC103 = document.getElementById("SEC103");

// Listen for the LabList submit and push to firebase "LabListtasks" then clears value
LabList.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent the default form submission behavior

  var taskInput = document.getElementById("LabListInput");
  var newTask = taskInput.value;

  // write the new task to the Firebase Realtime Database
  firebase.database().ref("LabListtasks").push(newTask);
  // reset the form
  taskInput.value = "";
});

// Listen for the SEC103 submit and push to firebase "SEC103tasks" then clears value
SEC103.addEventListener("submit", function(event) {
	event.preventDefault(); // prevent the default form submission behavior
  

	var taskInput = document.getElementById("SEC103Input");
	var newTask = taskInput.value;
  
	// write the new task to the Firebase Realtime Database
	firebase.database().ref("SEC103tasks").push(newTask);
	// reset the form
	taskInput.value = "";
});

// get a reference to the tasks collection in the Firebase Realtime Database
var LabtasksRef = firebase.database().ref("LabListtasks");
var SEC103tasksRef = firebase.database().ref("SEC103tasks");

// listen for changes to the LabTasks collection
LabtasksRef.on("value", function(snapshot) {
  var tasksList = document.getElementById("LabTasks");

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

// listen for changes to the SEC103Tasks collection
SEC103tasksRef.on("value", function(snapshot) {
	var tasksList = document.getElementById("SEC103Tasks");
  
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
