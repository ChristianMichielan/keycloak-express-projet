app.get('/note-informatique-lire', keycloak.enforcer(['note_informatique:lire'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    return res.status(200).end('success');
});

app.post('/note-informatique-ecrire', keycloak.enforcer(['note_informatique:ecrire'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    return res.status(200).end('success');
});

app.post('/note-informatique-valider', keycloak.enforcer(['note_informatique:valider'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    return res.status(200).end('success');
});