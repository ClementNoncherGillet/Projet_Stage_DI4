/**
 * @brief This function is called when we want to change the date of the page
 */
 var tagsPatients=[];
 var tagsPathways=[];
 function changeDate() {
  var date = new Date(document.getElementById("Date").value); //get the new date in the DatePicker
  var day = date.getDate(); //get the day
  var month = date.getMonth() + 1; //get the month (add 1 because it starts at 0)
  var year = date.getFullYear(); //get the year
  if (day < 10) {
    day = "0" + day;
  } //if the day is less than 10, add a 0 before to fit with DateTime format
  if (month < 10) {
    month = "0" + month;
  } //if the month is less than 10, add a 0 before to fit with DateTime format
  dateStr = year + "-" + month + "-" + day + "T12:00:00"; //format the date fo FullCalendar
  window.location.assign(
    "/appointments?date=" + dateStr); //rerender the page with a new date
}

//function permettant d'ouvrir la modale d'ajout d'un rendez-vous
function addAppointment() {
  $("#add-appointment-modal").modal("show");
  var dataPatients = JSON.parse(document.getElementById("patient").value);
  console.log(dataPatients);
  for(var i=0; i<dataPatients.length; i++){
    firstname=dataPatients[i]["firstname"];
    lastname=dataPatients[i]["lastname"];
    patient=firstname+" "+lastname;
    tagsPatients.push(patient);
  }
  console.log(tagsPatients);
  var dataPathways=JSON.parse(document.getElementById("pathway").value);
  console.log(dataPathways);
  for(var i=0; i<dataPathways.length; i++){
    pathName=dataPathways[i]["title"];
    tagsPathways.push(pathName);
  }
}

//function permettant d'ouvrir la modale d'ajout d'un rendez-vous
function openDayModale(type) {
  console.log(type);
  document.getElementById("buttonSelect").onclick=function(){validate(type);}
  document.getElementById("buttonCancel").onclick=function(){hideDayModale(type);}
  $("#add-appointment-modal").modal("hide");
  $("#select-day-modal").modal("show");
  createCalendar(type);

}

//function permettant d'ouvrir la modale d'édition d'un rendez-vous
function editAppointment(
  idappointment,
  lastnamepatient,
  firstnamepatient,
  idpathway,
  dayappointment,
  earliestappointmenttime,
  latestappointmenttime
) {
  //on initialise les informations affichées avec les données du rendez-vous modifié
  document.getElementById("idappointment").value = idappointment;
  document.getElementById("autocompletePatientEdit").value = lastnamepatient+" "+firstnamepatient;
  document.getElementById("autocompletePathwayEdit").value = idpathway;
  document.getElementById("dayAppointment").value = dayappointment;
  document.getElementById("earliestappointmenttime").value = earliestappointmenttime;
  document.getElementById("latestappointmenttime").value = latestappointmenttime;

  //on affiche la modale
  $("#edit-appointment-modal").modal("show");
}

/**
 * Permet de cacher la fenêtre modale d'édition
 */
function hideEditModalForm() {
  $("#edit-appointment-modal").modal("hide");
}

/**
 * Permet de cacher la fenêtre modale d'ajout
 */
function hideNewModalForm() {
  $("#add-appointment-modal").modal("hide");
}

/**
 * Permet de cacher la fenêtre modale de selection du jour
 */
 function hideDayModale(type) {
  $("#select-day-modal").modal("hide");
  if(type=="new"){
    console.log("new");
  $("#add-appointment-modal").modal("show");
  }
  if(type=="edit"){
    console.log("edit");
    $("#edit-appointment-modal").modal("show");
  }
  console.log(type);
}

function validate(type){
  if(type=="new"){
  document.getElementById("dateSelected").value = document.getElementById("dateTemp").value;//set the date from the hidden input in the real input
  }
  else if(type=="edit")
  {
    document.getElementById("dayAppointment").value = document.getElementById("dateTemp").value;//set the date from the hidden input in the real input
  }
  hideDayModale(type);
}


/**
 * @brief This function is called when we want to create or recreate the calendar
 * @param {*} resources the type of resources to display (Patients, Resources...)
 */
 function createCalendar(type) {
  date = new Date(); //create a new date with the date in the hidden input
  var calendarEl = document.getElementById("calendar-appointment"); //create the calendar variable

  //create the calendar
  calendar = new FullCalendar.Calendar(calendarEl, {
    schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives", //we use a non commercial license
    initialView: "dayGridMonth", //set the format of the calendar
    locale: "frLocale", //set the language in french
    firstDay: 1, //set the first day of the week to monday
    timeZone: "Europe/Paris", //set the timezone for France
    selectable: true, //set the calendar to be selectable
    editable: true, //set the calendar not to be editable
    nowIndicator: true,
    dateClick: function(info) {
      document.getElementById("buttonSelect").style="background-color : #37BC9B; border : 1px solid #37BC9B;"
      document.getElementById("buttonSelect").disabled=false;
      document.getElementById("dateTemp").value = info.dateStr; //set the date in the hidden input
    },
  });
  if(type=="new"){
  calendar.select(document.getElementById("dateSelected").value);
  }
  if(type=="edit"){
    calendar.select(document.getElementById("dayAppointment").value);
  }
  calendar.render(); //render the calendar
}

