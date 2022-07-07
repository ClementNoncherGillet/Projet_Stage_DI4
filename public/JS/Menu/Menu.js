const mobileScreen = window.matchMedia("(max-width: 990px )");
$(document).ready(function () {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    switch (page) {
        case 'appointments':
            document.getElementById('appointment').style.backgroundColor = '#71a39c';
        break;
        case 'planning' :
            document.getElementById('planning').style.backgroundColor = '#71a39c';
        break;

        case 'pathways' :
            document.getElementById('pathways').style.backgroundColor = '#71a39c';
        break;

        case 'patients' :
            document.getElementById('patients').style.backgroundColor = '#71a39c';
        break;

        case 'ethics' :
            document.getElementById('ethics').style.backgroundColor = '#71a39c';
        break;

        case 'human-resources' :
            document.getElementById('human-resources').style.backgroundColor = '#71a39c';
        break;

        case 'material-resources' :
            document.getElementById('material-resources').style.backgroundColor = '#71a39c';
        break;

        case 'user' :
            document.getElementById('user').style.backgroundColor = '#71a39c';
        break;
}


});