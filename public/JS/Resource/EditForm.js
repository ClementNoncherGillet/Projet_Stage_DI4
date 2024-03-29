// SLEECT ID : correspond a l'indice de l'activité à créée 0, 1, 2... 
var SELECT_ID_EDIT = 0
// NB ACTIVITY : nombre totale d'activité
var NB_CATEGORY_EDIT = 0

var WORKING_HOURS;
var CATEGORIES_BY_HUMAN_RESOURCES;
var CATEGORIES_BY_MATERIAL_RESOURCES;
var UNAVAILABILITIES_HUMAN;
var UNAVAILABILITIES_MATERIAL;
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

document.addEventListener('DOMContentLoaded', () => {
    if(sPage == 'human-resources' || sPage == 'human-resources-category') {
        //Gettings JSON object lists when the page is loaded. Content loaded is accorded to the resource page loaded
        WORKING_HOURS = JSON.parse(document.getElementById('working-hours-content').value) 
        CATEGORIES_BY_HUMAN_RESOURCES = JSON.parse(document.getElementById('categories-by-human-resource').value)
        UNAVAILABILITIES_HUMAN = JSON.parse(document.getElementById('unavailabilities-human-resource').value)

    }

    if(sPage == 'material-resources' || sPage == 'material-resources-category') {

        CATEGORIES_BY_MATERIAL_RESOURCES = JSON.parse(document.getElementById('categories-by-material-resource').value)
        UNAVAILABILITIES_MATERIAL = JSON.parse(document.getElementById('unavailabilities-material-resource').value)

    }    

   
})


/**
 * Permet de supprimer un select dans la liste déroulante 
 * @param {*} id : img-0, img-1
 * en prenant uniquement le dernier chiffre de l'id on recupere l'indice de l'activité a supprimer
 */
function edit__deleteSelect(id) {

    // On récupère le numero de la div a supprimer  
    // Pour cela on recupere que le dernier caracetere de l'id de l'img : (img-1)
    id = id[id.length - 1] 
    // On peut donc recuperer la div
    let divToDelete = document.getElementsByClassName('unavailability-'+id)[0]
    // puis la supprimer
    let divAddCategory = document.getElementById('edit--unavailabilities-container')
    divAddCategory.removeChild(divToDelete)
    // On actusalise l'input qui contient le nb d'activité
    NB_UNAVAIBILITY_EDIT = NB_UNAVAIBILITY_EDIT - 1;
    document.getElementById('edit--nbunavailability').value = NB_UNAVAIBILITY_EDIT

    SELECT_ID_EDIT = SELECT_ID_EDIT - 1;
}


function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        // padTo2Digits(date.getSeconds()), can also add seconds
      ].join(':')
    );
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

/**
 * Allows to display the edit modal of a human resource
 */
function showEditModalFormHuman(id, name){
        var WORKING_HOURS_FILTERED =  WORKING_HOURS.filter(function(WORKING_HOUR) {
            return WORKING_HOUR.humanresource_id == id;
        });


    SELECT_ID_EDIT = 0;
    $('#edit--human-resource-modal').modal("show");
    let categoriesContainer = document.getElementById('edit--categories-container');

    document.getElementById('edit--resourceid').value = id;
    document.getElementById('edit--resourcename').value = name
    let beginHours = document.getElementById('working-hours-input-begin-edit')
    let endHours = document.getElementById('working-hours-input-end-edit')
    for(let y = 0; y<7; y++){
        beginHours.children[y].value = ''
        endHours.children[y].value = ''
    }
    for(let y = 0; y<WORKING_HOURS_FILTERED.length; y++){
        switch (WORKING_HOURS_FILTERED[y].dayweek) {
            case 0:

                beginHours.children[6].value = WORKING_HOURS_FILTERED[y].starttime.date.substring(11,16)
                endHours.children[6].value = WORKING_HOURS_FILTERED[y].endtime.date.substring(11,16)

                break;

            case 1:

                beginHours.children[0].value = WORKING_HOURS_FILTERED[y].starttime.date.substring(11,16)
                endHours.children[0].value= WORKING_HOURS_FILTERED[y].endtime.date.substring(11,16)

                break;

            case 2:
                beginHours.children[1].value = WORKING_HOURS_FILTERED[y].starttime.date.substring(11,16)
                endHours.children[1].value = WORKING_HOURS_FILTERED[y].endtime.date.substring(11,16)

                break;

            case 3:

                beginHours.children[2].value = WORKING_HOURS_FILTERED[y].starttime.date.substring(11,16)
                endHours.children[2].value = WORKING_HOURS_FILTERED[y].endtime.date.substring(11,16)

                break;

            case 4:

                beginHours.children[3].value = WORKING_HOURS_FILTERED[y].starttime.date.substring(11,16)
                endHours.children[3].value = WORKING_HOURS_FILTERED[y].endtime.date.substring(11,16)

                break;

            case 5:

                beginHours.children[4].value = WORKING_HOURS_FILTERED[y].starttime.date.substring(11,16)
                endHours.children[4].value = WORKING_HOURS_FILTERED[y].endtime.date.substring(11,16)

                break;

            default:

                beginHours.children[5].value = WORKING_HOURS_FILTERED[y].starttime.date.substring(11,16)
                endHours.children[5].value = WORKING_HOURS_FILTERED[y].endtime.date.substring(11,16)

                break;
        }
    }

    NB_CATEGORY_EDIT = 0;
    let categoriesId = []
    for (let j = 0; j < CATEGORIES_BY_HUMAN_RESOURCES.length; j++){
        if(CATEGORIES_BY_HUMAN_RESOURCES[j].humanresource_id == id){
        categoriesId.push(CATEGORIES_BY_HUMAN_RESOURCES[j].humanresourcecategory_id)
        }
    }

    for (let i = 0; i < categoriesContainer.children.length; i++) {
        categoriesContainer.children[i].children[0].checked = false;
        if(categoriesId.includes(Number(categoriesContainer.children[i].children[0].value))) {
            categoriesContainer.children[i].children[0].checked = true;
        }
    }



}

/**
 * Allows to display an edit modal form of a selected material resource
 */
function showEditModalFormMaterial(id, name, index){
    SELECT_ID_EDIT = 0;
    // Affichage de la fenetre modale 
    $('#edit--material-resource-modal').modal("show");
    let categoriesContainer = document.getElementById('edit--categories-container');

    document.getElementById('edit--resourceid').value = id;
    document.getElementById('edit--resourcename').value = name
    NB_CATEGORY_EDIT = 0;
    let categoriesId = []
    for (let j = 0; j < CATEGORIES_BY_MATERIAL_RESOURCES.length; j++){
        if(CATEGORIES_BY_MATERIAL_RESOURCES[j].materialresource_id == id){
        categoriesId.push(CATEGORIES_BY_MATERIAL_RESOURCES[j].materialresourcecategory_id)
        }
    }

    for (let i = 0; i < categoriesContainer.children.length; i++) {
        categoriesContainer.children[i].children[0].checked = false;
        if(categoriesId.includes(Number(categoriesContainer.children[i].children[0].value))) {
            categoriesContainer.children[i].children[0].checked = true;
        }
    }
   
}


/**
 * Allows to launch an ajax request to delete a choosed unavailabilitiy of a human resource
 */
function deleteHumanUnavailability(value, id) {
    $.ajax({
        type : 'POST',
        url : '/deleteHumanUnavailability',
        data : {idUnavailability : value, idHumanAvailability : id},
        success : function(data) {
            location.reload()
        },
        error : function(xhr, ajaxOptions, thrownError) {
            console.log(xhr, ajaxOptions)
        }
    })
}


/**
 * Allows to launch an ajax request to delete a choosed unavailabilitiy of a material resource
 */
function deleteMaterialUnavailability(value, id) {
    $.ajax({
        type : 'POST',
        url : '/deleteMaterialUnavailability',
        data : {idUnavailability : value, idMaterialAvailability : id},
        success : function(data) {
            location.reload()
        },
        error : function(xhr, ajaxOptions, thrownError) {
            console.log(xhr, ajaxOptions)
        }
    })
}

/**
 * Allows to display the unavailabilities of a human resource 
 */
function showUnavailabilityHuman(id, name){
    $('#edit--unavailability-human-resource-modal').modal("show");
    document.getElementById('human-resource-id-unavailability').value = id;
    document.getElementById('human-resource-name-unavailability').innerHTML = name;
    tbody = document.getElementById('tbody-unavailabilities-human')
    tbody.innerHTML = ''
 
    for (let i = 0; i < UNAVAILABILITIES_HUMAN.length; i++){
     if(UNAVAILABILITIES_HUMAN[i]['id_human_resource'] == id) {
         var dayBegin = UNAVAILABILITIES_HUMAN[i]['startdatetime'].date.substring(8,10);
         var monthBegin = UNAVAILABILITIES_HUMAN[i]['startdatetime'].date.substring(5,7);
         var yearBegin = UNAVAILABILITIES_HUMAN[i]['startdatetime'].date.substring(0,4);
         var hoursBegin = UNAVAILABILITIES_HUMAN[i]['startdatetime'].date.substring(11,19);
         var dayEnd = UNAVAILABILITIES_HUMAN[i]['enddatetime'].date.substring(8,10);
         var monthEnd = UNAVAILABILITIES_HUMAN[i]['enddatetime'].date.substring(5,7);
         var yearEnd = UNAVAILABILITIES_HUMAN[i]['enddatetime'].date.substring(0,4);
         var hoursEnd = UNAVAILABILITIES_HUMAN[i]['enddatetime'].date.substring(11,19);
 
         var tr = document.createElement("tr");
         tbody.appendChild(tr)
         var tdBegin = document.createElement("td")
         var tdEnd = document.createElement("td")
         var tdBtn = document.createElement("td")
         var btnDelete = document.createElement("button")
         btnDelete.innerHTML = 'Supprimer'
         btnDelete.setAttribute('class', "btn-delete", "btn-secondary")
         btnDelete.setAttribute('value', UNAVAILABILITIES_HUMAN[i]['id_unavailability'])
         btnDelete.setAttribute('id', UNAVAILABILITIES_HUMAN[i]['id_unavailability_human'])
         btnDelete.setAttribute('type', 'button')
         btnDelete.setAttribute('onclick', 'showDeleteHumanUnavailabilityModal(this)')
 
         tdBegin.innerHTML = (dayBegin +"/"+ monthBegin +"/"+ yearBegin +" "+ hoursBegin)
         tdEnd.innerHTML = (dayEnd +"/"+ monthEnd +"/"+ yearEnd +" "+ hoursEnd)
 
         tr.appendChild(tdBegin)
         tr.appendChild(tdEnd)
         tdBtn.appendChild(btnDelete)
         tr.appendChild(tdBtn)
     }
    }
    if(tbody.children.length == 0) {
        var zeroUnav = document.createElement("p")
        zeroUnav.innerHTML = "Pas de périodes d'indisponibilités créées !"
        tbody.appendChild(zeroUnav);
       }
 
 
 }

 /**
 * Allows to display the unavailabilities of a material resource 
 */
function showUnavailabilityMaterial(id, name) {
    $('#edit--unavailability-material-resource-modal').modal("show");
    document.getElementById('material-resource-id-unavailability').value = id;
    document.getElementById('material-resource-name-unavailability').innerHTML = name;
    tbody = document.getElementById('tbody-unavailabilities-material')
    tbody.innerHTML = ''

    tbody = document.getElementById('tbody-unavailabilities-material')
   for (let i = 0; i < UNAVAILABILITIES_MATERIAL.length; i++){
    if(UNAVAILABILITIES_MATERIAL[i]['id_human_resource'] == id) {
        var dayBegin = UNAVAILABILITIES_MATERIAL[i]['startdatetime'].date.substring(8,10);
        var monthBegin = UNAVAILABILITIES_MATERIAL[i]['startdatetime'].date.substring(5,7);
        var yearBegin = UNAVAILABILITIES_MATERIAL[i]['startdatetime'].date.substring(0,4);
        var hoursBegin = UNAVAILABILITIES_MATERIAL[i]['startdatetime'].date.substring(11,19);
        var dayEnd = UNAVAILABILITIES_MATERIAL[i]['enddatetime'].date.substring(8,10);
        var monthEnd = UNAVAILABILITIES_MATERIAL[i]['enddatetime'].date.substring(5,7);
        var yearEnd = UNAVAILABILITIES_MATERIAL[i]['enddatetime'].date.substring(0,4);
        var hoursEnd = UNAVAILABILITIES_MATERIAL[i]['enddatetime'].date.substring(11,19);

        var tr = document.createElement("tr");
        tr.setAttribute('value', UNAVAILABILITIES_MATERIAL[i]['id_unavailability'])
        tbody.appendChild(tr)
        var tdBegin = document.createElement("td")
        var tdEnd = document.createElement("td")
        var tdBtn = document.createElement("td")

        var btnDelete = document.createElement("button")
        btnDelete.setAttribute('type', 'button')
        btnDelete.innerHTML = 'Supprimer'
        btnDelete.setAttribute('class', "btn-delete", "btn-secondary")
        btnDelete.setAttribute('value', UNAVAILABILITIES_MATERIAL[i]['id_unavailability'])
        btnDelete.setAttribute('id', UNAVAILABILITIES_MATERIAL[i]['id_unavailability_material'])
        btnDelete.setAttribute('onclick', 'showDeleteMaterialUnavailabilityModal(this)')



        tdBegin.innerHTML = (dayBegin +"/"+ monthBegin +"/"+ yearBegin +" "+ hoursBegin)
        tdEnd.innerHTML = (dayEnd +"/"+ monthEnd +"/"+ yearEnd +" "+ hoursEnd)

        tr.appendChild(tdBegin)
        tr.appendChild(tdEnd)
        tdBtn.appendChild(btnDelete)
        tr.appendChild(tdBtn)
    }

   } 
   if(tbody.children.length == 0) {
    var zeroUnav = document.createElement("p")
    zeroUnav.innerHTML = "Pas de périodes d'indisponibilités créées !"
    tbody.appendChild(zeroUnav);
   }
}


function edit__handleAddUnavailability() {
        
        let categoriesContainer = document.getElementById('edit--unavailabilities-container');
        let formField = document.createElement("div");
        let inputUnavailability = document.createElement('input');
        inputUnavailability.setAttribute('type', 'datetime-local')
        formField.setAttribute('class', 'form-field unavailability-'+SELECT_ID_EDIT);
        //Image pour delete une categ

        let image = new Image();
        image.src = 'img/delete.svg';
        image.style.marginLeft = '30px';
        image.setAttribute('id','img-'+SELECT_ID_EDIT)
        image.setAttribute('onclick', 'edit__deleteSelect(this.id)')
        formField.appendChild(inputUnavailability)
        formField.appendChild(image);
        categoriesContainer.appendChild(formField);
        SELECT_ID_EDIT = SELECT_ID_EDIT +1;

        NB_UNAVAILBILITY_EDIT = NB_UNAVAILBILITY_EDIT +1;
        document.getElementById('edit--unavailibility').value = NB_UNAVAILBILITY_EDIT;
    }
    


/**
 * Allows to check changes in the edit modal form
 */
 function edit__verifyChanges() {
    let categoriesContainer = document.getElementById('edit--categories-container')
    let btnAdd = document.getElementById('btn-none-edit-resource')
    let nbCategory = document.getElementById('edit--nbcategory');
    var nbCateg = 0;
    for (let i = 0; i <= categoriesContainer.children.length-1; i++) {
        if(categoriesContainer.children[i].children[0].checked) {
        categoriesContainer.children[i].children[0].setAttribute('name', 'id-category-'+ nbCateg)
        categoriesContainer.children[i].children[0].setAttribute('id', 'id-category-' + nbCateg) 
        categoriesContainer.children[i].children[1].setAttribute('id', 'lbl-category-' + nbCateg)
        nbCateg = nbCateg +1;
        }
        
    } 
        
    nbCategory.value = nbCateg;
    btnAdd.click();

}

/**
 * Allows to check fields in the edit modal unavailabilities of a human resource 
 */
 function edit__verifyUnavailabilityHuman() {

    // D'abord on recupere la div qui contient toutes les activity
    let categoriesContainer = document.getElementById('edit--unavailabilities-container')
    let btnAdd = document.getElementById('btn-none-edit-human-unavailability')
    let nbCategory = document.getElementById('edit--nbunavailability');
    var nbCateg = 0;
    let beginTime = document.getElementById('datetime-begin-unavailability').value
    let endTime = document.getElementById('datetime-end-unavailability').value
    if(beginTime < endTime && beginTime != '' && endTime != '' && beginTime[4] == '-' && endTime[4] == '-') {
        btnAdd.click();
    }
    else {
        alert('Veuillez saisir les deux dates complètes, situées entre 0001 et 9999. La date de début doit être antérieure à celle de fin !')
    }

}
/**
 * Allows to check fields in the edit modal unavailabilities of a material resource 
 */
function edit__verifyUnavailabilityMaterial() {

    // D'abord on recupere la div qui contient toutes les activity
    let categoriesContainer = document.getElementById('edit--unavailabilities-container')
    let btnAdd = document.getElementById('btn-none-edit-material-unavailability')
    let nbCategory = document.getElementById('edit--nbunavailability');
    var nbCateg = 0;
    let beginTime = document.getElementById('datetime-begin-unavailability').value
    let endTime = document.getElementById('datetime-end-unavailability').value
    if(beginTime < endTime && beginTime != '' && endTime != '' && beginTime[4] == '-' && endTime[4] == '-') {
    btnAdd.click();
    }
    else {
        alert('Veuillez saisir les deux dates complètes, situées entre 0001 et 9999. La date de début doit être antérieure à celle de fin !')
    }

}

/**
 * Allows to check fields in the edit modal form of a human resource
 */
 function edit__verifyChangesHuman() {
    // D'abord on recupere la div qui contient toutes les activity
    let categoriesContainer = document.getElementById('edit--categories-container')
    let btnAdd = document.getElementById('btn-none-edit-resource')
    let divWorkingHoursBegin = document.getElementById('working-hours-input-begin-edit')
    let divWorkingHoursEnd = document.getElementById('working-hours-input-end-edit')
    let pbWorkingHoursSolo = false;
    let endHigherThanBegin = false;
    let nbCategory = document.getElementById('edit--nbcategory');
    var nbCateg = 0;
    // On parcours toutes nos activités 
    // On set leur 'name' et on verifie leurs contenus
    for (let i = 0; i <= categoriesContainer.children.length-1; i++) {
        if(categoriesContainer.children[i].children[0].checked) {
        categoriesContainer.children[i].children[0].setAttribute('name', 'id-category-'+ nbCateg)
        categoriesContainer.children[i].children[0].setAttribute('id', 'id-category-' + nbCateg) 
        categoriesContainer.children[i].children[1].setAttribute('id', 'lbl-category-' + nbCateg)
        nbCateg = nbCateg +1;
        }
        
    } 
    for (let j = 0; j <= 6; j++)
    {
        if((divWorkingHoursBegin.children[j].value == '' && divWorkingHoursEnd.children[j].value != '') || (divWorkingHoursBegin.children[j].value  != '' && divWorkingHoursEnd.children[j].value == '')){
            pbWorkingHoursSolo = true;
        }
        if((divWorkingHoursBegin.children[j].value > divWorkingHoursEnd.children[j].value)) {
            endHigherThanBegin = true;
        }
    }
    nbCategory.value = nbCateg
    if(pbWorkingHoursSolo == true) {
        alert('Veuillez saisir l\'heure de début et de fin, ou aucun des deux horaires pour chaque jour de disponibilité !')
    }
    else if(endHigherThanBegin == true) {
        alert('Veuillez saisir des horaires de début antérieures à celles de fin pour chaque jour de disponibilité !')
    }
    else {
        btnAdd.click();
    }  
    nbCategory.value = nbCateg;

}

function showDeleteHumanUnavailabilityModal(button){
    $("#edit--unavailability-human-resource-modal").hide()
    value = button.value
    id = button.getAttribute('id')
    document.getElementById("button-delete-human-unavailability").setAttribute('onclick', 'deleteHumanUnavailability('+ value + ', ' + id + ')')
    $("#delete-unavailability-modal").show()
}

function hideDeleteHumanUnavailabilityModal(){
    $("#edit--unavailability-human-resource-modal").show()
    $("#delete-unavailability-modal").hide()
}

function showDeleteMaterialUnavailabilityModal(button){
    $("#edit--unavailability-material-resource-modal").hide()
    value = button.value
    id = button.getAttribute('id')
    document.getElementById("button-delete-material-unavailability").setAttribute('onclick', 'deleteMaterialUnavailability('+ value + ', ' + id + ')')
    $("#delete-unavailability-modal").show()
}

function hideDeleteMaterialUnavailabilityModal(){
    $("#edit--unavailability-material-resource-modal").show()
    $("#delete-unavailability-modal").hide()
}