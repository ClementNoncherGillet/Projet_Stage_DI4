
var autocompleteArray = [];
//function permettant d'ouvrir la modale d'ajout d'un patient
function addPatient(){
    $('#add-patient-modal').modal("show");
}

//function permettant d'ouvrir la modale d'édition d'un patient
function editPatient(id, lastname, firstname) {
    //on initialise les informations affichées avec les données du patient modifié
    document.getElementById('idpatient').value = id;
    document.getElementById('lastname').value = lastname;
    document.getElementById('firstname').value = firstname;

    //on affiche la modale
    $('#edit-patient-modal').modal("show");
}

function showInfosPatient(idPatient, lastname, firstname) {
    document.getElementById('patient').innerHTML = lastname + ' ' + firstname;
   
    var tableBody = document.getElementById('tbodyShow');
    tableBody.innerHTML = ''; // On supprime ce qui a précédemment été écrit dans la modale

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

function tableAppointment(tableBody, data){
    if(data.length <= 0){
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);
        var td = document.createElement('TD');
        td.setAttribute('colspan', 5);
        td.append("Pas de parcours prévus pour ce patient dans les prochains jours.");
        tr.appendChild(td);
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

function filterPatient(idInput, selected=null){
    var trs = document.querySelectorAll('#tablePatient tr:not(.headerPatient)');
    if(selected == null){
    var filter = document.querySelector('#'+idInput).value; 
    }
    else{
        var filter = selected;
    }
    for(let i=0; i<trs.length; i++){
        var regex = new RegExp(filter, 'i'); 
        var fullIdentitySurname=trs[i].cells[1].outerText +" "+trs[i].cells[2].outerText; 
        if(autocompleteArray.indexOf(fullIdentitySurname) == -1){
        autocompleteArray.push(fullIdentitySurname);
        }
        var fullIdentityName=trs[i].cells[2].outerText+" "+trs[i].cells[1].outerText;  
        var name=trs[i].cells[2].outerText;
        var surname=trs[i].cells[1].outerText;
        if(regex.test(fullIdentityName)== false && regex.test(name)==false && regex.test(surname)==false && regex.test(fullIdentitySurname)==false){
            trs[i].style.display='none';
        }
        else{
            trs[i].style.display=''; 
        }
    }
  }
 

function hideNewModalForm() {
    $('#add-patient-modal').modal("hide");
}
  
function hideEditModalForm() {
    $('#edit-patient-modal').modal("hide");
}

