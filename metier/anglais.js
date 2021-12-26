let valider = false;
const NoteAnglaismap = new Map();

// Initialisation des données 

NoteAnglaismap.set('Christian', '13');
NoteAnglaismap.set('Quentin', '12');
NoteAnglaismap.set('Bernard', '12');

/**
 * Ajouter une note d'anglais
 * @param note 
 */
function ajouterNoteAnglais(prenom,note) {
    NoteAnglaismap.set(prenom,note);
}

/**
 * Permet de valider les notes d'anglais
 */
function validerNotesAnglais() {
    this.valider = true;
}

/**
 * Obtenir les notes d'anglais
 * @returns Les notes d'anglais
 */
function getNotesAnglais() {
    return NoteAnglaismap;
}

/**
 * Obtenir le status des notes d'anglais
 * @returns 
 */
function getStatusNotesAnglais() {
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

exports.getNotesAnglais = getNotesAnglais;
exports.getStatusNotesAnglais = getStatusNotesAnglais;
exports.validerNotesAnglais = validerNotesAnglais;
exports.ajouterNoteAnglais = ajouterNoteAnglais;
