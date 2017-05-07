var config = {
    apiKey: "AIzaSyChmb3qKON9NOnZ3w-DnKLn6URGyV_3UJQ",
    authDomain: "train-scheduler-80eab.firebaseapp.com",
    databaseURL: "https://train-scheduler-80eab.firebaseio.com",
    projectId: "train-scheduler-80eab",
    storageBucket: "train-scheduler-80eab.appspot.com",
    messagingSenderId: "446920039826"
};

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

//  adding Trains
$("#submit").on("click", function(event) {

    event.preventDefault();

    // user input
    var trainName = $("#input-name").val().trim();
    var trainDestination = $("#input-destination").val().trim();
    var trainTime = $("#input-firstTrain").val().trim();
    var trainFrequency = $("#input-frequency").val().trim();

    // Create object for train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };
    console.log(newTrain);

    // pushes train data to database
    database.ref().push(newTrain);

    // Clears all of the text-boxes
    $("#input-name").val("");
    $("#input-destination").val("");
    $("#input-firstTrain").val("");
    $("#input-frequency").val("");

    // Prevents new page
    return false;
});

// event for adding train to database and row when a user adds entry

database.ref().on("child_added", function(childSnapshot) {

    // Variables
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    // console.log(childSnapshot); 
    // The Math
    var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");

    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // time apart 
    var tRemainder = diffTime % trainFrequency;

    // min until train
    var tMinutesTillTrain = trainFrequency - tRemainder;

    // next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var arrivalTime = moment(nextTrain).format("hh:mm");

    // Add each train's data to table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
        trainFrequency + "</td><td>" + arrivalTime + "</td><td>" + tMinutesTillTrain + "</td></tr>");


});
