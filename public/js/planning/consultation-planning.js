var calendar;
var datepicker;
var date=new Date();
var dateStr=date.toDateString();
var headerResources="Patients";
const height = document.querySelector('div').clientHeight

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}
var dateStr=($_GET('date'))
var date=new Date(dateStr);

document.addEventListener('DOMContentLoaded', function() 
{
  createCalendar();
});


function changeDate(){
  console.warn(document.getElementById("Date").value)
  var jsDate=new Date(document.getElementById("Date").value)
  if (day<10){day="0"+day;}
  var month=calendar.getDate().getMonth()+1;
  if (month<10){month="0"+month;}
  var year=jsDate.getFullYear();
  date=new Date(year,month,day);
  dateStr=year+"-"+month+"-"+day+"T12:00:00";
  window.location.assign("/ConsultationPlanning?date="+dateStr);
}

function changePlanning(){
  var selectedItem = document.getElementById("displayList");
    headerResources=document.getElementById("displayList").options[document.getElementById('displayList').selectedIndex].text;
    createCalendar();
}
    

function modify(){
  var temp = new Date
  if(temp.getDate()==date.getDate() && temp.getMonth()==date.getMonth() && temp.getFullYear()==date.getFullYear()){var day=calendar.getDate().getDate();}
  else {var day=calendar.getDate().getDate();}
  if (day<10){day="0"+day;}
  var month=calendar.getDate().getMonth()+1;
  if (month<10){month="0"+month;}
  var year=calendar.getDate().getFullYear();
  dateStr=year+"-"+month+"-"+day+"T12:00:00";
  window.location.assign("/ModificationPlanning?date="+dateStr);
}

function filterShow(){
  if(document.getElementById("filterId").style.display != "none"){
    document.getElementById("filterId").style.display = "none";
  } else {
    document.getElementById("filterId").style.display = "inline-block";
  }
}


function createCalendar(){
  console.log("test")
  console.log(document.getElementById("date").value)
  if(document.getElementById("date").value!=null){
    dateStr=document.getElementById("date").value
  }
  date=new Date(dateStr)
  var resources=document.getElementById('resources').value.replaceAll("3aZt3r", " ");   
  var resourcearray=JSON.parse(resources); 
  console.log(resourcearray); 
  var calendarEl = document.getElementById('calendar');

  calendar=new FullCalendar.Calendar(calendarEl, 
    {
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        initialView: 'resourceTimelineDay',
        slotDuration: '00:20:00',
        locale: 'fr',
        timeZone: 'Europe/Paris',
        selectable: true,
        selectHelper: true,
        editable: false,
        contentHeight: height*3/4,
        handleWindowResize: true,
        eventDurationEditable: false,
        nowIndicator: true,

        slotLabelFormat: { //modifie l'affichage des heures de la journée
            hour: '2-digit', //2-digit, numeric
            minute: '2-digit', //2-digit, numeric
            meridiem: false, //lowercase, short, narrow, false (display of AM/PM)
            hour12: false //true, false
          },
        resourceOrder: 'title',
        resourceAreaWidth: '20%',
        resourceAreaHeaderContent: headerResources,
        resources: resourcearray,
        events:[
            {
             id: "1", 
             resourceId: "a", 
             start: "2022-06-21 12:00:00", 
             end: "2022-06-21 17:30:00", 
             title: "event 1",
             color:'rgb(255,255,0)',
             textColor:'#000',
             textFont:'Trebuchet MS'
            }
            ]
    },
    );
    
    calendar.gotoDate(date);
    calendar.render();
}
