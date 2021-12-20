const path = require('path');
const express = require('express');
const session = require('express-session');
const favicon = require('serve-favicon');
const Keycloak = require('keycloak-connect');
var bodyParser = require('body-parser');
const MathsHelper = require('./metier/maths');

const app = express();
const memoryStore = new session.MemoryStore();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.set('views', require('path').join(__dirname, '/view'));
app.use(express.static('static'));
app.use(favicon(path.join(__dirname, 'static', 'images', 'favicon.ico')));
app.use(session({
    secret: 'KWhjV<T=-*VW<;cC5Y6U-{F.ppK+])Ub',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
}));

const keycloak = new Keycloak({
    store: memoryStore,
});

app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/',
}));

app.get('/', (req, res) => res.redirect('/home'));

const parseToken = raw => {
    if (!raw || typeof raw !== 'string') return null;

    try {
        raw = JSON.parse(raw);
        const token = raw.id_token ? raw.id_token : raw.access_token;
        const content = token.split('.')[1];

        return JSON.parse(Buffer.from(content, 'base64').toString('utf-8'));
    } catch (e) {
        console.error('Error while parsing token: ', e);
    }
};

app.get('/home', keycloak.protect(), (req, res, next) => {
    const details = parseToken(req.session['keycloak-token']);
    const embedded_params = {};

    if (details) {
        embedded_params.username = details.preferred_username;
    }

    res.render('home', {
        user: embedded_params,
    });
});

app.get('/login', keycloak.protect(), (req, res) => {
    return res.redirect('home');
});

// MATHS 

app.get('/note-maths/lire', keycloak.enforcer(['note_maths:lire'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    res.render('lireNotesMaths', {
        noteMaths : MathsHelper.getNotesMaths(),
        statutNoteMaths : MathsHelper.getStatusNotesMaths()
    });
});

app.get('/note-maths/ecrire', keycloak.enforcer(['note_maths:ecrire'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    res.render('ajouterNotesMaths');
});

app.get('/note-maths/valider', keycloak.enforcer(['note_maths:valider'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    res.render('validerNotesMaths');
});

app.post('/add-note-maths', urlencodedParser, (req, res) => {
    console.log(req.body.prenom);
    var prenom = req.body.prenom;
    var note = req.body.note;
    MathsHelper.ajouterNoteMaths(prenom,note);
    res.redirect('/');
});

app.post('/valider-note-maths', urlencodedParser, (req, res) => {
    console.log("OK");
    MathsHelper.validerNotesMaths();
    res.redirect('/');
});


// INFORMATIQUE

app.get('/note-informatique/lire', keycloak.enforcer(['note_informatique:lire'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    return res.status(200).end('success');
});

app.post('/note-informatique/ecrire', keycloak.enforcer(['note_informatique:ecrire'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    return res.status(200).end('success');
});

app.post('/note-informatique/valider', keycloak.enforcer(['note_informatique:valider'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    return res.status(200).end('success');
});


// ANGLAIS 

app.get('/note-anglais/lire', keycloak.enforcer(['note_anglais:lire'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    return res.render(lire)
});

app.post('/note-anglais/ecrire', keycloak.enforcer(['note_anglais:ecrire'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    return res.status(200).end('success');
});

app.post('/note-anglais/valider', keycloak.enforcer(['note_anglais:valider'], {
    resource_server_id: 'universite-app'
}), (req, res) => {
    return res.status(200).end('success');
});

// CAS ERREUR

app.use((req, res, next) => {
    return res.status(404).end('Not Found');
});

app.use((err, req, res, next) => {
    return res.status(req.errorCode ? req.errorCode : 500).end(req.error ? req.error.toString() : 'Internal Server Error');
});

// ECOUTE PORT

const server = app.listen(3000, '127.0.0.1', () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Application running at http://%s:%s', host, port);
});