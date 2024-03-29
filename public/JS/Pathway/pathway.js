//const { get } = require("core-js/core/dict");

var NB_ACTIVITY = 0;
var autocompleteArray = new Array()

var HUMAN_RESOURCE_CATEGORIES // liste des categories de ressources humaines
var MATERIAL_RESOURCE_CATEGORIES // liste des categories de ressources materielles 
var RESOURCES_BY_ACTIVITIES = new Array()

var ACTIVITY_IN_PROGRESS // permet de stocker l'activité qui est en cours de création / d'édition 
var ID_EDITED_ACTIVITY
var IS_EDIT_MODE = false

var ID_ACTIVITY_PREDECESSOR = -1;
var NAME_ACTIVITY_PREDECESSOR = '';
var NB_SUCCESSOR= 0;
var SUCCESSORS = new Array();
var lines= new Array(); 
var VALIDATE = 0;
var ARROWS_HIDDEN = 0;
var ACTIVITY_POSITION = new Array();

var PATHWAY_APPOINTMENTS = new Object()        
PATHWAY_APPOINTMENTS.scheduledAppointments = new Array()


/**
 * Allows to filter pathways
 */
function filterPathway(selected=null){
    if(selected.id!="notfound"){
        var trs = document.querySelectorAll('#tablePathway tr:not(.headerPathway)');
        for(let i=0; i<trs.length; i++){
                trs[i].style.display='none';
        }
        table=document.getElementById('pathwayTable');
        var tr=document.createElement('tr');
        table.appendChild(tr);
        var pathwayName=document.createElement('td');
        pathwayName.append(selected.value);
        tr.appendChild(pathwayName);
        var buttons=document.createElement('td');
        var infos=document.createElement('button');
        infos.setAttribute('class','btn-infos btn-secondary');
        infos.setAttribute('onclick','showInfosPathway('+selected.id+',"'+selected.value+'")');
        infos.append('Informations');
        var formEdit=document.createElement('form');
        formEdit.setAttribute('action','/pathway/edit/'+selected.id);
        formEdit.setAttribute('style','display:inline');
        formEdit.setAttribute('method','GET');
        formEdit.setAttribute('id','formEdit'+selected.id);
        var edit=document.createElement('button');
        edit.setAttribute('class','btn-edit btn-secondary');
        edit.setAttribute('type','submit');
        edit.append('Editer');
        formEdit.appendChild(edit);
        var deleteButton=document.createElement('button');
        deleteButton.setAttribute('class','btn-delete btn-secondary');
        deleteButton.append('Supprimer');
        deleteButton.setAttribute('onclick', onclick='verifyScheduledAppointments(' + selected.id + ')');
        buttons.appendChild(infos);
        buttons.appendChild(formEdit);
        buttons.appendChild(deleteButton)
        tr.appendChild(buttons);
        paginator=document.getElementById('paginator');
        paginator.style.display='none';
    }
  }

/**
 * Allows to display all pathways without any filter
 */
function displayAll() {
    var trs = document.querySelectorAll('#tablePathway tr:not(.headerPathway)');
    var input = document.getElementById('autocompleteInputPathwayNname');
    if(input.value == ''){
        for(let i=0; i<trs.length; i++){
            if(trs[i].style.display == 'none'){
                trs[i].style.display='table-row';
            }
            else if(trs[i].className != 'original'){
                trs[i].remove()
            }
        }
        paginator=document.getElementById('paginator');
        paginator.style.display='';
    }
}

/**
 * Init a modal and open it
 * Called via the button "Graphique"
 */
function showActivitiesPathway() {
    VALIDATE = 0;
    document.getElementById('title-pathway-activities').innerHTML = "Lier les activités";
    drawActivitiesGraph();
    fillSuccessorList();
    drawArrows();
    
    $('#edit-pathway-modal-activities').modal("show");
}

/**
 * Delete the successors and hide the modal
 * Called when the user clicks outside the modal or on the "Annuler" button
 */
function hideActivitiesPathway(){
    if(SUCCESSORS.length != 0){
        lines.forEach((l) => {
            l.hide('none')
        });
        $('#popup-quit-successor').modal("show");
    }
    else{
        deleteSuccessors();
        var divContent = document.getElementById('divContent');
        var activities = divContent.getElementsByClassName("pathway-div-activity-graph");
        for(i = 0; i < activities.length; i++){
            activities[i].style.display = 'none';
        }
        $('#edit-pathway-modal-activities').modal("hide");
    }
}

function quitModalSuccessor(quit){
    if(quit){
        deleteSuccessors();
        var divContent = document.getElementById('divContent');
        var activities = divContent.getElementsByClassName("pathway-div-activity-graph");
        for(i = 0; i < activities.length; i++){
            activities[i].style.display = 'none';
        }
        $('#popup-quit-successor').modal('hide');
        $('#edit-pathway-modal-activities').modal("hide");
    }
    else{
        lines.forEach((l) => {
            l.show()
        });
        $('#edit-pathway-modal-activities').modal('show');
    }
    $('#popup-quit-successor').modal('hide');
}

/**
 * Create a div for each activity in RESOURCES_BY_ACTIVITIES
 * More informations about the div in createActivitiesGraph() function
 */
function drawActivitiesGraph(){
    var divContent = document.getElementById('divContent');
    divContent.innerHTML = ""
    
    for (i = 0; i < RESOURCES_BY_ACTIVITIES.length; i++) {
        rba = RESOURCES_BY_ACTIVITIES[i];
        if (rba.available) {
            drawn = false;
            for(j = 0; j < ACTIVITY_POSITION.length; j++){
                if(ACTIVITY_POSITION[j].id == "activity" + (i+1)){
                    drawn = true;
                    createActivitiesGraph(rba.activityname, i + 1, rba.activityduration, ACTIVITY_POSITION[j].top, ACTIVITY_POSITION[j].left);
                }
            }
            if(!drawn){
                drawn = false
                createActivitiesGraph(rba.activityname, i + 1, rba.activityduration, (Math.floor(i/5)*18 + 5) + "%", (i%5)*15 + "%");
            }
        }
    }
}

/**
 * Create a draggable div with the activity parameters
 * @param {name of the activity} name
 * @param {index of the activity in RESOURCES_BY_ACTIVITIES, not the activity id in database} idActivity
 * @param {duration of the activity} activity
 * Each activity is linked with event listeners to create links via double click on them
 */
function createActivitiesGraph(name, idActivity, duration, top, left){
    var divContent = document.getElementById('divContent');

    var div = document.createElement('DIV');
    div.setAttribute('id', 'activity'+ idActivity);
    div.classList.add("pathway-div-activity-graph");
    div.style.top = top
    div.style.left = left;

    var divHeader = document.createElement('div');
    divHeader.classList.add("pathway-div-activity-header");
    divHeader.innerHTML = name;

    var p = document.createElement('p');
    p.style.fontSize = '80%';
    p.innerHTML = "durée : " + duration + "min"; 

    div.appendChild(divHeader); div.appendChild(p);
    divContent.appendChild(div);
    
    $(".pathway-div-activity-graph").draggable({
        containment: "#divContent",
    });

    document.getElementById('edit-pathway-modal-activities').addEventListener('scroll', AnimEvent.add(function() {
        lines.forEach((l) => {
        if(l.start == div || l.end == div){
            l.position();
        }
        }); 
    }), false);

    // If the activity is dragged, update the line position
    // The AnimEvent library is here to optimize, because mousemove is fired hundreds or thousands times
    div.addEventListener('mousemove', AnimEvent.add(function() {  
        lines.forEach((l) => {
            if(l.start == div || l.end == div){
                l.position();
            }
          });
    }), false);

    // If the modal is scrolled, update all line positions
    div.addEventListener('scroll', AnimEvent.add(function() {
        lines.forEach((l) => {
            if(l.start == div || l.end == div){
                l.position();
            }
          });
    }), false);

    /**
     * On the first double click event, the id and name of the clicked activty is stored
     * On the second one, a link is created except if :
     * - This is the same activity 
     * - The link already exists
     * - The opposite link already exists 
     * In all cases, the stored variables are reset
     */
    div.addEventListener('dblclick', function (e) {
        if(ID_ACTIVITY_PREDECESSOR != -1){
            errorLine = false;
            if(ID_ACTIVITY_PREDECESSOR == div.id){
                errorLine = true;
                alert("Vous ne pouvez pas lier une activité à elle-même !");
            }
            start = document.getElementById(ID_ACTIVITY_PREDECESSOR);
            end = document.getElementById(div.id);
            for(i = 0; i < NB_SUCCESSOR; i++){
                if(SUCCESSORS[i].idActivityA == start.id && SUCCESSORS[i].idActivityB == end.id){
                    alert('Ce lien est déjà créé !')
                    errorLine = true;
                }
                if(SUCCESSORS[i].idActivityA == end.id && SUCCESSORS[i].idActivityB == start.id){
                    alert("Un lien existe déjà dans l'autre sens, veuillez le supprimer avant d'en ajouter un autre.")
                    errorLine = true;
                }
            }
            if(!errorLine){
                l = new LeaderLine(start, end, {color: '#0dac2d', middleLabel: "Lien n°" + (NB_SUCCESSOR+1)});

                lines.push(l);
                addArraySuccessor(ID_ACTIVITY_PREDECESSOR, div.id, NAME_ACTIVITY_PREDECESSOR, name);
                ID_ACTIVITY_PREDECESSOR = -1;
            }
            else{
                ID_ACTIVITY_PREDECESSOR = -1;
                NAME_ACTIVITY_PREDECESSOR = '';
            }
        }
        else{
            ID_ACTIVITY_PREDECESSOR = div.id;
            NAME_ACTIVITY_PREDECESSOR = name;
        }
    });

    // mouseenter and mouseleave events are here to change color of links that are connected with the hovered activity
    div.addEventListener('mouseenter', () => {
        lines.forEach((l) => {
            if(l.start == div){
                l.show();
                l.color = 'red';
            }
            if(l.end == div){
                l.show();
                l.color = 'blue';
            }
        }); 
    });
      
    div.addEventListener('mouseleave', () => {
        lines.forEach((l) => {
            l.color = '#0dac2d';
            if(ARROWS_HIDDEN){
                l.hide();
            }
        }); 
    });
}

/**
 * For each stored successors, draws the line between activityA and activityB
 */
function drawArrows(){  
    for(i = 0; i < NB_SUCCESSOR; i++){
        start = document.getElementById(SUCCESSORS[i].idActivityA);
        end = document.getElementById(SUCCESSORS[i].idActivityB);
       
        l = new LeaderLine(start, end, {color: '#0dac2d', middleLabel: "Lien n°" + (i+1)});
        lines.push(l);
    }
}

/**
 * Allows to show arrows in the pathway graph
 */
function showArrows(){
    ARROWS_HIDDEN = 0;
    lines.forEach((l) => {
        l.show('draw');
    });
    document.getElementById("btn-show-arrows").setAttribute("onclick", "hideArrows()");
}

/**
 * Allows to hide arrows in the pathway graph
 */
function hideArrows(){
    ARROWS_HIDDEN = 1;
    lines.forEach((l) => {
        l.hide('draw');
    });
    document.getElementById("btn-show-arrows").setAttribute("onclick", "showArrows()");
}

/**
 * Fill the SUCCESSORS array and update the list on the right
 * @param {id of the div containing activityA (activity1, activity12,...)} idA 
 * @param {id of the div containing activityB (activity2, activity13,...)} idB 
 * @param {name of activityA} nameA 
 * @param {name of activityB} nameB 
 */
function addArraySuccessor(idA, idB, nameA, nameB) {
    let len = SUCCESSORS.length

    SUCCESSORS[len] = new Object()
    SUCCESSORS[len].idActivityA = idA;
    SUCCESSORS[len].idActivityB = idB;

    SUCCESSORS[len].nameActivityA = nameA;
    SUCCESSORS[len].nameActivityB = nameB;

    SUCCESSORS[len].delayMin = 0;
    SUCCESSORS[len].delayMax = 10;

    NB_SUCCESSOR++;
    fillSuccessorList();
}

/**
 * Fill the list of successors/links on the right of the modal
 */
function fillSuccessorList() {
    let divSuccessorsList = document.getElementById('list-graph')
    divSuccessorsList.innerHTML = ''

    for (let indexSuccessor = 0; indexSuccessor < SUCCESSORS.length; indexSuccessor++) {
        let successor = document.createElement('div')
        successor.setAttribute('class', 'div-activity')
        successor.setAttribute('id', 'link-' + indexSuccessor);
        let idA = document.createElement('input');
        idA.setAttribute('type', 'hidden');
        idA.setAttribute('value', SUCCESSORS[indexSuccessor].idActivityA);
        let idB = document.createElement('input');
        idB.setAttribute('type', 'hidden');
        idB.setAttribute('value', SUCCESSORS[indexSuccessor].idActivityB);
        successor.appendChild(idA); successor.appendChild(idB);
        let str = "Lien n°" + (indexSuccessor+1);
        let p = document.createElement('p')
        p.innerHTML = str

        let imgDelete = new Image();
        imgDelete.src = '../img/delete.svg';
        imgDelete.setAttribute('id', 'succ_imgd-' + indexSuccessor);
        imgDelete.setAttribute('onclick', 'deleteSuccessor('+ indexSuccessor + ')');
        imgDelete.setAttribute('title', 'Supprimer le lien');
        imgDelete.style.width = '20px';
        imgDelete.style.cursor = 'pointer';

        let imgDownArrow = new Image();
        imgDownArrow.src = '../img/chevron_down.svg';
        imgDownArrow.setAttribute('id', 'succ_imgdown-' + indexSuccessor);
        imgDownArrow.setAttribute('onclick', 'showDelay('+indexSuccessor+')');
        imgDownArrow.setAttribute('title', 'Montrer les délais');
        imgDownArrow.style.width = '20px';
        imgDownArrow.style.cursor = 'pointer';

        let divMin = document.createElement('div')
        divMin.setAttribute('id', 'divMin' + (indexSuccessor))

        let labelMin = document.createElement('label');
        labelMin.classList.add("label");
        labelMin.innerHTML = "Délai min (minutes) : ";
        labelMin.style.width = "70%";

        let inputMin = document.createElement('input');
        inputMin.setAttribute('id', 'delayMinInput' + (indexSuccessor+1));
        inputMin.setAttribute('type', 'number');
        inputMin.setAttribute('min', 0);
        inputMin.setAttribute('step', 1);
        inputMin.setAttribute('value', 0);
        inputMin.style.width = "30%";

        divMin.appendChild(labelMin);
        divMin.appendChild(inputMin);
        divMin.style.display = "block";

        let divMax = document.createElement('div')
        divMax.setAttribute('id', 'divMax' + (indexSuccessor))

        let labelMax = document.createElement('label');
        labelMax.classList.add("label");
        labelMax.innerHTML = "Délai max (minutes) : ";
        labelMax.style.width = "70%"

        let inputMax = document.createElement('input');
        inputMax.setAttribute('id', 'delayMaxInput' + (indexSuccessor+1));
        inputMax.setAttribute('type', 'number');
        inputMax.setAttribute('min', 0);
        inputMax.setAttribute('step', 1);
        inputMax.setAttribute('value', 360);
        inputMax.style.width = "30%"

        divMax.appendChild(labelMax);
        divMax.appendChild(inputMax);
        divMax.style.display = "block";

        let divButton = document.createElement('div')
        divButton.appendChild(imgDelete)
        divButton.appendChild(imgDownArrow)

        successor.appendChild(p);
        successor.appendChild(divButton);

        let divSuccessor = document.createElement('div');
        divSuccessor.classList.add("div-successor")

        divSuccessor.appendChild(successor);
        divSuccessor.appendChild(divMin);
        divSuccessor.appendChild(divMax);

        divSuccessorsList.appendChild(divSuccessor);

        // mouseenter and mouseleave events are here to highlight the arrow corresponding to the hovered successor
        divSuccessor.addEventListener('mouseenter', () => {
            start = document.getElementById(SUCCESSORS[indexSuccessor].idActivityA)
            end = document.getElementById(SUCCESSORS[indexSuccessor].idActivityB)
            lines.forEach((l) => {
                if(l.start == start && l.end == end){
                    l.color = 'red';
                    l.size = l.size*2;
                    l.show();
                }
            }); 
        });
            
        divSuccessor.addEventListener('mouseleave', () => {
            lines.forEach((l) => {
                if(ARROWS_HIDDEN){
                    l.hide();
                }
                l.color = '#0dac2d';
                l.size = 4;
            }); 
        });
    }
    if (SUCCESSORS.length == 0) {
        let nosuccessor = document.createElement('p');
        nosuccessor.innerHTML = "Aucun lien pour le moment !";
        nosuccessor.style.marginLeft ="10px";
        divSuccessorsList.appendChild(nosuccessor);
    }
}

/**
 * Show the successor delays
 * @param {Index of the successor in SUCCESSORS array} id
 * called by the down arrow
 */
 function showDelay(id) {
    divMin = document.getElementById('divMin' + id);
    divMax = document.getElementById('divMax' + id);

    divMin.style.display = "block";
    divMax.style.display = "block";

    button = document.getElementById('succ_imgdown-' + id);
    button.src = '/img/chevron_up.svg'
    button.title = 'Cacher les délais'
    button.setAttribute('onclick', 'hideDelay(' + id + ')');
}

/**
 * Hide the successor delays
 * @param {Index of the successor in SUCCESSORS array} id
 * called by the up arrow
 */
function hideDelay(id) {
    divMin = document.getElementById('divMin' + id);
    divMax = document.getElementById('divMax' + id);

    divMin.style.display = "none";
    divMax.style.display = "none";

    button = document.getElementById('succ_imgdown-' + id);
    button.src = '/img/chevron_down.svg'
    button.title = 'Montrer les délais'
    button.setAttribute('onclick', 'showDelay(' + id + ')');
}

/**
 * Allows to show delays of activities of the pathway
 */
function showDelays() {
    delayButton = document.getElementById('succ_imgdown')
    if(delayButton.src.includes('/img/chevron_down.svg')){
        delayButton.src = '/img/chevron_up.svg'
        delayButton.title = 'Cacher tous les délais'
        for(i = 0; i < NB_SUCCESSOR; i++){
            showDelay(i);
        }
    }
    else{
        delayButton.src = '/img/chevron_down.svg'
        delayButton.title = 'Montrer tous les délais'
        for(i = 0; i < NB_SUCCESSOR; i++){
            hideDelay(i);
        }
    }
}

/**
 * Delete the given successor, and update the list
 * @param {Index of the successor in SUCCESSORS array} id 
 */
function deleteSuccessor(id) {
    let divSuccessor = document.getElementById('link-' + id);
    let inputs = divSuccessor.getElementsByTagName('input');

    for(i = 0; i < lines.length; i++){
        idA = inputs[0].value;
        idB = inputs[1].value;
        if (lines[i].start == document.getElementById(idA) && lines[i].end == document.getElementById(idB)){
            lines[i].remove();
            lines.splice(i, 1);
        }
    }

    for(i = 0; i < lines.length; i++){
        lines[i].middleLabel="Lien n°" + (i+1);
    }

    NB_SUCCESSOR--;
    SUCCESSORS.splice(id, 1);
    
    fillSuccessorList();
}

/**
 * Delete all successors and arrows
 */
function deleteSuccessors(){
    NB_SUCCESSOR = 0;
    SUCCESSORS = new Array();
    deleteArrows();
    fillSuccessorList();
}

/**
 * Delete all links
 */
function deleteArrows(){
    for (var l of lines) {
        l.remove();
    }
    lines = new Array();
}

/**
 * Check if the successors are correct (no loop for example)
 * If so, close the successors modal
 * else, display an error while the problem is not fixed
 */
function validateSuccessors(){
    error = checkSuccessor();
    switch(error){
        case 0:
            for(i = 0; i < NB_SUCCESSOR; i++){
                inputMin = document.getElementById("delayMinInput" + (i+1));
                inputMax = document.getElementById("delayMaxInput" + (i+1));
                SUCCESSORS[i].delayMin = inputMin.value;
                SUCCESSORS[i].delayMax = inputMax.value;
            }
            deleteArrows();
            VALIDATE = 1; // This variable prevents the call to hidden.bs.modal event that deletes all successors when the modal is closed
            $('#edit-pathway-modal-activities').modal("hide");
        break;
        case 1:
            alert("Vous avez formé une boucle ! Veuillez laisser une activité de départ sans lien entrant.")
        break;
    }
}

/**
 * Check some conditions about the successors
 * @returns 0 if everything is ok, else some int that will be used in a switch to display specific error 
 */
function checkSuccessor(){
    if(NB_ACTIVITY == 1 || NB_ACTIVITY == 0){
        return 0;
    }
    var predecessor;
    var loop = true;
    for(i = 0; i < NB_ACTIVITY; i++){
        predecessor = false;
        for(j = 0; j < NB_SUCCESSOR; j++){
            if(SUCCESSORS[j].nameActivityA == RESOURCES_BY_ACTIVITIES[i].activityname){
                predecessor = true;
            }
        }
        if(!predecessor){
            loop = false;
        }
    }
    if(loop){
        return 1;
    }
    else{
        return 0;  
    }
}

/**
 * Returns scheduled appointments according to an activity
 */
 function getScheduledAppointments(index) {
    // request to get the appointments list of the activity
    return $.ajax({
        type: 'GET',
        url: '/activity/'+index+'/appointments',
        dataType: "json",
    });
}

/**
 * Verify if there is some appointments scheduled for the pathway 
 */
async function verifyScheduledAppointments(idPathway) {
    document.getElementById("pathway-id").value = idPathway
    try {
        PATHWAY_APPOINTMENTS.scheduledAppointments = await getScheduledAppointments(idPathway)
        if (PATHWAY_APPOINTMENTS.scheduledAppointments.length > 0) {
            showScheduledAppointmentsModal()
        }
        else{
            $('#pathway-modal-scheduled-appointments').modal('show');
            let body = document.getElementById('scheduled-appointments-body')
            body.style.overflowY = "hidden"
            body.innerHTML = "Voulez-vous vraiment supprimer ce parcours ?"
            document.getElementById("modal-subtitle").innerText = ""
        }
    }
    catch(err) {
        console.log(err);
    }
}

/**
 * Display the modal pop-up to inform the user that he will removed some scheduled appointments 
 */
function showScheduledAppointmentsModal() {
    $('#pathway-modal-scheduled-appointments').modal('show');
    let body = document.getElementById('scheduled-appointments-body')
    body.innerHTML = ""
    document.getElementById("modal-subtitle").innerText = "En supprimant ce parcours, vous allez déprogrammer les rendez-vous suivants :"
    for (let indexScheduledAppointment = 0 ;indexScheduledAppointment < PATHWAY_APPOINTMENTS.scheduledAppointments.length; indexScheduledAppointment++) {
        let p = document.createElement('p')

        lastname = PATHWAY_APPOINTMENTS.scheduledAppointments[indexScheduledAppointment].patient_firstname
        firstname = PATHWAY_APPOINTMENTS.scheduledAppointments[indexScheduledAppointment].patient_lastname
        day = PATHWAY_APPOINTMENTS.scheduledAppointments[indexScheduledAppointment].appointment_day.date.split(' ')[0].split('-')[2]
        month = PATHWAY_APPOINTMENTS.scheduledAppointments[indexScheduledAppointment].appointment_day.date.split(' ')[0].split('-')[1]
        year = PATHWAY_APPOINTMENTS.scheduledAppointments[indexScheduledAppointment].appointment_day.date.split(' ')[0].split('-')[0]
        p.innerHTML = lastname +' '+ firstname + ' - '+day +'/'+ month+'/' + year
        body.appendChild(p)
    }
}