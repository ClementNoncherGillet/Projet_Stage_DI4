var calendar;
var countAddEvent = 0;
var countAddResource=0; 
var headerResources = "Ressources Humaines";
var currentDateStr = $_GET("date").replaceAll("%3A", ":");
var currentDate = new Date(currentDateStr);
var timerAlert;
var modifAlertTime = 480000;
var messageUnscheduledAppointment = [];
var listScheduledAppointment = [];
var listErrorMessages = {
  messageUnscheduledAppointment: messageUnscheduledAppointment,
  listScheduledAppointment: listScheduledAppointment
};

var listEvents;
var historyEvents=[]; 

function $_GET(param) {
  var vars = {};
  window.location.href.replace(location.hash, "").replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function (m, key, value) {
      // callback
      vars[key] = value !== undefined ? value : "";
    }
  );

  if (param) {
    return vars[param] ? vars[param] : null;
  }
  return vars;
}

function alertOnload(){ 
  // Timeout pour afficher le popup (pour éviter une modif trop longue)
  if(document.getElementById('modifAlertTime')!=null){
    modifAlertTime = document.getElementById('modifAlertTime').value; // En millisecondes
  }
  setTimeout(showPopup, modifAlertTime);
}

document.addEventListener("DOMContentLoaded", function () {
  //Créer le calendar sous les conditions que l'on souhaite
  createCalendar(headerResources);
});

function unshowDiv(id) {
  document.getElementById(id).style.display = "none";
}

//function permettant la modification de l'activité
function modifyEvent() {
  var idEvent = document.getElementById("id-modified-event").value;
  var oldEvent = calendar.getEventById(idEvent);

  var currentDateModified = $_GET("date").substring(0, 10);
  var newStart = new Date(currentDateModified + " " + document.getElementById("start-modified-event").value);
  var newDelay = oldEvent.end.getTime() - oldEvent.start.getTime();
  oldEvent.setStart(new Date(newStart.getTime() + 2 * 60 * 60 * 1000))
  oldEvent.setEnd(new Date(newStart.getTime() + 2 * 60 * 60 * 1000 + newDelay))

  updateEventsAppointment(oldEvent);

  let listResource = [];
  oldEvent._def.resourceIds.forEach((resource) => {
    listResource.push(resource)
  })

  calendar.getEvents().forEach((currentEvent) => {
    if(currentEvent.display == "background"){
      if(oldEvent._def.publicId == currentEvent._def.extendedProps.idScheduledActivity){
        if(listResource.length != 0){
          currentEvent._def.resourceIds = listResource;
          currentEvent.setStart(oldEvent.start);
          currentEvent.setEnd(oldEvent.end);
        }
      }
    }
  })
  
  $("#modify-planning-modal").modal("toggle");
}

function formatDate(date) {
  return ([
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getDate().toString().padStart(2, "0"),
    ].join("-") + " " + [
      date.getHours().toString().padStart(2, "0"),
      date.getMinutes().toString().padStart(2, "0"),
      date.getSeconds().toString().padStart(2, "0"),
    ].join(":")
  );
}

function updateDatabase(id) {
  var listCurrentEvents = calendar.getEvents();
  let listResources = [];
  listCurrentEvents.forEach((currentEvent) => {
    var listResourceCurrentEvent = [];
    for (let i = 0; i < currentEvent._def.resourceIds.length; i++) {
      listResourceCurrentEvent.push(currentEvent._def.resourceIds[i]);
    }
    listResources.push(listResourceCurrentEvent);
  });
  document.getElementById("user-id").value = JSON.stringify(id);
  document.getElementById("events").value = JSON.stringify(calendar.getEvents());
  document.getElementById("list-resource").value = JSON.stringify(listResources);
  document.getElementById("validation-date").value = $_GET("date");
}

function zoomChange() {
  newZoom = document.getElementById('zoom').value;
  calendar.setOption('slotDuration', newZoom)
}


/**
 * Open the modal to Add a pathway
 */
function addEvent() {
  let listeAppointments = JSON.parse(
    document.getElementById("listeAppointments").value.replaceAll("3aZt3r", " ")
  );
  let appointmentSelection = document.getElementById("select-appointment");

  //Reset all options from the list
  for (let i = appointmentSelection.options.length - 1; i >= 0; i--) {
    appointmentSelection.remove(i);
  }

  //Add all non shculed appointments into the list
  var nbOptions = 0;
  for (let i = 0; i < listeAppointments.length; i++) {
    if (listeAppointments[i].scheduled == false) {
      appointmentSelection.options[nbOptions] = new Option(
        listeAppointments[i].idPatient[0].firstname +
          " " +
          listeAppointments[i].idPatient[0].lastname +
          " / " +
          listeAppointments[i].idPathway[0].title,
        listeAppointments[i].id
      );
      nbOptions++;
    }
  }

  $("#add-planning-modal").modal("show");

  let filter = document.getElementById("filterId"); //get the filter
  filter.style.display = "none"; //hide the filter
  while (filter.firstChild) {
    //while there is something in the filter
    filter.removeChild(filter.firstChild); //remove the old content
  }
}

/**
 * This function is called when clicking on the button 'Valider' into Add Modal. 
 * Add All the Activities from a choosen appointment in the Calendar
 */
function AddEventValider() {
  //Get databases informations to add the activities appointment on the calendar
  var listeSuccessors = JSON.parse(document.getElementById("listeSuccessors").value);
  var listeActivities = JSON.parse(document.getElementById("listeActivities").value);
  var listeAppointments = JSON.parse(document.getElementById("listeAppointments").value);
  var categoryOfMaterialResourceArray=JSON.parse(document.getElementById('categoryOfMaterialResourceJSON').value.replaceAll('3aZt3r',' ')); 
  var listeActivitHumanResource = JSON.parse(document.getElementById("listeActivityHumanResource").value);
  var listeActivityMaterialResource = JSON.parse(document.getElementById("listeActivityMaterialResource").value);
  var categoryOfHumanResourceArray=JSON.parse(document.getElementById('categoryOfHumanResourceJSON').value.replaceAll('3aZt3r',' ')); 
  var appointmentid = document.getElementById("select-appointment").value;
  
  
  //Get the appointment choosed by user and the place of the appointment in the listAppointment
  var appointment;
  for (let i = 0; i < listeAppointments.length; i++) {
    if (listeAppointments[i]["id"] == appointmentid) {
      appointment = listeAppointments[i];
      listeAppointments[i].scheduled = true;
    }
  }

  document.getElementById("listeAppointments").value =
    JSON.stringify(listeAppointments);

  //Date of the begining of the pathway 
  var PathwayBeginTime = document.getElementById("timeBegin").value;
  var PathwayBeginDate = new Date(
    new Date(currentDateStr.substring(0, 10) + " " + PathwayBeginTime).getTime() +
      2 * 60 * 60000
  );


  //Get activities of the pathway
  var activitiesInPathwayAppointment = [];
  for (let i = 0; i < listeActivities.length; i++) {
    if (
      "pathway_" + listeActivities[i]["idPathway"] ==
      appointment["idPathway"][0].id
    ) {
      activitiesInPathwayAppointment.push(listeActivities[i]); 
    }
  }

    //Get all actiity b in the successors to find the ids of firsts activities in pathway
    var successorsActivitybIdList = [];
    for (let i = 0; i < listeSuccessors.length; i++) {
      successorsActivitybIdList.push(listeSuccessors[i].idactivityb);
    }

    //get the first activities of the pathway with ids 
    var firstActivitiesPathway=[]; 
    for (let i = 0; i < activitiesInPathwayAppointment.length; i++) {
      if (
        successorsActivitybIdList.includes(activitiesInPathwayAppointment[i].id) == false) {
        firstActivitiesPathway.push(activitiesInPathwayAppointment[i]);
      }
    }

    var activitiesA=[];
    //Array that stock all Activities A to be sure that we dont push the same activity A two times. 
    var allActivtiesA=[]; 
    for(let i=0; i<firstActivitiesPathway.length; i++){
      let activityA={activity:firstActivitiesPathway[i],delaymin:0}; 
      activitiesA.push(activityA); 
      allActivtiesA.push(firstActivitiesPathway[i].id); 
    }
    do{

      //Creating Activities in FullCalendar
      for(let i=0; i<activitiesA.length; i++){
        var quantityHumanResources = 0;
        var quantityMaterialResources = 0; 
        var activityResourcesArray=[]; 
        
        //Find for all Activities of the pathway, the number of Humanresources to define. 
        var categoryHumanResources=[]; 
        
        for (let j = 0; j < listeActivitHumanResource.length; j++) {
          if (listeActivitHumanResource[j].activityId == activitiesA[i].activity.id) {
            for(let k=0; k<categoryOfHumanResourceArray.length; k++){
              if(listeActivitHumanResource[j].humanResourceCategoryId==categoryOfHumanResourceArray[k].idcategory)
              categoryHumanResources.push({id:listeActivitHumanResource[j].id,quantity:listeActivitHumanResource[j].quantity,categoryname:categoryOfHumanResourceArray[k].categoryname})
            }
            quantityHumanResources += listeActivitHumanResource[j].quantity;
          }
        }
      

        

        
        var categoryMaterialResources=[]; 
        
        for (let j = 0; j < listeActivityMaterialResource.length; j++) {
          if (listeActivityMaterialResource[j].activityId == activitiesA[i].activity.id) {
            for(let k=0; k<categoryOfMaterialResourceArray.length; k++){
              if(listeActivityMaterialResource[j].MaterialResourceCategoryId==categoryOfMaterialResourceArray[k].idcategory)
              categoryMaterialResources.push({id:listeActivityMaterialResource[j].id,quantity:listeActivityMaterialResource[j].quantity,categoryname:categoryOfMaterialResourceArray[k].categoryname})
            }
            quantityMaterialResources += listeActivityMaterialResource[j].quantity;
          }
        }

        //Put the number of human resouorces in the ResourcesArray of the event

        for (let j = 0; j< quantityHumanResources; j++) {
          activityResourcesArray.push("h-default");
        }

        for(let j=0; j<quantityMaterialResources;j++){
          activityResourcesArray.push("m-default");
        }


        //counting for the ids of events
        countAddEvent++;

        //Add one event in the Calendar
        var event = calendar.addEvent({
          id: "new",
          description: "",
          resourceIds: activityResourcesArray,
          title: activitiesA[i].activity.name.replaceAll("3aZt3r", " "),
          start: PathwayBeginDate.getTime()+activitiesA[i].delaymin*60000,
          end: PathwayBeginDate.getTime() + activitiesA[i].activity.duration * 60000,
          patient:appointment.idPatient[0].lastname +" " +appointment.idPatient[0].firstname,
          appointment: appointment.id,
          activity: activitiesA[i].activity.id,
          type: "activity",
          humanResources: [],
          materialResources: [],
          pathway: appointment.idPathway[0].title.replaceAll("3aZt3r", " "),
          categoryMaterialResource: categoryMaterialResources, 
          categoryHumanResource: categoryHumanResources, 
        });

        event._def.ui.backgroundColor = RessourcesAllocated(event);
        event._def.ui.borderColor = RessourcesAllocated(event);
        event.setEnd(event.end); 
      }
      
      var successorsActivitiesA=[]; 
       //On reset le tableau successorsActivitiesA
       for(let i=successorsActivitiesA.length-1; i>0; i--){
        successorsActivitiesA.splice(i);
      }
      //Get each Activities B for each Activities A 
      
      for(let i=0; i<activitiesA.length; i++){
        for(let j=0; j<listeSuccessors.length; j++){
          if(activitiesA[i].activity.id==listeSuccessors[j].idactivitya){
            let successor={delaymin:listeSuccessors[j].delaymin,activityB:listeSuccessors[j].idactivityb}; 
            successorsActivitiesA.push(successor); 
          }
        }
      }

      //Keeping for each différent activityB in successorsActivitiesA the biggest delaymin
      for(let i=0; i<successorsActivitiesA.length; i++){
        for(let j=0; j<successorsActivitiesA.length;j++){
          if(successorsActivitiesA[i].activityB==successorsActivitiesA[j].activityB && i!=j){
            if(successorsActivitiesA[i].delaymin<successorsActivitiesA[j].delaymin){
              successorsActivitiesA.splice(i); 
            }
            else{
              successorsActivitiesA.splice(j); 
            }
          }
        }
      }

      //Put SuccessorsActivitiesA in ActivitiesA
      //Get the longestActivity for all ActivityA.
      var biggestDuration=0; 
      for(let i=0; i<activitiesA.length; i++){ 
          if(biggestDuration<activitiesA[i].activity.duration){
            biggestDuration=activitiesA[i].activity.duration; 
          }
      }
      //Deleting All activities A
      for(let i=activitiesA.length-1;i>=0;i--){
        activitiesA.splice(i); 
      }
      
      //Put activitiesA into AllActivitiesA and ActivitiesB in ActivitiesA
      for(let i=0; i<successorsActivitiesA.length; i++){
        for(let j=0; j<listeActivities.length; j++){
          if(successorsActivitiesA[i].activityB==listeActivities[j].id){ 
            for(let k=0; k<allActivtiesA.length;k++){
              if(allActivtiesA.includes(listeActivities[j].id)==false){
                let activityA={activity:listeActivities[j],delaymin:successorsActivitiesA[i].delaymin}
                activitiesA.push(activityA); 
                allActivtiesA.push(listeActivities[j].id); 
              }
            }
          }
        }
      }
      let biggestdelay=0; 
      for(let i=0; i<activitiesA.length; i++){
          if(activitiesA[i].delaymin>biggestdelay){
            biggestdelay=activitiesA[i].delaymin; 
          }
      }
      PathwayBeginDate=new Date(PathwayBeginDate.getTime()+biggestDuration*60000+biggestdelay*60000); 

    } while (successorsActivitiesA.length!=0);
    verifyHistoryPush(historyEvents,appointmentid); 
    calendar.render();

    $("#add-planning-modal").modal("toggle");
    updateErrorMessages();
  }

function showSelectDate() {
  let selectContainerDate = document.getElementById("select-container-date");
  selectContainerDate.style.display = "block";
}

function changePlanning() {
  var header =
    document.getElementById("displayList").options[
      document.getElementById("displayList").selectedIndex
    ].text; //get the type of resources to display in the list
  headerResources = header; //update the header of the list
  createCalendar(header); //rerender the calendar with the new type of resources
  let filter = document.getElementById("filterId"); //get the filter
  filter.style.display = "none"; //hide the filter
  while (filter.firstChild) {
    //while there is something in the filter
    filter.removeChild(filter.firstChild); //remove the old content
  }
}

//fonction qui permet de tester la mise à jour de la liste des events d'un appointment
function updateEventsAppointment(modifyEvent) {
  listeHumanResources=JSON.parse(document.getElementById('human').value.replaceAll('3aZt3r',' ')); 
      listeMaterialResources=JSON.parse(document.getElementById('material').value.replaceAll('3aZt3r',' '));
      //Ajoute la ressource allouée dans extendedProps -> human et material Resource afin d'afficher la ressource lorsque l'on clique sur l'event
      clearArray(modifyEvent._def.extendedProps.humanResources); 
      clearArray(modifyEvent._def.extendedProps.materialResources)
      for(let i=0; i<modifyEvent._def.resourceIds.length; i++){
        if(modifyEvent._def.resourceIds[i]!='h-default' && modifyEvent._def.resourceIds[i]!='m-default' && modifyEvent._def.extendedProps.humanResources.includes(modifyEvent._def.resourceIds[i])==false){
          for(let j=0; j<listeHumanResources.length; j++){
            if(listeHumanResources[j].id==modifyEvent._def.resourceIds[i]){
              var humanArray={id:modifyEvent._def.resourceIds[i],title:listeHumanResources[j].title}
              modifyEvent._def.extendedProps.humanResources.push(humanArray); 
            }  
          }
          for(let j=0; j<listeMaterialResources.length;j++){
            if(listeMaterialResources[j].id==modifyEvent._def.resourceIds[i]){
              var materialArray={id:modifyEvent._def.resourceIds[i],title:listeMaterialResources[j].title}
              modifyEvent._def.extendedProps.materialResources.push(materialArray); 
            }  
          }
        }
      }

      let listResource = [];
      modifyEvent._def.resourceIds.forEach((resource) => {
        listResource.push(resource)
      })

      verifyHistoryPush(historyEvents,-1);
      updateErrorMessages();
}

function DisplayModifyEventModal(eventClicked){
  eventClicked=JSON.parse(eventClicked);
  console.log(eventClicked);
      var id = eventClicked.el.fcSeg.eventRange.def.publicId; //get the id of the event
      var activity = calendar.getEventById(id); //get the event with the id
      var start = activity.start; //get the start date of the event
      var humanResources = activity.extendedProps.humanResources; //get the human resources of the event
      var humanResourcesNames = ""; //create a string with the human resources names
      if (humanResources != undefined) {
        for (var i = 0; i < humanResources.length; i++) {
          //for each human resource except the last one

          if (humanResources[i].title != undefined) {
            //if the human resource exist
            humanResourcesNames += humanResources[i].title + "; "; //add the human resource name to the string with a ; and a space
          }
        }
      }
      //humanResourcesNames += humanResources[i].resourceName; //add the last human resource name to the string

      var materialResources = activity.extendedProps.materialResources; //get the material resources of the event
      
      var materialResourcesNames = ""; //create a string with the material resources names
      if (materialResources != undefined) {
        for (var i = 0; i < materialResources.length; i++) {
          //for each material resource except the last one
          if (materialResources[i].title != undefined) {
            //if the material resource exist
            materialResourcesNames += materialResources[i].title + "; "; //add the material resource name to the string with a ; and a space
          }
        }
      }
      // materialResourcesNames += materialResources[i].resourceName; //add the last material resource name to the string

      //set data to display in the modal window
      $("#start-modified-event").val(start.toISOString().substring(11, 19)); //set the start date of the event
      document.getElementById("show-modified-event-title").innerHTML = activity.title; //set the title of the event
      $("#parcours-modified-event").val(activity.extendedProps.pathway); //set the pathway of the event
      $("#patient-modified-event").val(activity.extendedProps.patient); //set the patient of the event
      $("#human-resource-modified-event").val(humanResourcesNames); //set the human resources of the event
      $("#material-resource-modified-event").val(materialResourcesNames); //set the material resources of the event
      $("#id-modified-event").val(id);

      $("#modify-planning-modal").modal("show"); //open the window
}

function createCalendar(typeResource,useCase) {
  const height = document.querySelector("div").clientHeight;
  var calendarEl = document.getElementById("calendar");
  var first;
  var listEvent;

  let listResource = [];
    if (listEvents == undefined) {
      first = true;
    } 

    else {
      first = false;
      switch(useCase){
        case 'recreate':
            if(historyEvents[historyEvents.length-2]!=undefined){         
              if(historyEvents[historyEvents.length-1].idAppointment!=-1){    //test to know if we remove an 'add' modification 
                var listeAppointments = JSON.parse(document.getElementById("listeAppointments").value);  //get the list appointments
                for (let i = 0; i < listeAppointments.length; i++) {
                  if (listeAppointments[i]["id"] == historyEvents[historyEvents.length-1].idAppointment) { //searching the right appointment that match with the id given
                    listeAppointments[i].scheduled = false; //define appointment on not scheduled to be selectionnable in the adding modal
                  }
                }
                document.getElementById("listeAppointments").value =JSON.stringify(listeAppointments); //update appointment list
              }
              listEvent=historyEvents[historyEvents.length-2].events; //gives all events to recreate the calendar
              historyEvents.splice(historyEvents.length-1,1);  //removing the latest modification in historyEvents because we undo it
            }
          break; 
      default: 
        listEvent = calendar.getEvents();
        break; 
      }
      listEvent.forEach((event) => {
        let eventResources = [];
        for (let i = 0; i < event._def.resourceIds.length; i++) {
          eventResources.push(event._def.resourceIds[i]);
        }
        listResource.push(eventResources);
      });
    }
    calendar = new FullCalendar.Calendar(calendarEl, {
      //clé de la license pour utiliser la librairie à des fin non commerciale
      schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
      resourceOrder:'type',
      //initialise la vue en colonne par ressource par jour en horaire française
      initialView: "resourceTimelineDay",
      slotDuration: "00:20:00",
      locale: "fr",
      timeZone: "Europe/Paris",

      //permet de modifier les events dans le calendar
      selectable: false,
      //eventConstraint:"businessHours",
      editable: true,
      eventDurationEditable: false,
      contentHeight: (9 / 12) * height,
      handleWindowResize: true,
      nowIndicator: true,
      selectConstraint: "businessHours", //set the select constraint to be business hours
      eventMinWidth: 1, //set the minimum width of the event

      //modifie l'affichage de l'entête du calendar pour ne laisser que la date du jour
      headerToolbar: {
        start: null,
        center: "title",
        end: null,
      },

      //modifie l'affichage des heures de la journée
      slotLabelFormat: {
        hour: "2-digit",
        minute: "2-digit",
        meridiem: false,
        hour12: false,
      },
      resourceAreaWidth: "20%",
      resourceAreaHeaderContent: headerResources,

      //permet d'ouvrir la modal pour la modification d'une activité lorsque l'on click dessus
      eventClick: function (event) {
        if (event.event.display != "background"){
          var listAppointment=JSON.parse(document.getElementById('listeAppointments').value.replaceAll("3aZt3r", " ")); 
          var listActivities=JSON.parse(document.getElementById('listeActivities').value.replaceAll("3aZt3r", " ")); 
          var listSuccessors=JSON.parse(document.getElementById('listeSuccessors').value);
          var listActivitiesPathway=[]; 
          var listSuccessorsPathway=[];
          var activitiesInlistSuccessorsPathway=[]; 
          var id = event.event._def.publicId; //get the id of the event
          var activity = calendar.getEventById(id); //get the event with the id
          var appointment; 
          var title=activity._def.extendedProps.patient + " / "+activity._def.extendedProps.pathway;
  
          for(let i=0; i<listAppointment.length;i++){
            if(activity._def.extendedProps.appointment==listAppointment[i].id){
              appointment=listAppointment[i];
            }
          }
 
          for(let i=0; i<listActivities.length; i++){
            if(appointment.idPathway[0].id.replaceAll('pathway_','')==listActivities[i].idPathway){
              listActivitiesPathway.push(listActivities[i]); 
            }
          }

          for(let i=0; i<listSuccessors.length; i++){
            for(let j=0; j<listActivitiesPathway.length; j++){
              if(listActivitiesPathway[j].id==listSuccessors[i].idactivitya && activitiesInlistSuccessorsPathway.includes(listSuccessors[i].idactivitya)==false){
                listSuccessorsPathway.push(listSuccessors[i]); 
                activitiesInlistSuccessorsPathway.push(listSuccessors[i].idactivitya);
              }
            }
          }
         
          var listSuccessorsActivitiesPathway=[]; 
          for(let i=0; i<listSuccessorsPathway.length; i++){
            var nameActivitya; 
            var duration; 
            var nameActivityb; 
            for(let j=0; j<listActivitiesPathway.length; j++){
              if(listActivitiesPathway[j].id==listSuccessorsPathway[i].idactivitya){
                console.log('a');
                nameActivitya=listActivitiesPathway[j].name;
                duration=listActivitiesPathway[j].duration;
              }
            }
            for(let j=0; j<listActivitiesPathway.length; j++){
              if(listActivitiesPathway[j].id==listSuccessorsPathway[i].idactivityb){
                nameActivityb=listActivitiesPathway[j].name;
              }
            }
            listSuccessorsActivitiesPathway.push({nameactivitya:nameActivitya, nameactivityb:nameActivityb,duration:duration,delaymin:listSuccessorsPathway[i].delaymin, delaymax:listSuccessorsPathway[i].delaymax});
          }
          
          //removing before display
          var nodesNotification=document.getElementById('input-container-onWhite-pathway').childNodes;                             //Get the div in lateral-panel-bloc
          while(nodesNotification.length!=3){                                                                         //the 3 first div are not notifications
            document.getElementById('input-container-onWhite-pathway').removeChild(nodesNotification[nodesNotification.length-1]);  //Removing div 
          }
          for(let i=0; i<listSuccessorsActivitiesPathway.length; i++){
            var div = document.createElement('div'); 
            div.setAttribute('class','alert alert-dark')                    
            div.setAttribute('role','alert');
            div.setAttribute('style','display: flex; flex-direction : column;'); 
            div.innerHTML=listSuccessorsActivitiesPathway[i].nameactivitya + ' -----> '+listSuccessorsActivitiesPathway[i].nameactivityb;
           
            //Div to put input in row 
            var divRow= document.createElement('div');
            divRow.setAttribute('style','display: flex; flex-direction : column;'); 
            div.appendChild(divRow); 

            var inputDelaymin=document.createElement('label'); 
            inputDelaymin.setAttribute('class','label-event-solid');
            inputDelaymin.innerHTML='Délai minimum : '+listSuccessorsActivitiesPathway[i].delaymin +' min'; 

            var inputDelaymax=document.createElement('label'); 
            inputDelaymax.setAttribute('class','label-event-solid');
            inputDelaymax.setAttribute('value',listSuccessorsActivitiesPathway[i].delaymin); 
            inputDelaymax.innerHTML='Délai maximum : '+listSuccessorsActivitiesPathway[i].delaymax + ' min'; 
            divRow.appendChild(inputDelaymin); 
            divRow.appendChild(inputDelaymax);

            document.getElementById('input-container-onWhite-pathway').appendChild(div); 
          }
            
            console.log(appointment.earliestappointmenttime)
            console.log(appointment.latestappointmenttime)
          
          //set data to display in the modal window

          document.getElementById("show-information-appointment-title").innerHTML = title; //set the title of the event
          $("#input-modal-earliestappointmentdate").val(appointment.earliestappointmenttime.substring(11, 19));
          $("#input-modal-latestappointmentdate").val(appointment.latestappointmenttime.substring(11, 19));
          
          $("#display-appointment-modal").modal("show"); //open the window
          document.getElementById('eventClicked').value=JSON.stringify(event);
        }
      },

    eventDrop: function (event) {
      var modifyEvent = event.event;
      updateEventsAppointment(modifyEvent)
    },
  });
  switch (typeResource) {
    case "Ressources Humaines": //if we want to display by the resources
      var resourcesArray = JSON.parse(
        document.getElementById("human").value.replaceAll("3aZt3r", " ")
      ); //get the data of the resources
      for (var i = 0; i < resourcesArray.length; i++) {
        var temp = resourcesArray[i]; //get the resources data
        var businessHours = []; //create an array to store the working hours
        for (var j = 0; j < temp["workingHours"].length; j++) {
          businesstemp = {
            //create a new business hour
            startTime: temp["workingHours"][j]["startTime"], //set the start time
            endTime: temp["workingHours"][j]["endTime"], //set the end time
            daysOfWeek: [temp["workingHours"][j]["day"]], //set the day
          };
          businessHours.push(businesstemp); //add the business hour to the array
        }
        countAddResource++; 
        calendar.addResource({
          //add the resources to the calendar
          id: temp["id"], //set the id
          title: temp["title"], //set the title
          categories: [temp["categories"]], //set the type
          businessHours: businessHours, //get the business hours
          type:countAddResource,
        });
        calendar.addResource({
          id: "h-default",
          title: "Aucune ressource allouée",
          type:0,
          categories:[["default"]]
        });
        }
        break;
      case "Ressources Matérielles": //if we want to display by the resources
        var resourcesArray = JSON.parse(
          document.getElementById("material").value.replaceAll("3aZt3r", " ")
        ); //get the data of the resources
        for (var i = 0; i < resourcesArray.length; i++) {
          var temp = resourcesArray[i]; //get the resources data
          calendar.addResource({
            //add the resources to the calendar
            id: temp["id"],
            categories: [temp["categories"]], //set the type
            title: temp["title"],
            type:countAddResource,

          });
          calendar.addResource({
            id: "m-default",
            title: "Aucune ressource allouée",
            type:0,
          });
        }
        break;
    }

    if (first == true) {
      listEvents = JSON.parse(
        document
          .getElementById("listScheduledActivitiesJSON")
          .value.replaceAll("3aZt3r", " ")
      );
    } else {
      let setEvents = [];
      var index = 0;
      listEvent.forEach((eventModify) => {
        var start = new Date(eventModify.start - 2 * 60 * 60 * 1000);
        var end = new Date(eventModify.end - 2 * 60 * 60 * 1000);
        if (eventModify.display != "background") {
          var start = new Date(eventModify.start - 2 * 60 * 60 * 1000);
          var end = new Date(eventModify.end - 2 * 60 * 60 * 1000);
          setEvents.push({
            id: eventModify.id,
            start: formatDate(start).replace(" ", "T"),
            end: formatDate(end).replace(" ", "T"),
            title: eventModify.title,
            resourceIds: listResource[index],
            patient: eventModify.extendedProps.patient,
            appointment: eventModify.extendedProps.appointment,
            activity: eventModify.extendedProps.activity,
            type: eventModify.extendedProps.type,
            humanResources: eventModify.extendedProps.humanResources,
            materialResources: eventModify.extendedProps.materialResources,
            categoryMaterialResource: eventModify.extendedProps.categoryMaterialResource,
            categoryHumanResource: eventModify.extendedProps.categoryHumanResource,
            pathway: eventModify.extendedProps.pathway,
          });
        }
        else{
          var start = new Date(eventModify.start - 2 * 60 * 60 * 1000);
          var end = new Date(eventModify.end - 2 * 60 * 60 * 1000);
          setEvents.push({
            id: eventModify.id,
            start: formatDate(start).replace(" ", "T"),
            end: formatDate(end).replace(" ", "T"),
            resourceIds: listResource[index],
            type: eventModify.extendedProps.type,
            description: eventModify.extendedProps.description,
            display : eventModify.display,
            color : eventModify.color,
          }
          );
          }
        index++;
      });
      listEvents = setEvents;
    }
    for (var i = 0; i < listEvents.length; i++) {
      calendar.addEvent(listEvents[i]);
    }
    let listCurrentEvent = calendar.getEvents();
    listCurrentEvent.forEach((currentEvent) => {
      currentEvent._def.ui.backgroundColor = RessourcesAllocated(currentEvent);
      currentEvent._def.ui.borderColor = RessourcesAllocated(currentEvent);
    });
    if(historyEvents.length==0){
      verifyHistoryPush(historyEvents,-1); 
    }
    //affiche le calendar
    calendar.gotoDate(currentDate);

    calendar.render();
    updateErrorMessages();
  }

function showPopup() {
  $("#divPopup").show();

  timerAlert = setInterval(function () {
    var count = $("span.countdown").html();
    if (count > 1) {
      $("span.countdown").html(count - 1);
    } else {
      clearInterval(timerAlert);
      window.location.assign(
        "/ModificationDeleteOnUnload?dateModified=" + $_GET("date")
      );
    }
  }, 1000);
}

function closePopup() {
  $("#divPopup").hide();
  clearInterval(timerAlert);
  $("span.countdown").html(60);
  setTimeout(showPopup, modifAlertTime);
}

function deleteModifInDB() {
  window.location.assign(
    "/ModificationDeleteOnUnload?dateModified=" + $_GET("date")
  );
}

/**
 * This function gives the color to apply to an event on the planning. 
 * red if the Activity is not associated to the riht resources (material and human)
 * green if the Activity have all resources that it need. 
 * unavailabilities are red in any case.  
 * @param {*} event 
 * @returns color of the event
 */
function RessourcesAllocated(event) {
  if (event._def.resourceIds.includes("m-default")) { //if a material resource is not allocated
    return "rgba(173, 11, 11, 0.753)";
  } else if (event._def.resourceIds.includes("h-default")) { //if a human resource is not allocated
    return "rgba(173, 11, 11, 0.753)";
  } else if (event._def.ui.display == "background") {  //for unavailabilities 
    return "#ff0000";
  } else {
    return "#20c997"; //if all is allocated, return green color
  }
}

/**
 * This function clears an array of all his rows
 * @param {*} array 
 */
function clearArray(array){
  while (array.length) {
    array.pop();      //removing rows by rows 
  }
}

/**
 * @brief This function is called when clicking on 'Retour en arrière button', recreate the calendar before  the last  modification
 */
function undoEvent(){ 
  if(historyEvents.length!=1){
    createCalendar(headerResources,'recreate');
  }
}

/**
 * @brief This function is called when the user clicks a key
 */
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'z') { //if user clicks ctrl + z
    //we call the function undoEvent 
    undoEvent();
  }
  if (event.ctrlKey && event.altKey && event.key === 's') { //if user clicks ctrl + s
    //we call the function undoEvent 
    var id = document.getElementById("user-id").value;
    updateDatabase('save', id);
    document.getElementById("update-database-form").submit();
  }
});

/**
 * This function stock in an array the history of all modifications on the Calendar, for performance reasons, we save only the last 10 modifications. 
 * @param {*} array           //get historyEvents array 
 * @param {*} idAppointment   //gives information on the appointment, usefull when undo is applied on added appointment (to get it back into the list of selectionnable appoinments to add)
 */
function verifyHistoryPush(array, idAppointment){
  
  if(array.length>10){  //10 for performance reasons
    for(let i=0; array.length>=10; i++){  //remove before push 
      array.splice(i,1); 
    }
   
  }
  array.push({events:calendar.getEvents(),idAppointment:idAppointment});   //push into the history of modifications
}

/**
 * @brief This function update list error messages 
 */
function updateErrorMessages() {
  var listScheduledActivities = calendar.getEvents(); //recover all events from the calendar

  listErrorMessages.messageUnscheduledAppointment = [];
  var listAppointments = JSON.parse(document.getElementById("listeAppointments").value.replaceAll("3aZt3r", " ")); //recover all appointments
  listAppointments.forEach((currentAppointment) => { //browse all appointments
    var unscheduledAppointment = true;
    listScheduledActivities.forEach((scheduledActivity) => { //browse all events
      if(currentAppointment.id == scheduledActivity._def.extendedProps.appointment){ //if the appointment is already on the planning
        //we don't set an error message
        unscheduledAppointment = false;
      }
    })
    if(unscheduledAppointment == true){ //if the appointment is not already on the planning
      //we set an error message
      var message = "Le rendez-vous de " + currentAppointment.idPatient[0].lastname + " " + currentAppointment.idPatient[0].firstname + " pour le parcours " + currentAppointment.idPathway[0].title + " n'est pas encore plannifié.";
      listErrorMessages.messageUnscheduledAppointment.push(message);
    }
  })

  //browse all events
  listScheduledActivities.forEach((scheduledActivity) => {
    if(scheduledActivity.display != "background"){ //check if the scheduled activity is not an unavailability
      var appointmentAlreadyExist = false;
      if(listErrorMessages.listScheduledAppointment != []){ //check if list error messages is not empty
        listErrorMessages.listScheduledAppointment.forEach((errorMessage) => { //browse the list error messages
          if(scheduledActivity._def.extendedProps.appointment == errorMessage.appointmentId){ //check if the appointment is already register in the list
            appointmentAlreadyExist = true;

            //set the error messages for earliest and latest appointment time
            errorMessage.messageEarliestAppointmentTime = getMessageEarliestAppointmentTime(listScheduledActivities, scheduledActivity._def.extendedProps.appointment);
            errorMessage.messageLatestAppointmentTime = getMessageLatestAppointmentTime(listScheduledActivities, scheduledActivity._def.extendedProps.appointment);

            var scheduledActivityAlreadyExist = false;
            errorMessage.listScheduledActivity.forEach((existingScheduledActivity) => { //browse the scheduled activities related to the appointment
              if(existingScheduledActivity.scheduledActivityId == scheduledActivity._def.publicId){ //if the scheduled activity already exist in the list
                scheduledActivityAlreadyExist = true;

                //update the data
                existingScheduledActivity.messageDelay = getMessageDelay(listScheduledActivities, scheduledActivity); //set error message for delay
                existingScheduledActivity.listCategoryHumanResources = getListCategoryHumanResources(scheduledActivity); //set data for category human resources
                existingScheduledActivity.listHumanResources = getListHumanResources(scheduledActivity); //set data for human resources
                existingScheduledActivity.listCategoryMaterialResources = getListCategoryMaterialResources(scheduledActivity); //set data for category material resources
                existingScheduledActivity.listMaterialResources = getListMaterialResources(scheduledActivity); //set data for material resources
              }
            })
            if(scheduledActivityAlreadyExist == false){ //if the scheduled activity doesn't exist
              //add new scheduled activity in the list
              errorMessage.listScheduledActivity.push({
                //add data for the scheduled activity
                scheduledActivityId: scheduledActivity._def.publicId,
                scheduledActivityName: scheduledActivity._def.title,

                messageDelay: getMessageDelay(listScheduledActivities, scheduledActivity), //add error message for delay 
                listCategoryHumanResources: getListCategoryHumanResources(scheduledActivity), //add data for category human resources
                listHumanResources: getListHumanResources(scheduledActivity), //add data for human resource
                listCategoryMaterialResources: getListCategoryMaterialResources(scheduledActivity), //add data for category material resources
                listMaterialResources: getListMaterialResources(scheduledActivity) //add data for material resource
              })
            }
          }
        })
      }
      if(appointmentAlreadyExist == false){ //if the appointment doesn't exist
        //add new appointment
        listErrorMessages.listScheduledAppointment.push({
          //add data for the appointment
          appointmentId: scheduledActivity._def.extendedProps.appointment,
          patientName: scheduledActivity._def.extendedProps.patient,
          pathwayName: scheduledActivity._def.extendedProps.pathway,

          //add error message for earliest and latest appointment time
          messageEarliestAppointmentTime: getMessageEarliestAppointmentTime(listScheduledActivities, scheduledActivity._def.extendedProps.appointment), 
          messageLatestAppointmentTime: getMessageLatestAppointmentTime(listScheduledActivities, scheduledActivity._def.extendedProps.appointment),
          
          //add the new scheduled activity
          listScheduledActivity: [{ 
            //add data for the scheduled activity
            scheduledActivityId: scheduledActivity._def.publicId,
            scheduledActivityName: scheduledActivity._def.title,

            messageDelay: getMessageDelay(listScheduledActivities, scheduledActivity), //add error message for delay
            listCategoryHumanResources: getListCategoryHumanResources(scheduledActivity), //add data for category human resources
            listHumanResources: getListHumanResources(scheduledActivity), //add data for human resource
            listCategoryMaterialResources: getListCategoryMaterialResources(scheduledActivity), //add data for category material resources
            listMaterialResources: getListMaterialResources(scheduledActivity) //add data for material resource
          }]
        })
      }
    }
  })
  updatePanelErrorMessages(); //update the panel error messages
}

/**
 * @brief This function return an error message if the appointment starts too early, return "" if we have no problem.
 * @param {*} listScheduledActivities list of all calendar events
 * @param {*} appointmentId appointment id require
 * @returns the error message
 */
function getMessageEarliestAppointmentTime(listScheduledActivities, appointmentId){
  var message = [];

  var listeAppointments = JSON.parse(document.getElementById("listeAppointments").value.replaceAll("3aZt3r", " ")); //recover list appointments
  var appointment;
  listeAppointments.forEach((currentAppointment) => { //browse the list appointments
    if(currentAppointment.id == appointmentId){ //if we find the appointment linked to the identifier
      appointment = currentAppointment //set the appointment for get all his data
    }
  })
  let earliestAppointmentDate = new Date(currentDateStr.split("T")[0] + " " + appointment.earliestappointmenttime.split("T")[1]);

  listScheduledActivities.forEach((scheduledActivity) => { //browse all events
    if(scheduledActivity._def.extendedProps.appointment == appointmentId){ //if the scheduled activity is related to the appointment
      //we check if the start time is earlier than the earliest appointment time
      if(new Date(scheduledActivity.start.getTime() - 2 * 60 * 60 * 1000) < earliestAppointmentDate){
        //if it's earlier, we set an error message
        message.push(scheduledActivity._def.title + " commence avant " + earliestAppointmentDate.getHours().toString().padStart(2, "0") + ":" + earliestAppointmentDate.getMinutes().toString().padStart(2, "0") +" qui est l'heure d'arrivée au plus tôt du patient. ");
      }
    }
  })

  return message;
}

/**
 * @brief This function return an error message if the appointment end too late, return "" if we have no problem.
 * @param {*} listScheduledActivities list of all calendar events
 * @param {*} appointmentId appointment id require
 * @returns the error message
 */
function getMessageLatestAppointmentTime(listScheduledActivities, appointmentId){
  var message = [];

  var listeAppointments = JSON.parse(document.getElementById("listeAppointments").value.replaceAll("3aZt3r", " ")); //recover list appointments
  var appointment;
  listeAppointments.forEach((currentAppointment) => { //browse the list appointments
    if(currentAppointment.id == appointmentId){ //if we find the appointment linked to the identifier
      appointment = currentAppointment //set the appointment for get all his data
    }
  })
  let latestAppointmentDate = new Date(currentDateStr.split("T")[0] + " " + appointment.latestappointmenttime.split("T")[1]);

  listScheduledActivities.forEach((scheduledActivity) => { //browse all events
    if(scheduledActivity._def.extendedProps.appointment == appointmentId){ //if the scheduled activity is related to the appointment
      //we check if the end time is later than the latest appointment time
      if(new Date(scheduledActivity.end.getTime() - 2 * 60 * 60 * 1000) > latestAppointmentDate){
        //if it's later, we set an error message
        message.push(scheduledActivity._def.title + " finit après " + latestAppointmentDate.getHours().toString().padStart(2, "0") + ":" + latestAppointmentDate.getMinutes().toString().padStart(2, "0") +" qui est l'heure de fin au plus tard du patient. ");
      }
    }
  })

  return message;
}

/**
 * @brief This function return error messages if the delay between the scheduled activity and one of its successors was not good, 
 * return [] if we have no problem.
 * @param {*} listScheduledActivities list of all calendar events
 * @param {*} scheduledActivity scheduled activity verified
 * @returns the error message
 */
function getMessageDelay(listScheduledActivities, scheduledActivity){
  var messages = [];
  
  var listSuccessors = JSON.parse(document.getElementById("listeSuccessors").value); //recover list successors

  listSuccessors.forEach((successor) => { //browse all successors
    if(successor.idactivitya == scheduledActivity._def.extendedProps.activity){ //if the scheduled activity has a successor
      listScheduledActivities.forEach((scheduledActivityB) => { //browse all events
        if(successor.idactivityb == scheduledActivityB._def.extendedProps.activity){ //if the scheduled activity check is a successor of the scheduled activity verified
          //we check the delay between the two scheduled activities
          var duration = (scheduledActivityB.start.getTime() - scheduledActivity.end.getTime())/(60*1000);
          if(duration < successor.delaymin){
            //if the delay is shorter, we set an error message
            var message = "";
            if(duration < 0){
              duration = duration*(-1);
              if(successor.delaymin == 0){
                message = scheduledActivityB._def.title + " commence " + duration + " minutes avant la fin de " + scheduledActivity._def.title + " alors qu'elle devrait commencer après.";
              }
              else {
                message = scheduledActivityB._def.title + " commence " + duration + " minutes avant la fin de " + scheduledActivity._def.title + " alors qu'elle devrait commencer au minimum " + successor.delaymin + " minutes après.";
              }            
            }
            else{
              if(duration == 0){
                message = "Il n'y a pas de délai entre " + scheduledActivity._def.title + " et " + scheduledActivityB._def.title + " alors qu'il devrait être au minimum de " + successor.delaymin + " minutes.";
              }
              else {
                message = "Le delay entre " + scheduledActivity._def.title + " et " + scheduledActivityB._def.title + " est de " + duration + " minutes ce qui est inférieur au délai minimum de " + successor.delaymin + " minutes.";
              }
            }
            messages.push(message);
          }
          if(duration > successor.delaymax){
            //if the delay is longer, we set an error message
            var message = "Le delay entre " + scheduledActivity._def.title + " et " + scheduledActivityB._def.title + " est de " + duration + " minutes ce qui est supèrieur au délai maximum de " + successor.delaymax + " minutes.";
            messages.push(message);
          }
        }
      })
    }
  })

  return messages;
}

/**
 * @brief This function return all category related to the human resources related to the scheduled activity, 
 * return [] if we have no human resources.
 * @param {*} scheduledActivity scheduled activity verified
 * @returns the list of category human resources related to the scheduled activity
 */
function getListCategoryHumanResources(scheduledActivity){
  var listCategoryHumanResources = [];

  //recover all relation between categories and human resources
  var listCategoryOfHumanResources = JSON.parse(document.getElementById("categoryOfHumanResourceJSON").value.replaceAll("3aZt3r", " "));

  scheduledActivity._def.resourceIds.forEach((humanResource) => { //browse all resources related to the scheduled activity
    if(humanResource.substring(0,5) == "human"){ //check only the human resources
      listCategoryOfHumanResources.forEach((categoryOfHumanResource) => { //browse the relations between categories and human resources 
        if(categoryOfHumanResource.idresource == humanResource){ //if we find the category of the human resource 
          var categoryHumanResourceAlreadyExist = false;
          if(listCategoryHumanResources != []){
            listCategoryHumanResources.forEach((categoryHumanResource) => {
              if(categoryHumanResource.categoryHumanResourceId == categoryOfHumanResource.idcategory){ //if the category already exist in the list
                categoryHumanResourceAlreadyExist = true;

                //we set error messages for the quantity of human resources and if it's a wrong category
                categoryHumanResource.messageCategoryQuantity = getMessageCategoryQuantity(scheduledActivity, categoryOfHumanResource.idcategory, "human");
                categoryHumanResource.messageWrongCategory = getMessageWrongCategory(scheduledActivity, categoryOfHumanResource.idcategory, "human");
              }
            })
          }
          if(categoryHumanResourceAlreadyExist == false){ //if the category doesn't exist in the list
            //add the new category and the new human resource
            listCategoryHumanResources.push({
              categoryHumanResourceId: categoryOfHumanResource.idcategory,
              messageCategoryQuantity: getMessageCategoryQuantity(scheduledActivity, categoryOfHumanResource.idcategory, "human"),
              messageWrongCategory: getMessageWrongCategory(scheduledActivity, categoryOfHumanResource.idcategory, "human"),
            })
          }
        }
      })
    }
  })

  return listCategoryHumanResources;
}

/**
 * @brief This function return all human resources related to the scheduled activity, 
 * return [] if we have no human resources.
 * @param {*} scheduledActivity scheduled activity verified
 * @returns the list of human resources related to the scheduled activity
 */
 function getListHumanResources(scheduledActivity){
  var listHumanResources = [];

  scheduledActivity._def.resourceIds.forEach((humanResource) => { //browse all resources related to the scheduled activity
    if(humanResource.substring(0,5) == "human"){ //check only the human resources
      var humanResourceAlreadyExist = false;
      if(listHumanResources != []){
        listHumanResources.forEach((existingHumanResource) => {
          if(existingHumanResource.humanResourceId == humanResource){ //we check if the human resource is already present on the list
            humanResourceAlreadyExist = true;
            //if it's already present, we set the error messages for working hours, unavailability and if the resource is already scheduled in an other activity
            existingHumanResource.messageWorkingHours = getMessageWorkingHours(scheduledActivity, humanResource);
            existingHumanResource.messageUnavailability = getMessageUnavailability(scheduledActivity, humanResource);
            existingHumanResource.messageAlreadyScheduled = getMessageAlreadyExist(scheduledActivity, humanResource);
          }
        })
      }
      if(humanResourceAlreadyExist == false){ //if the human resource doesn't exist in the list
        //add new human resource
        listHumanResources.push({
          humanResourceId: humanResource,
          humanResourceName: getResourceTitle(humanResource),
          messageWorkingHours: getMessageWorkingHours(scheduledActivity, humanResource),
          messageUnavailability: getMessageUnavailability(scheduledActivity, humanResource),
          messageAlreadyScheduled: getMessageAlreadyExist(scheduledActivity, humanResource)
        })
      }
    }
  });

  return listHumanResources;
}

/**
 * @brief This function return all category related to the material resources related to the scheduled activity, 
 * return [] if we have no material resources.
 * @param {*} scheduledActivity scheduled activity verified
 * @returns the list of category material resources related to the scheduled activity
 */
function getListCategoryMaterialResources(scheduledActivity){
  var listCategoryMaterialResources = [];

  //recover all relation between categories and material resources
  var listCategoryOfMaterialResources = JSON.parse(document.getElementById("categoryOfMaterialResourceJSON").value.replaceAll("3aZt3r", " "));

  scheduledActivity._def.resourceIds.forEach((materialResource) => { //browse all resources related to the scheduled activity
    if(materialResource.substring(0,8) == "material"){ //check only the material resources
      listCategoryOfMaterialResources.forEach((categoryOfMaterialResource) => { //browse the relations between categories and material resources 
        if(categoryOfMaterialResource.idresource == materialResource){ //if we find the category of the human resource 
          var categoryMaterialResourceAlreadyExist = false;
          if(listCategoryMaterialResources != []){
            listCategoryMaterialResources.forEach((categoryMaterialResource) => {
              if(categoryMaterialResource.categoryMaterialResourceId == categoryOfMaterialResource.idcategory){ //if the category already exist in the list
                categoryMaterialResourceAlreadyExist = true;

                //we set error messages for the quantity of material resources and if it's a wrong category
                categoryMaterialResource.messageCategoryQuantity = getMessageCategoryQuantity(scheduledActivity, categoryOfMaterialResource.idcategory, "material");
                categoryMaterialResource.messageWrongCategory = getMessageWrongCategory(scheduledActivity, categoryOfMaterialResource.idcategory, "material");
              }
            })
          }
          if(categoryMaterialResourceAlreadyExist == false){ //if the category doesn't exist in the list
            //add the new category and the new material resource
            listCategoryMaterialResources.push({
              categoryMaterialResourceId: categoryOfMaterialResource.idcategory,
              messageCategoryQuantity: getMessageCategoryQuantity(scheduledActivity, categoryOfMaterialResource.idcategory, "material"),
              messageWrongCategory: getMessageWrongCategory(scheduledActivity, categoryOfMaterialResource.idcategory, "material")
            })
          }
        }
      })
    }
  })

  return listCategoryMaterialResources;
}

/**
 * @brief This function return all material resources related to the scheduled activity, 
 * return [] if we have no material resources.
 * @param {*} scheduledActivity scheduled activity verified
 * @returns the list of material resources related to the scheduled activity
 */
 function getListMaterialResources(scheduledActivity){
  var listMaterialResources = [];

  scheduledActivity._def.resourceIds.forEach((materialResource) => { //browse all resources related to the scheduled activity
    if(materialResource.substring(0,8) == "material"){ //check only the material resources
      var materialResourceAlreadyExist = false;
      if(listMaterialResources != []){
        listMaterialResources.forEach((existingMaterialResource) => {
          if(existingMaterialResource.materialResourceId == materialResource){ //we check if the material resource is already present on the list
            materialResourceAlreadyExist = true;
            //if it's already present, we set the error messages for working hours, unavailability and if the resource is already scheduled in an other activity
            existingMaterialResource.messageWorkingHours = getMessageWorkingHours(scheduledActivity, materialResource);
            existingMaterialResource.messageUnavailability = getMessageUnavailability(scheduledActivity, materialResource);
            existingMaterialResource.messageAlreadyScheduled = getMessageAlreadyExist(scheduledActivity, materialResource);
          }
        })
      }
      if(materialResourceAlreadyExist == false){ //if the material resource doesn't exist in the list
        //add new material resource
        listMaterialResources.push({
          materialResourceId: materialResource,
          materialResourceName: getResourceTitle(materialResource),
          messageWorkingHours: getMessageWorkingHours(scheduledActivity, materialResource),
          messageUnavailability: getMessageUnavailability(scheduledActivity, materialResource),
          messageAlreadyScheduled: getMessageAlreadyExist(scheduledActivity, materialResource)
        })
      }
    }
  });

  return listMaterialResources;
}

/**
 * @brief This function return the resource name
 * @param {*} resourceId resource identifier verified
 * @returns resource name
 */
function getResourceTitle(resourceId) {
  var listResources; 
  if(resourceId.substring(0,5) == "human"){ //set the list resources if it's a human resource
    listResources = JSON.parse(document.getElementById("human").value.replaceAll("3aZt3r", " "));
  }
  else { //set the list resources if it's a material resource
    listResources = JSON.parse(document.getElementById("material").value.replaceAll("3aZt3r", " "));
  }

  var resourceName = "undefined";

  listResources.forEach((resource) => { //browse all resources
    if(resource.id == resourceId){ //if we find the resource
      //we set the resource name
      resourceName = resource.title;
    }
  })

  return resourceName;
}

/**
 * @brief This function return an error message if the quantity of resource from the category is superior than necessary, 
 * return "" if we have no problem
 * @param {*} scheduledActivity scheduled activity verified
 * @param {*} categoryResourceId category identifier verified
 * @param {*} typeResources type of the resource : material or human
 * @returns error message
 */
function getMessageCategoryQuantity(scheduledActivity, categoryResourceId, typeResources){
  var message = "";

  if(getMessageWrongCategory(scheduledActivity, categoryResourceId, typeResources) == ""){ //we can check the quantity only if it's not awring category
    var listCategoryOfResources;
    if(typeResources == "human"){ //set the list category resources if it's a human resource
      listCategoryOfResources = JSON.parse(document.getElementById("categoryOfHumanResourceJSON").value.replaceAll("3aZt3r", " "));
    }
    else { //set the list category resources if it's a material resource
      listCategoryOfResources = JSON.parse(document.getElementById("categoryOfMaterialResourceJSON").value.replaceAll("3aZt3r", " "));
    }
    
    var categoryQuantity = 0;
    listCategoryOfResources.forEach((categoryOfResource) => { //browse all category of resources
      if(categoryOfResource.idcategory == categoryResourceId){ //if we find the good category
        scheduledActivity._def.resourceIds.forEach((scheduledActivityResource) => { //browse all resources related to the scheduled activity
          if(scheduledActivityResource == categoryOfResource.idresource){ //if the resource scheduled is from the category
            //we add to the quantity 1
            categoryQuantity++;
          }
        })
      }
    })

    if(typeResources == "human"){ //if the category type is human
      scheduledActivity._def.extendedProps.categoryHumanResource.forEach((categoryHumanResource) => { //browse all category human resources related to the scheduled activity
        if(categoryHumanResource.id == categoryResourceId){ //if it's the good category
          if(categoryHumanResource.quantity < categoryQuantity){ //if the quantity is superior of necessary
            //we set error message
            message = scheduledActivity.title + " à " + categoryQuantity + " " + categoryHumanResource.categoryname + " alors qu'il n'en suffit que de " + categoryHumanResource.quantity + " .";
          }
        }
      })
    }
    else { //if the category type is material
      scheduledActivity._def.extendedProps.categoryMaterialResource.forEach((categoryMaterialResource) => { //browse all category material resources related to the scheduled activity
        if(categoryMaterialResource.id == categoryResourceId){ //if it's the good category
          if(categoryMaterialResource.quantity < categoryQuantity){ //if the quantity is superior of necessary
            //we set error message
            message = scheduledActivity.title + " à " + categoryQuantity + " " + categoryMaterialResource.categoryname + " alors qu'il n'en suffit que de " + categoryMaterialResource.quantity + " .";
          }
        }
      })
    }
  }

  return message;
}

/**
 * @brief This function return an error message if the category of resource is not necessary, 
 * return "" if we have no problem
 * @param {*} scheduledActivity scheduled activity verified
 * @param {*} categoryResourceId category identifier verified
 * @param {*} typeResources type of the resource : material or human
 * @returns error message
 */
function getMessageWrongCategory(scheduledActivity, categoryResourceId, typeResources){
  var message = "";

  var categoryExist = false;
  var categoryName = "";
  if(typeResources == "human"){ //if the resource is human
    scheduledActivity._def.extendedProps.categoryHumanResource.forEach((categoryHumanResource) => { //browse all human resources categories
      if(categoryHumanResource.id == categoryResourceId){ //if the category exist
        //we don't set a message
        categoryExist = true;
      }
    })
    if(categoryExist == false){ //if the category doesn't exist
      var listCategoryOfResources = JSON.parse(document.getElementById("categoryOfHumanResourceJSON").value.replaceAll("3aZt3r", " "));
      listCategoryOfResources.forEach((categoryOfResource) => { //browse all category of resource
        if(categoryOfResource.idcategory == categoryResourceId){ //if we find the good category
          //set the category name
          categoryName = categoryOfResource.categoryname
        }
      })
    }
  }
  else { //if the resource is material
    scheduledActivity._def.extendedProps.categoryMaterialResource.forEach((categoryMaterialResource) => { //browse all material resources categories
      if(categoryMaterialResource.id == categoryResourceId){ //if the category exist
        //we don't set a message
        categoryExist = true;
      }
    })
    if(categoryExist == false){ //if the category doesn't exist
      var listCategoryOfResources = JSON.parse(document.getElementById("categoryOfMaterialResourceJSON").value.replaceAll("3aZt3r", " "));
      listCategoryOfResources.forEach((categoryOfResource) => { //browse all category of resource
        if(categoryOfResource.idcategory == categoryResourceId){ //if we find the good category
          //set the category name
          categoryName = categoryOfResource.categoryname
        }
      })
    }
  }

  if(categoryExist == false){ //if the category doesn't exist
    //we set the error message
    message = scheduledActivity.title + " n'a pas besoin de " + categoryName + ".";
  }

  return message;
}

/**
 * @brief This function return an error message if the ressource is unavailable during the scheduled activity, return "" if we have no problem
 * @param {*} scheduledActivity scheduled activity verified
 * @param {*} resourceId resource identifier verified
 * @returns the error message
 */
function getMessageUnavailability(scheduledActivity, resourceId){
  var message = [];

  calendar.getEvents().forEach((unavailability) => { //browse all events
    if(unavailability._def.extendedProps.type == "unavailability"){ //if events is an unavailability
      if(unavailability._def.publicId != scheduledActivity._def.publicId){
        unavailability._def.resourceIds.forEach((compareResourceId) => { //browse all resource related to the unavailability
          if(compareResourceId != "h-default" && compareResourceId != "m-default"){
            if(compareResourceId == resourceId){
              //if the resource is unavailable at the same time as the scheduled activity
              if((scheduledActivity.start > unavailability.start && scheduledActivity.start < unavailability.end) || (scheduledActivity.end > unavailability.start && scheduledActivity.end < unavailability.end) || (scheduledActivity.start <= unavailability.start && scheduledActivity.end >= unavailability.end)){
                var listResources; //set the list resources
                if(resourceId.substring(0,5) == "human"){
                  listResources = JSON.parse(document.getElementById("human").value.replaceAll("3aZt3r", " "));
                }
                else {
                  listResources = JSON.parse(document.getElementById("material").value.replaceAll("3aZt3r", " "));
                }
                listResources.forEach((resource) => { //browse the list resources
                  if(resource.id == compareResourceId){
                    //set an error message with the resource name
                    message.push(resource.title + " est indisponible sur ce créneau. ");
                  }
                })
              }
            }
          }
        })
      }
    }
  })
  return message;
}

/**
 * @brief This function return an error message if the ressource is already scheduled during the scheduled activity, return "" if we have no problem
 * @param {*} scheduledActivity scheduled activity verified
 * @param {*} resourceId resource identifier verified
 * @returns the error message
 */
function getMessageAlreadyExist(scheduledActivity, resourceId){
  var message = [];

  calendar.getEvents().forEach((compareScheduledActivity) => { //browse all events
    if(compareScheduledActivity._def.extendedProps.type != "unavailability"){ //if event is not an unavailability
      if(compareScheduledActivity._def.publicId != scheduledActivity._def.publicId){
        compareScheduledActivity._def.resourceIds.forEach((compareResourceId) => { //browse all resource related to the scheduled activity compared
          if(compareResourceId != "h-default" && compareResourceId != "m-default"){
            if(compareResourceId == resourceId){
              //if the resource is already scheduled at the same time as the scheduled activity
              if((scheduledActivity.start > compareScheduledActivity.start && scheduledActivity.start < compareScheduledActivity.end) || (scheduledActivity.end > compareScheduledActivity.start && scheduledActivity.end < compareScheduledActivity.end) || (scheduledActivity.start <= compareScheduledActivity.start && scheduledActivity.end >= compareScheduledActivity.end)){
                compareScheduledActivity._def.extendedProps.humanResources.forEach((humanResource) => { //browse the list human resources
                  if(humanResource.id == compareResourceId){ //if the resource is a human resource
                    //set an error message
                    message = message + humanResource.title + " est déjà programé sur " + compareScheduledActivity.title + ". ";
                  }
                })
                compareScheduledActivity._def.extendedProps.materialResources.forEach((materialResource) => { //browse the list material resources
                  if(materialResource.id == compareResourceId){ //if the resource is a material resource
                    //set an error message
                    message.push(materialResource.title + " est déjà programé sur " + compareScheduledActivity.title + ".");
                  }
                })
              }
            }
          }
        })
      }
    }
  })

  return message;
}

/**
 * @brief This function return an error message if the ressource is not in working hours during the scheduled activity, return "" if we have no problem
 * @param {*} scheduledActivity scheduled activity verified
 * @param {*} humanResourceId resource identifier verified
 * @returns the error message
 */
function getMessageWorkingHours(scheduledActivity, humanResourceId){
  var message = [];

  var humanResources = JSON.parse(document.getElementById("human").value.replaceAll("3aZt3r", " ")); //recover all human resources
  humanResources.forEach((resource) => { //browse all human resources
    if(resource.id == humanResourceId){
      workingHoursStart = new Date(currentDateStr.split("T")[0] + " " + resource.workingHours[0].startTime + ":00")
      workingHoursEnd = new Date(currentDateStr.split("T")[0] + " " + resource.workingHours[0].endTime + ":00")
      //if the human resource is not in working hours
      if(!(workingHoursStart <= new Date(scheduledActivity.start.getTime() - 2 * 60 * 60 * 1000) && 
      new Date(scheduledActivity.end.getTime() - 2 * 60 * 60 * 1000) <= workingHoursEnd)){
        //set an error message
        message.push(resource.title + " n'est pas en horaire de travail sur ce créneau, il risque d'y avoir un conflit.");
      }
    }
  })

  return message;
}

/**
 * Called when button 'erreurs' is clicked, display or hide the lateral-panel-bloc and call the function to update informations. 
 */
  function displayPanelErrorMessages(){
    var lateralPannelBloc=document.querySelectorAll('#'+'lateral-panel-bloc');   
    var lateralPannel=document.querySelectorAll('#'+'lateral-panel');
    var lateralPannelInput=document.getElementById('lateral-panel-input').checked;
    if(lateralPannelInput==true){                   //Test the value of the checkbox
      lateralPannelBloc[0].style.display='block';  //display the panel
      lateralPannel[0].style.width='40em';
      updatePanelErrorMessages();  //Update informations in the panel
    }
    else{
      lateralPannelBloc[0].style.display=''; //hide the pannel
      lateralPannel[0].style.width='';
    }
    
  }

  /**
   * Update the Panel of List error by removing all notifications and re-creating it with the new informations. 
   */
  function updatePanelErrorMessages(){
    var nodesNotification=document.getElementById('lateral-panel-bloc').childNodes;                             //Get the div in lateral-panel-bloc
    while(nodesNotification.length!=3){                                                                         //the 3 first div are not notifications
      document.getElementById('lateral-panel-bloc').removeChild(nodesNotification[nodesNotification.length-1]);  //Removing div 
    }
    var repertoryErrors =repertoryListErrors();                   //Get the repertory of errors 
    if(repertoryErrors.count!=0){
      updateColorErrorButton(true);                                     //Updating the color of the button "erreurs"
      //add div for unscheduled appointment
      if(listErrorMessages.messageUnscheduledAppointment.length != 0){
        var div = document.createElement('div');
        div.setAttribute('class', 'alert alert-warning');
        div.setAttribute('role','alert');
        div.setAttribute('id','notification');
        div.setAttribute('style','display: flex; flex-direction : column;'); 
        var divRow=document.createElement('divRow'); 
        divRow.setAttribute('style','display: flex; flex-direction : row;'); 
        div.append(divRow);
        listErrorMessages.messageUnscheduledAppointment.forEach((oneMessageUnscheduledAppointment) => {
          var divColumn=document.createElement('divColumn');
          div.append(divColumn); 
          var messageUnscheduledAppointment= document.createElement('earliestAppointmentDate').innerHTML='-'+oneMessageUnscheduledAppointment;  
          divColumn.append(messageUnscheduledAppointment);
        })
        document.getElementById('lateral-panel-bloc').appendChild(div);
      }

      for(let i=0; i<listErrorMessages.listScheduledAppointment.length; i++){                    //All Appointments of the day
        if(repertoryErrors.repertory.includes(i)){                      //if the Appointment[i] has an error we have to display it
          var indexAppointment=repertoryErrors.repertory.indexOf(i);    //usefull to display activities 
          var div = document.createElement('div');                      //Creating the div for the Appointment
          div.setAttribute('class', 'alert alert-warning');
          div.setAttribute('role','alert');
          div.setAttribute('id','notification');
          div.setAttribute('style','display: flex; flex-direction : column;'); 
          var divRow=document.createElement('divRow'); 
          divRow.setAttribute('style','display: flex; flex-direction : row;'); 
          div.append(divRow);
          var img = document.createElement("img");
          img.src="/img/exclamation-triangle-fill.svg"; 
          var text=document.createElement('h3'); 
          text.innerHTML=listErrorMessages.listScheduledAppointment[i].patientName + ' / '+ listErrorMessages.listScheduledAppointment[i].pathwayName; 
          divRow.append(img,text);
        
          //messageEarliestAppointmentTime
          if(listErrorMessages.listScheduledAppointment[i].messageEarliestAppointmentTime!=[]){
            listErrorMessages.listScheduledAppointment[i].messageEarliestAppointmentTime.forEach((messageEarliest) => {
              var divColumn=document.createElement('divColumn');
              div.append(divColumn); 
              var messageEarliestAppointmentTime= document.createElement('earliestAppointmentDate').innerHTML='-'+messageEarliest;  
              divColumn.append(messageEarliestAppointmentTime);
              var space=document.createElement('space');
              space.innerHTML='</br>';
              div.append(space);
            })
          }

          //messageLatestAppointmentTime
          if(listErrorMessages.listScheduledAppointment[i].messageLatestAppointmentTime!=[]){
            listErrorMessages.listScheduledAppointment[i].messageLatestAppointmentTime.forEach((messageLatest) => {
              var divColumn=document.createElement('divColumn');
              div.append(divColumn); 
              var messageLatestAppointmentTime= document.createElement('messageLatestAppointmentTime').innerHTML='-'+messageLatest;  
              divColumn.append(messageLatestAppointmentTime);
              var space=document.createElement('space');
              space.innerHTML='</br>';
              div.append(space);
            })
          }
          
          //for each ScheduledActivity in Appointment 
          for(let listeSAiterator=0; listeSAiterator<listErrorMessages.listScheduledAppointment[i].listScheduledActivity.length; listeSAiterator++){
            if(repertoryErrors.repertoryAppointmentSAError[indexAppointment].repertorySA.includes(listeSAiterator)){          //Testing if there are errors on this Activity
              var divColumn=document.createElement('divColumn');
              divColumn.setAttribute('style','font-weight: bolder;')
              div.append(divColumn); 
              var nameSA=listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].scheduledActivityName+' : ';        //Display Activity Name 
              divColumn.append(nameSA); 
              
              //messageDelay
              if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].messageDelay!=[]){
                listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].messageDelay.forEach((oneMessageDelay) => {
                  var divColumn=document.createElement('divColumn');
                  div.append(divColumn); 
                  var messageDelay= document.createElement('messageDelay').innerHTML='-'+oneMessageDelay;  
                  divColumn.append(messageDelay);
                })
              }

              //foreach CategoryHumanResources in ScheduledActivity
              for(let listCategoryHumanResourcesItorator=0;listCategoryHumanResourcesItorator<listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryHumanResources.length; listCategoryHumanResourcesItorator++){
                
                //messageCategoryQuantity
                if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryHumanResources[listCategoryHumanResourcesItorator].messageCategoryQuantity!=''){
                  var divColumn=document.createElement('divColumn');
                  div.append(divColumn); 
                  var messageCategoryQuantity= document.createElement('messageCategoryQuantity').innerHTML='-'+listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryHumanResources[listCategoryHumanResourcesItorator].messageCategoryQuantity;  
                  divColumn.append(messageCategoryQuantity);
                }

                //messageWrongCategory
                if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryHumanResources[listCategoryHumanResourcesItorator].messageWrongCategory!=''){
                  var divColumn=document.createElement('divColumn');
                  div.append(divColumn);
                  var messageWrongCategory= document.createElement('messageWrongCategory').innerHTML='-'+listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryHumanResources[listCategoryHumanResourcesItorator].messageWrongCategory;  
                  divColumn.append(messageWrongCategory);
                }
              }

              //foreach HumanResources
              for(let listHumanResourcesIterator=0; listHumanResourcesIterator<listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listHumanResources.length; listHumanResourcesIterator++ ){
                  
                //messageWorkingHours
                if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listHumanResources[listHumanResourcesIterator].messageWorkingHours!=[]){
                  listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listHumanResources[listHumanResourcesIterator].messageWorkingHours.forEach((oneMessageWorkingHours) => {
                    var divColumn=document.createElement('divColumn');
                    div.append(divColumn);
                    var messageWorkingHours= document.createElement('messageWorkingHours').innerHTML='-'+oneMessageWorkingHours;  
                    divColumn.append(messageWorkingHours);
                  })
                }


                //messageUnavailability
                if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listHumanResources[listHumanResourcesIterator].messageUnavailability!=[]){
                  listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listHumanResources[listHumanResourcesIterator].messageUnavailability.forEach((oneMessageUnavailability) => {
                    var divColumn=document.createElement('divColumn');
                    div.append(divColumn);
                    var messageUnavailability= document.createElement('messageUnavailability').innerHTML='-'+oneMessageUnavailability;  
                    divColumn.append(messageUnavailability);
                  })
                }

                //messageAlreadyScheduled
                if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listHumanResources[listHumanResourcesIterator].messageAlreadyScheduled!=[]){
                  listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listHumanResources[listHumanResourcesIterator].messageAlreadyScheduled.forEach((oneMessageAlreadyScheduled) => {
                    var divColumn=document.createElement('divColumn');
                    div.append(divColumn);
                    var messageAlreadyScheduled= document.createElement('messageAlreadyScheduled').innerHTML='-'+oneMessageAlreadyScheduled;  
                    divColumn.append(messageAlreadyScheduled);
                  })
                }
              }
              
              //foreach MaterialResourcesCategory in ScheduledActivity
              for(let listCategoryMaterialResourcesItorator=0;listCategoryMaterialResourcesItorator<listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryMaterialResources.length; listCategoryMaterialResourcesItorator++){
               
                //messageCategoryQuantity
                if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryMaterialResources[listCategoryMaterialResourcesItorator].messageCategoryQuantity!=''){
                  var divColumn=document.createElement('divColumn');
                  div.append(divColumn);
                  var messageCategoryQuantity= document.createElement('messageCategoryQuantity').innerHTML='-'+listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryMaterialResources[listCategoryMaterialResourcesItorator].messageCategoryQuantity;  
                  divColumn.append(messageCategoryQuantity);
                }

                //messageWrongCategory
                if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryMaterialResources[listCategoryMaterialResourcesItorator].messageWrongCategory!=''){
                  var divColumn=document.createElement('divColumn');
                  div.append(divColumn);
                  var messageWrongCategory= document.createElement('messageWrongCategory').innerHTML='-'+listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryMaterialResources[listCategoryMaterialResourcesItorator].messageWrongCategory;  
                  divColumn.append(messageWrongCategory);
                }
              }

              //foreach MaterialResources 
              for(let listMaterialResourcesIterator=0; listMaterialResourcesIterator<listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listMaterialResources.length; listMaterialResourcesIterator++ ){
                  
                //messageUnavailability
                if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listMaterialResources[listMaterialResourcesIterator].messageUnavailability!=[]){
                  listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listMaterialResources[listMaterialResourcesIterator].messageUnavailability.forEach((oneMessageUnavailability) => {
                    var divColumn=document.createElement('divColumn');
                    div.append(divColumn);
                    var messageUnavailability= document.createElement('messageUnavailability').innerHTML='-'+oneMessageUnavailability;  
                    divColumn.append(messageUnavailability);
                  })
                }

                //messageAlreadyScheduled
                if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listMaterialResources[listMaterialResourcesIterator].messageAlreadyScheduled!=[]){
                  listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listMaterialResources[listMaterialResourcesIterator].messageAlreadyScheduled.forEach((oneMessageAlreadyScheduled) => {
                    var divColumn=document.createElement('divColumn');
                    div.append(divColumn);
                    var messageAlreadyScheduled= document.createElement('messageAlreadyScheduled').innerHTML='-'+oneMessageAlreadyScheduled;  
                    divColumn.append(messageAlreadyScheduled);
                  })
                }
              }

              if(repertoryErrors.repertoryAppointmentSAError[indexAppointment].repertorySA.indexOf(listeSAiterator)!=repertoryErrors.repertoryAppointmentSAError[indexAppointment].repertorySA.length-1){
                var space=document.createElement('space'); //skip to line if there is an error in another activity in this appointment
                space.innerHTML='</br>';
                div.append(space);
              }
            } 
          }
          document.getElementById('lateral-panel-bloc').appendChild(div); //Append all the messages into the lateral-panel-bloc
        }
      }
    }
    else{     //No errors
       var div = document.createElement('div');
       div.setAttribute('class', 'alert alert-success');
       div.setAttribute('role','alert'); 
       div.setAttribute('style','text-align: center');
       var message= document.createElement('message').innerHTML="Aucune erreur détectée.";  //Display 'no error' message
       div.append(message);
       document.getElementById('lateral-panel-bloc').appendChild(div);

      updateColorErrorButton(false);  //Update color of the button                                                    
    }
  }

  /**
   * This function count the number of Appointments with errors and get the Activities repertory of errors, used only in updatePanelErrorMessages()
   * @returns count is the number of Apppointments with errors
   * @returns repertory is the repertory of Appointments with errors, usefull to display Appointments 
   * @returns repertoryAppointmentSAError is the repertory of ScheduledActivites with error for an appointment, usefull to display ScheduledActivities. 
   */
  function repertoryListErrors(){
    var countAppointmentError=0; 
    var repertoryAppointmentError=[]; 
    var repertoryAppointmentSAError=[]; 
    if(listErrorMessages.messageUnscheduledAppointment != []){
      listErrorMessages.messageUnscheduledAppointment.forEach((message) => {
        countAppointmentError++;
      })
    }
    for(let i=0; i<listErrorMessages.listScheduledAppointment.length; i++){
      var errorInappointment=false; 

      //messageEarliestAppointmentTime
      if(listErrorMessages.listScheduledAppointment[i].messageEarliestAppointmentTime!=''){
        errorInappointment=true; 
      }

      //messageLatestAppointmentTime
      if(listErrorMessages.listScheduledAppointment[i].messageLatestAppointmentTime!=''){
        errorInappointment=true;
      }
      
      //foreach ScheduledActivity in appointment
      var repertorySAError=[]; 
      for(let listeSAiterator=0; listeSAiterator<listErrorMessages.listScheduledAppointment[i].listScheduledActivity.length; listeSAiterator++){
          var errorInScheduledActivity=false; 

          //messageDelay
          if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].messageDelay!=''){
            errorInappointment=true;
            errorInScheduledActivity=true; 
          }

          //foreach CategoryhumanResources in ScheduledActivity
          for(let listCategoryHumanResourcesItorator=0;listCategoryHumanResourcesItorator<listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryHumanResources.length; listCategoryHumanResourcesItorator++){
            
            //messageCategoryQuantity
            if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryHumanResources[listCategoryHumanResourcesItorator].messageCategoryQuantity!=''){
              errorInappointment=true;
              errorInScheduledActivity=true;
            }

            //messageWrongCategory
            if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryHumanResources[listCategoryHumanResourcesItorator].messageWrongCategory!=''){
              errorInappointment=true;
              errorInScheduledActivity=true;
            }
          }

          //foreach HUmanResources 
          for(let listHumanResourcesIterator=0; listHumanResourcesIterator<listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listHumanResources.length; listHumanResourcesIterator++ ){
            if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listHumanResources[listHumanResourcesIterator].messageWorkingHours!=''){
              errorInappointment=true;
              errorInScheduledActivity=true;
            }

            //messageUnavailability
            if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listHumanResources[listHumanResourcesIterator].messageUnavailability!=''){
              errorInappointment=true;
              errorInScheduledActivity=true;
            }

            //messageAlreadyScheduled
            if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listHumanResources[listHumanResourcesIterator].messageAlreadyScheduled!=''){
              errorInappointment=true;
              errorInScheduledActivity=true;
            }
          }
          
          //foreach CategoryMaterialResources in ScheduledActivity
          for(let listCategoryMaterialResourcesItorator=0;listCategoryMaterialResourcesItorator<listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryMaterialResources.length; listCategoryMaterialResourcesItorator++){
            
            //messageCategoryQuantity
            if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryMaterialResources[listCategoryMaterialResourcesItorator].messageCategoryQuantity!=''){
              errorInappointment=true;
              errorInScheduledActivity=true;
            }

            //messageWrongCategory
            if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listCategoryMaterialResources[listCategoryMaterialResourcesItorator].messageWrongCategory!=''){
              errorInappointment=true;
              errorInScheduledActivity=true;
            }
          }

          //foreach MaterialResource
          for(let listMaterialResourcesIterator=0; listMaterialResourcesIterator<listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listMaterialResources.length; listMaterialResourcesIterator++ ){
              
            //messageUnavailability
            if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listMaterialResources[listMaterialResourcesIterator].messageUnavailability!=''){
              errorInappointment=true;
              errorInScheduledActivity=true;
            }

            //messageAlreadyScheduled
            if(listErrorMessages.listScheduledAppointment[i].listScheduledActivity[listeSAiterator].listMaterialResources[listMaterialResourcesIterator].messageAlreadyScheduled!=''){
              errorInappointment=true; 
              errorInScheduledActivity=true;
            }
          }

          if(errorInScheduledActivity==true){         //if true there is an error in the ScheduledActivity
            repertorySAError.push(listeSAiterator); 
          }
        }
        if(errorInappointment==true){               //if true there is an error in the appointment
          countAppointmentError++; 
          repertoryAppointmentError.push(i);
          repertoryAppointmentSAError.push({appointment:i,repertorySA:repertorySAError});

        }
    }
  return {count:countAppointmentError,repertory:repertoryAppointmentError,repertoryAppointmentSAError:repertoryAppointmentSAError}; 
}

/**
 * This function changes dynamically the color and color of the text for the label 'erreurs'.  
 * @param state boolean, give the information to know what is the apropriate color for the situation
 */
function updateColorErrorButton(state) {
  var button=document.getElementById('lateral-panel-label');  //Get the label
  switch(state){
    case true : 
    button.setAttribute('style','background : indianred; color :white');  //one or more error(s)
    break; 
  case false : 
    button.setAttribute('style','background : white; color : indianred')  //zero error
}
    
}

