
// global variables used through out the web
var botsList = {},
    URL = "http://localhost:3000/"; // ec2 server

function saveContactInfo(event){
    event.preventDefault();
    alert($("#first-name").val());
}

