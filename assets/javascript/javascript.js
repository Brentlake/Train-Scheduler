  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyA0jBS0fV4xx9_2JVJJiQCkQd6LR7y2QSs",
      authDomain: "train-scheduler-33fce.firebaseapp.com",
      databaseURL: "https://train-scheduler-33fce.firebaseio.com",
      storageBucket: "train-scheduler-33fce.appspot.com",
      messagingSenderId: "1061231284870"
  };
  firebase.initializeApp(config);


  var database = firebase.database();




  $("#addbtn").on("click", function() {
      event.preventDefault()


     var  name = $("#name").val().trim();
     var role = $("#dest").val().trim();
      var  start = $("#start").val().trim();
      var monthly = $("#frequency").val().trim();

      database.ref().push({
          name: name,
          role: role,
          start: start,
          monthly: monthly
  
});
      //how often the train runs
  var tFrequency = monthly;

      // Start Time
      var firstTime = start;



      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "hh:mm");
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      var arrivalTime = moment(nextTrain).format("hh:mm");

  database.ref().on("child_added", function(snapshot) {
      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      var data = snapshot.val();
      var name = data.name;
      var role = data.role;
      var start = data.start;
      var monthly = data.monthly;
      var trTag = $("<tr>");
      

      trTag.append("<td>" + name + "</td>" + "<td>" + role + "</td>" + "<td>" + monthly + "</td>" + "<td>" + arrivalTime + "</td>" + "<td>" + tMinutesTillTrain + "</td>" + "<td>");
      $("#tbody").append(trTag);

      // Handle the errors
  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });
});