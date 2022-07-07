var SELECT_ID = 0;
var NB_ACTIVITY = 0;



/**
 * Appelée au chargement de la page de création d'un parcours (circuit)
 */
 document.addEventListener('DOMContentLoaded', () => {
    SELECT_ID = 0;
    //showNewModalForm()
})


function disableSubmit() {
    let btnSubmit = document.getElementById('submit')
    btnSubmit.disabled=true
}

/**
 * Permet d'ajouter une liste déroulante pour choisir une activité lors de la cration d'un parcours (pathway)
 */
function handleAddActivity() {

    NB_ACTIVITY = NB_ACTIVITY + 1;
    document.getElementById('nbactivity').value = NB_ACTIVITY

    disableSubmit();
    
    // Création d'une div qui contient les inputs pour le nom de l'activité la durée et le btn de suppression
    let div = document.createElement("div")
    div.setAttribute('class', 'activity-field')    
    div.setAttribute('id', 'activity-field-'+SELECT_ID)

    let inputName = document.createElement('input')
    inputName.setAttribute('class', 'input-name')
    //inputName.disabled = true
    inputName.setAttribute('placeholder', 'Nom')
    inputName.setAttribute('onchange', 'disableSubmit()')
    //inputName.setAttribute('name', 'name-activity-'+SELECT_ID)

    /*let inputDuration = document.createElement('input')
    inputDuration.setAttribute('class', 'input-duration')
    inputDuration.setAttribute('placeholder', 'Durée (min)')
    inputDuration.setAttribute('type', 'number')
    inputDuration.setAttribute('min', '0')
    inputDuration.setAttribute('onchange', 'disableSubmit()')*/
    //inputDuration.setAttribute('name', 'duration-activity-'+SELECT_ID)

    let imgDelete = new Image();
    imgDelete.src = 'img/delete.svg'
    imgDelete.setAttribute('id','img-'+SELECT_ID)
    imgDelete.setAttribute('onclick', 'deleteSelect(this.id)')

    let imgEdit = new Image();
    imgEdit.src = 'img/edit.svg'
    imgEdit.setAttribute('id','img-'+SELECT_ID)
    imgEdit.setAttribute('onclick', 'editSelect(this.id)')

    div.appendChild(inputName)
    //div.appendChild(inputDuration)
    div.appendChild(imgEdit)
    div.appendChild(imgDelete)

    // On l'affiche et on l'ajoute a la fin de la balise div activities-container
    //select.style.display = "block";
    let divAddActivity = document.getElementsByClassName('activities-container')[0]
    divAddActivity.setAttribute('id', 'activities-container-'+SELECT_ID)
    //let divAddActivity = document.getElementsByClassName('activities-container')

    //divAddActivity.

    let divcontainer = document.createElement('div')
    //divcontainer.setAttribute('class', "title-container")
    divcontainer.setAttribute('class', 'flex-row')
    divcontainer.style.justifyContent = "center"
    let pTitle = document.createElement("p")
    pTitle.innerHTML = 'Activité : '
    pTitle.setAttribute('class', 'label')
    //let divclass = divcontainer.getAttribute('class')  //ajouter la classe 'div-activity-(id)' en plusde activity-field a div
    divcontainer.setAttribute('class', 'div-activity-'+SELECT_ID)
    divcontainer.appendChild(pTitle)
    divcontainer.appendChild(div)
    divcontainer.appendChild(createDivEdit()) /* div edit  */

    let divEdit = document.createElement('div')
    divEdit.setAttribute('id', 'div-edit-activity-'+SELECT_ID)
    //divcontainer.appendChild(divEdit)
    divcontainer.appendChild(divEdit)

    divAddActivity.appendChild(divcontainer)

    // On appelle la methode : pour afficher la liste de ressources humaines par défaut 
    handleHumanButton('bh-'+SELECT_ID)

    SELECT_ID++
} 


/**
 * Permet de supprimer un select dans la liste déroulante 
 * @param {*} id : img-0, img-1
 */
function deleteSelect(id) {
    disableSubmit();

    // On récupère le numero de la div a supprimer  
    // Pour cela on recupere que le dernier caracetere de l'id de l'img : (img-1)
    id = id[id.length - 1] 
    // On peut donc recuperer la div
    let divToDelete = document.getElementsByClassName('div-activity-'+id)[0]
    // puis la supprimer
    let divAddActivity = document.getElementsByClassName('activities-container')[0]
    divAddActivity.removeChild(divToDelete)
    
    // On actusalise l'input qui contient le nb d'activité
    NB_ACTIVITY = NB_ACTIVITY - 1;
    document.getElementById('nbactivity').value = NB_ACTIVITY

    //SELECT_ID = SELECT_ID - 1;
}

/**
 * Permet de modifier une activité  
 * @param {*} id : XXX-0, XXX-1
 */
function editSelect(id) {
    disableSubmit();

    // On récupère le numero de la div a supprimer  
    // Pour cela on recupere que le dernier caracetere de l'id de l'img : (img-1)
    id = id[id.length - 1] 
    // On peut donc recuperer la div
    //let divToEdit = document.getElementsByClassName('div-activity-'+id)[0]
    let divToEdit = document.getElementById('div-edit-activity-'+id)

    if (divToEdit.style.display == 'flex') {
        divToEdit.style.display = 'none'
        let divField = document.getElementById('activity-field-'+id)
        divField.style.borderBottomLeftRadius = '10px'
        divField.style.borderBottomRightRadius = '10px'

    } else {
        divToEdit.style.display = 'flex'
        let divField = document.getElementById('activity-field-'+id)  
        divField.style.borderBottomLeftRadius = '0px'
        divField.style.borderBottomRightRadius = '0px'
    }



    //console.log(divToEdit)

    
}

/**
 * Permet de verifier les champs et de leur donner un 'name' pour la requete
 */
function verifyChanges() {

    let formOk = true
    // D'abord on recupere la div qui contient toutes les activity
    let activitiesContainer = document.getElementsByClassName('activities-container')[0]

    // On parcours toutes nos activités 
    // On set leur 'name' et on verifie leurs contenus
    for (let i = 0; i < NB_ACTIVITY; i++) {

        activitiesContainer.children[i].children[1].children[0].setAttribute('name', 'name-activity-'+ Number(i))
        let name = activitiesContainer.children[i].children[1].children[0].value
        activitiesContainer.children[i].children[1].children[1].setAttribute('name', 'duration-activity-'+Number(i))
        let duration = activitiesContainer.children[i].children[1].children[1].value

        // On verifie les inputs 
        if (name === '') {
            formOk = false
        }
        if (duration === '') {
            formOk = false
        }
        if (Number(duration) < 0 ) {
            formOk = false
        }

    }

    if (document.getElementById('pathwayname').value === '') {
        formOk = false
    }

    if (formOk) {
        let btnSubmit = document.getElementById('submit')
        btnSubmit.disabled = false;
    }
}




/**
 * Permet d'afficher la fenêtre modale d'ajout
 */
function showNewModalForm(){
    $('#add-pathway-modal').modal("show");
}

/**
 * Permet de fermer la fenêtre modale d'ajout
 */
function hideNewModalForm() {
    $('#add-pathway-modal').modal("hide");
}


function createDivEdit() {

    /* Div parent pour l'ajout de ressource */
    divEditActivity = document.createElement('div')
    divEditActivity.setAttribute('class', 'div-edit-activities')
    divEditActivity.setAttribute('id', 'div-edit-activity-'+SELECT_ID)
    divEditActivity.style.display = 'none'

    /* Premier enfant : les 2 boutons pour choisir materielles humaines */

    divBtnsResources = document.createElement('div')
    divBtnsResources.setAttribute('class', 'div-buttons-resources')
    btnHuman = document.createElement('button')
    btnHuman.innerText = 'Humaines'
    btnHuman.setAttribute('type', 'button')
    btnHuman.setAttribute('id', 'bh-'+SELECT_ID)
    btnHuman.setAttribute('onclick', 'handleHumanButton(this.id)')

    btnMaterial = document.createElement('button')
    btnMaterial.innerText = 'Materielles'
    btnMaterial.setAttribute('type', 'button')
    btnMaterial.setAttribute('id', 'bm-'+SELECT_ID)
    btnMaterial.setAttribute('onclick', 'handleMaterialButton(this.id)')

    divBtnsResources.appendChild(btnHuman)
    divBtnsResources.appendChild(btnMaterial)


    /* Deuxieme enfant : Div qui contiendra la liste des ressources */

    divResources = document.createElement('div')
    divResources.setAttribute('class', 'div-resources')
    //divRH = document.createElement('div')
    //divRH.setAttribute('class', 'div-resources-h')
    divRM = document.createElement('div')
    divRM.setAttribute('class', 'div-resources-m')
    //divResources.appendChild(divRH)
    ul = document.createElement('ul')
    li1 = document.createElement('li')
    li1.innerText = 'Chantal'
    li2 = document.createElement('li')
    li2.innerText = 'Marie'
    li3 = document.createElement('li')
    li3.innerText = 'Louise'
    li4 = document.createElement('li')
    li4.innerText = 'Clemence'
    divRM.appendChild(li1)
    divRM.appendChild(li2)
    divRM.appendChild(li3)
    divRM.appendChild(li4)
    divResources.appendChild(divRM)


    /* Troisieme enfant : select  */
    divAddResources = document.createElement('div')
    divAddResources.setAttribute('class', 'div-add-resources')
    divAddResources.setAttribute('title', 'Choisissez la ressource à ajouter')
    selectResources = document.createElement('select')
    option = document.createElement('option')
    option.value = '1'
    option.text = 'oui'
    selectResources.appendChild(option)
    inputNbResources = document.createElement('input')
    inputNbResources.setAttribute('type', 'number')
    inputNbResources.setAttribute('title', 'Entrer le nombre de ressources')
    inputNbResources.setAttribute('placeholder', 'Qte')
    //title="Enter input here"
    btnPlus = document.createElement('button')
    btnPlus.setAttribute('type', 'button')
    btnPlus.innerHTML = '+'
    btnPlus.setAttribute('title', 'Ajouter la ressource a la liste')

    divAddResources.appendChild(selectResources)
    divAddResources.appendChild(inputNbResources)
    divAddResources.appendChild(btnPlus)

    /* Ajout de tous les enfants a la div parent */
    divEditActivity.appendChild(divBtnsResources)
    divEditActivity.appendChild(divResources)
    divEditActivity.appendChild(divAddResources)

    //

    return divEditActivity
}


function handleHumanButton(id) {
    id = id[id.length - 1] 
    let bh = document.getElementById('bh-'+id)
    bh.style.textDecoration = 'underline'
    bh.style.fontWeight = '700'

    let bm = document.getElementById('bm-'+id)
    bm.style.textDecoration = 'none'
    bm.style.fontWeight = 'normal'

}

function handleMaterialButton(id) {
    id = id[id.length - 1] 
    let bm = document.getElementById('bm-'+id)
    bm.style.textDecoration = 'underline'
    bm.style.fontWeight = '700'

    let bh = document.getElementById('bh-'+id)
    bh.style.textDecoration = 'none'
    bh.style.fontWeight = 'normal'
}

function showInfosPathway(id, name) {
    document.getElementById('pathway-id').innerText = id;
    document.getElementById('pathway-name').innerText = name;
    $('#infos-pathway-modal').modal("show");

}