let valider = false;
const NoteInfomap = new Map();

// Initialisation des données 

NoteInfomap.set('Christian', '13');
NoteInfomap.set('Quentin', '15');
NoteInfomap.set('Bernard', '8');

/**
 * Ajouter une note d'informatique
 * @param note 
 */
function ajouterNoteInfo(prenom,note) {
    NoteInfomap.set(prenom,note);
}

/**
 * Permet de valider les notes d'informatique
 */
function validerNotesInfo() {
    this.valider = true;
}

/**
 * Obtenir les notes d'informatique
 * @returns Les notes d'informatique
 */
function getNotesInfo() {
    return NoteInfomap;
}

/**
 * Obtenir le status des notes d'informatique
 * @returns 
 */
function getStatusNotesInfo() {
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

exports.getNotesInfo = getNotesInfo;
exports.getStatusNotesInfo = getStatusNotesInfo;
exports.validerNotesInfo = validerNotesInfo;
exports.ajouterNoteInfo = ajouterNoteInfo;
