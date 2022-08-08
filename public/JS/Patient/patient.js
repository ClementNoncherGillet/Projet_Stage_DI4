
var autocompleteArray = [];
/**
 * Allows to open a modal that allows to create a new patient
 */
function addPatient(){
    $('#add-patient-modal').modal("show");
}

/**
 * Allows to open an edit modal of a specific patient
 */
function editPatient(id, lastname, firstname) {
    //Filling fields with data
    document.getElementById('idpatient').value = id;
    document.getElementById('lastname').value = lastname;
    document.getElementById('firstname').value = firstname;

    //Displaying the modal
    $('#edit-patient-modal').modal("show");
}

/**
 * Allows to open an infos modal that displays data about a specific patient
 */
function showInfosPatient(idPatient, lastname, firstname) {
    document.getElementById('patient').innerHTML = lastname + ' ' + firstname;
   
    var tableBody = document.getElementById('tbodyShow');
    tableBody.innerHTML = ''; 

    $.ajax({
        type : 'POST',
        url  : '/ajaxPatient',
        data : {idPatient: idPatient},
        dataType : "json",
        success : function(data){        
            tableAppointment(tableBody, data);
        },
        error: function(data){
            console.log("error");
        }
        });
    
    $('#infos-patient-modal').modal("show");
}

/**
 * Allows display the list of appointments of a patient in a modal
 */
function tableAppointment(tableBody, data,){
    if(data.length <= 0){
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);
        var td = document.createElement('TD');
        td.setAttribute('colspan', 5);
        td.append("Pas de parcours prévus pour ce patient dans les prochains jours.");
        tr.appendChild(td);
        console.log(tableBody)
    }
    else{
        for(i = 0; i < data.length; i++){
            var tr = document.createElement('TR');
            tableBody.appendChild(tr);
            var td1 = document.createElement('TD');
            var td2 = document.createElement('TD');
            td1.append(data[i]['pathwayname']);
            td2.append(data[i]['date']);
            tr.appendChild(td1);tr.appendChild(td2);
        }
    }
}

/**
 * Allows to filter patients to not display all of them
 */
function filterPatient(selected=null){
    var trs = document.querySelectorAll('#tablePatient tr:not(.headerPatient)');
    for(let i=0; i<trs.length; i++){
            trs[i].style.display='none';
    }
    table=document.getElementById('patientTable');
    var tr=document.createElement('tr');
    table.appendChild(tr);
    var lastname=document.createElement('td');
    lastname.append(selected.lastname);
    tr.appendChild(lastname);
    var firstname=document.createElement('td');
    firstname.append(selected.firstname);
    tr.appendChild(firstname);
    var buttons=document.createElement('td');
    var infos=document.createElement('button');
    infos.setAttribute('class','btn-infos btn-secondary');
    infos.setAttribute('onclick','showInfosPatient('+selected.id+',"'+selected.lastname+'","'+selected.firstname+'")');
    infos.append('Informations');
    var edit=document.createElement('button');
    edit.setAttribute('class','btn-edit btn-secondary');
    edit.setAttribute('onclick','editPatient('+selected.id+',"'+selected.lastname+'","'+selected.firstname+'")');
    edit.append('Editer');
    var form=document.createElement('form');
    form.setAttribute('action','/patient/'+selected.id+"/delete");
    form.setAttribute('style','display:inline');
    form.setAttribute('method','POST');
    form.setAttribute('id','formDelete'+selected.id);
    form.setAttribute('onsubmit','return confirm("Voulez-vous vraiment supprimer ce patient ?")');
    var deleteButton=document.createElement('button');
    deleteButton.setAttribute('class','btn-delete btn-secondary');
    deleteButton.append('Supprimer');
    deleteButton.setAttribute('type','submit');
    buttons.appendChild(infos);
    buttons.appendChild(edit);
    form.appendChild(deleteButton);
    buttons.appendChild(form);
    tr.appendChild(buttons);
  }

/**
 * Allows to display all patients without any filter
 */
  function displayAll() {
    var trs = document.querySelectorAll('#tablePatient tr:not(.headerPatient)');
    var input = document.getElementById('autocompleteInputLastname');
    console.log(input.value)
    if(input.value == ''){
    for(let i=0; i<trs.length; i++){
        console.log(trs[i].className)
        if(trs[i].style.display == 'none'){
            trs[i].style.display='table-row';
        }
        else if(trs[i].className != 'original'){
            trs[i].remove()
        }
    }
}
}
 
/**
 * Allows to hide the new modal form of a patient. Called when a click is done somewhere else than the modal
 */
function hideNewModalForm() {
    $('#add-patient-modal').modal("hide");
}
  
/**
 * Allows to hide the edit modal form of a patient. Called when a click is done somewhere else than the modal
 */
function hideEditModalForm() {
    $('#edit-patient-modal').modal("hide");
}

