
// global variables used through out the web
var botsList = {},
    URL = "http://businesscard-manager.herokuapp.com/"; // ec2 server

function saveContactInfo(event){
    event.preventDefault();
    alert($("#first-name").val());
}

