noteMaths = ['13','14'];
valider = false;
const NoteMathsmap = new Map();

// Initialisation des données 

NoteMathsmap.set('Christian', '9');
NoteMathsmap.set('Quentin', '18');
NoteMathsmap.set('Bernard', '12');

/**
 * Ajouter une note de maths
 * @param note 
 */
function ajouterNoteMaths(note) {
    noteMaths.push(note);
}

/**
 * Permet de valider les notes de maths
 */
function validerNotesMaths() {
    valider = true;
}

/**
 * Obtenir les notes de maths
 * @returns Les notes de maths
 */
function getNotesMaths() {
    return noteMaths;
}

exports.getNotesMaths = getNotesMaths;
