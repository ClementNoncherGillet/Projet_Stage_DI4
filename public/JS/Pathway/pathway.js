var SELECT_ID = 0;
var NB_ACTIVITY = 0;

/**
 * Appelée au chargement de la page de création d'un parcours (circuit)
 */
document.addEventListener('DOMContentLoaded', () => {
    SELECT_ID = 0;
})

/**
 * Permet d'ajouter une liste déroulante pour choisir une activité lors de la cration d'un parcours (pathway)
 */
function handleAddActivity() {

    NB_ACTIVITY = NB_ACTIVITY + 1;
    document.getElementById('nbActivity').value = NB_ACTIVITY
    
    // Recuperation du select par défaut (deja rempli avec les bonnes options)
    var selectSample = document.getElementsByClassName("select-activity-sample")[0]

    // Création d'un nouveau select et copie des options du select par défaut
    var select = document.createElement("select");
    var pActivityNumber = document.createElement("p");
    pActivityNumber.setAttribute('id', 'activity-number')
    pActivityNumber.style.marginRight = '10px'
    pActivityNumber.innerText =  (SELECT_ID+1) +' : ' 
    
    // Création d'une div pour afficher le numero de l'activité, le select et le bouton de suppression a côté
    let div = document.createElement("div")
    div.setAttribute('class', 'form-field')

    let inputName = document.createElement('input')
    inputName.setAttribute('class', 'input-name')
    inputName.setAttribute('placeholder', 'Nom')
    let inputDuration = document.createElement('input')
    inputDuration.setAttribute('class', 'input-duration')
    inputDuration.setAttribute('placeholder', 'Durée (min)')
    inputDuration.setAttribute('type', 'number')
    inputDuration.setAttribute('min', '0')
    
    div.appendChild(inputName)
    div.appendChild(inputDuration)

    let img = new Image();
    img.src = 'img/delete.svg'
    img.setAttribute('id','img-'+SELECT_ID)
    img.setAttribute('onclick', 'deleteSelect(this.id)')
    div.appendChild(img)


    // On definit son id : select-1, select-2...
    select.setAttribute('id', 'select-'+SELECT_ID);
    select.setAttribute('name', 'activity-'+SELECT_ID);

    // On ajoute les options du bon select dans celui que l'on vient de créer
    let len = selectSample.options.length
    for (let i = 0; i < len; i++) {
        select.options[select.options.length] = new Option (selectSample.options[i].text, selectSample.options[i].value);
    }

    // On l'affiche et on l'ajoute a la fin de la balise div select-container
    select.style.display = "block";
    let divAddActivity = document.getElementById('select-container')

    let divcontainer = document.createElement('div')
    //divcontainer.setAttribute('class', "title-container")
    divcontainer.setAttribute('class', 'flex-row')
    divcontainer.style.justifyContent = "center"
    let pTitle = document.createElement("p")
    pTitle.innerHTML = "Activité " + (SELECT_ID+1) + " : "
    let divclass = divcontainer.getAttribute('class')  //ajouter la classe 'div-activity-(id)' en plusde form-field a div
    divcontainer.setAttribute('class', divclass + ' div-activity-'+SELECT_ID)
    divcontainer.appendChild(pTitle)
    divcontainer.appendChild(div)
    divAddActivity.appendChild(divcontainer)

    SELECT_ID++
} 

/** Permet de supprimer un select dans la liste déroulante */
function deleteSelect(id) {
    NB_ACTIVITY = NB_ACTIVITY - 1;
    document.getElementById('nbActivity').value = NB_ACTIVITY

    // On récupère le numero de la div a supprimer  
    // Pour cela on recupere que le dernier caracetere de l'id de l'img : (img-1)
    id = id[id.length - 1] 
    // On peut donc recuperer la div
    let divToDelete = document.getElementsByClassName('div-activity-'+id)[0]
    // puis la supprimer
    let divAddActivity = document.getElementById('select-container')
    divAddActivity.removeChild(divToDelete)
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
