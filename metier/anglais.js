app.get('/note-anglais-lire', keycloak.enforcer(['note_anglais:lire'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    return res.status(200).end('success');
});

app.post('/note-anglais-ecrire', keycloak.enforcer(['note_anglais:ecrire'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    return res.status(200).end('success');
});

app.post('/note-anglais-valider', keycloak.enforcer(['note_anglais:valider'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    return res.status(200).end('success');
});
