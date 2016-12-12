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


      name = $("#name").val().trim();
      role = $("#dest").val().trim();
      start = $("#start").val().trim();
      monthly = $("#frequency").val().trim();

      database.ref().push({
          name: name,
          role: role,
          start: start,
          monthly: monthly
      });


  });

  database.ref().on("child_added", function(snapshot) {
      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      var data = snapshot.val();
      var name = data.name;
      var role = data.role;
      var start = data.start;
      var monthly = data.monthly;
      var trTag = $("<tr>");

      trTag.append("<td>" + name + "</td>" + "<td>" + role + "</td>" + "<td>" + start + "</td>" + "<td>" + monthly + "</td>");
      $("#tbody").append(trTag);

      // Handle the errors
  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });