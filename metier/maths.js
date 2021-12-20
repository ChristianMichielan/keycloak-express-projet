let valider = false;
const NoteMathsmap = new Map();

// Initialisation des données 

NoteMathsmap.set('Christian', '9');
NoteMathsmap.set('Quentin', '18');
NoteMathsmap.set('Bernard', '12');

/**
 * Ajouter une note de maths
 * @param note 
 */
function ajouterNoteMaths(prenom,note) {
    NoteMathsmap.set(prenom,note);
}

/**
 * Permet de valider les notes de maths
 */
function validerNotesMaths() {
    this.valider = true;
}

/**
 * Obtenir les notes de maths
 * @returns Les notes de maths
 */
function getNotesMaths() {
    return NoteMathsmap;
}

/**
 * Obtenir le status des notes de maths
 * @returns 
 */
function getStatusNotesMaths() {
    let statut;
    if (!this.valider) {
        statut = 'Non validés';
    }
    console.log(this.valider);
    if (this.valider) {
        console.log(valider);
        statut = 'Validés';
    }
    return statut;
}

exports.getNotesMaths = getNotesMaths;
exports.getStatusNotesMaths = getStatusNotesMaths;
exports.validerNotesMaths = validerNotesMaths;
exports.ajouterNoteMaths = ajouterNoteMaths;
