$(document).ready(function () {
    newButtons();
    $("#addButton").click(function () {
        event.preventDefault();
        var userInput = $("#userInputText").val();
        topic.push(userInput);
        newButtons();
        console.log(userInput);
    })
});
//key form GIPHY
var apiKey = "ogH43GajMZfYZIHBF26OE4fzLmntGDv4";
//url to API GIPHY
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=" + apiKey + "&q=" + userRequest + "&limit=10&offset=0&rating=G&lang=en";
//
var userRequest;
// array of moods
var topic = ["happy", "sleepy", "anxious","nauseous","loved"];

//button generator
function newButtons() {

    //target the user button and clear it
    $("#userButtons").empty();
    //loop through array
    for (var i = 0; i < topic.length; i++) {

        //declare and add attributes to newbuttons
        var newButton = $("<button>");
        newButton.attr("class", "btn btn-default buttonStyle");
        newButton.attr("type", "button");
        newButton.text(topic[i]);

        //target area user button and append a newbutton
        $("#userButtons").append(newButton);
        //event listener for new button
        newButton.click(function () {
            //store newbutton text
            userRequest = $(this).text();
            queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + userRequest + "&limit=10&offset=0&rating=G&lang=en";
            $.ajax({
                url: queryURL,
                method: "GET",
            }).done(function (response) {
                console.log(response);
                //target userImages area an clear
                $("#userImages").empty();
                //loop through api array
                for (var i = 0; i < response.data.length; i++) {
                    var giphyImage = $("<div>");
                    giphyImage.attr("class", "imageBlock");
                    var userImage = $("<img>");
                    userImage.attr("src", response.data[i].images.original_still.url)
                    userImage.attr("class", "setImageSize gif");
                    userImage.attr("data-state", "still");
                    userImage.attr("data-still", response.data[i].images.original_still.url);
                    userImage.attr("data-animate", response.data[i].images.original.url)
                    // userImage.attr('width','300');
                    //userImage.attr('height','300');
                
                    //event listener for user's giphy request
                    userImage.click(function () {
                        var state = $(this).attr("data-state");
                        console.log(state);
                        if (state === "still") {
                            var imageAnimate = $(this).attr("data-animate");
                            $(this).attr("src", imageAnimate);
                            $(this).attr("data-state", "animate");
                        } else {
                            var imageStill = $(this).attr("data-still");
                            $(this).attr("src", imageStill);
                            $(this).attr("data-state", "still");
                        }
                    });
                    // creating and adding attributes to a rating var
                    var ratingToDisplay = $("<div>");

                    ratingToDisplay.attr("class", "setRatingDiv");
                    ratingToDisplay.text("Rating : " + response.data[i].rating);

                    //append giphy user image
                    giphyImage.append(userImage);
                    //append rating
                    giphyImage.append(ratingToDisplay);
                    //target and append giphy Image
                    $("#userImages").append(giphyImage);
                }
            });

        })
    }
}
