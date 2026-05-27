// app.js
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

// ===== Middleware =====
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ===== Zadanie 1 =====

// GET /
app.get('/', (req, res) => {
  res.send('Witaj na moim serwerze!');
});

// GET /kontakt
app.get('/kontakt', (req, res) => {
  res.json({ email: 'twoj@email.pl' });
});

// GET /o-mnie
app.get('/o-mnie', (req, res) => {
  res.send('<h1>Cześć! Jestem Kacper</h1>');
});

// ===== Zadanie 2 =====

// GET /uczen/:id
app.get('/uczen/:id', (req, res) => {
  res.json({ id: req.params.id });
});

// GET /szukaj?imie=...
app.get('/szukaj', (req, res) => {
  const imie = req.query.imie;

  if (imie) {
    res.json({ szukasz: imie });
  } else {
    res.json({ blad: 'Nie podano imienia' });
  }
});

// ===== Zadanie 4 - REST API =====

const uczniowie = [
  { id: 1, imie: 'Anna' },
  { id: 2, imie: 'Jan' }
];

// GET /uczniowie
app.get('/uczniowie', (req, res) => {
  res.json(uczniowie);
});

// GET /uczniowie/:id
app.get('/uczniowie/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const uczen = uczniowie.find(u => u.id === id);

  if (!uczen) {
    return res.status(404).json({
      blad: 'Nie znaleziono'
    });
  }

  res.json(uczen);
});

// POST /uczniowie
app.post('/uczniowie', (req, res) => {
  uczniowie.push(req.body);

  res.status(201).json(req.body);
});

// ===== Zadanie 5 - Pliki statyczne =====

app.use(express.static('public'));

// ===== Router produkty =====
const produktyRouter = require('./routes/produkty');

app.use('/produkty', produktyRouter);

// ===== Zadanie 6 - Ciastka =====

// login
app.get('/login/:nazwa', (req, res) => {
  const nazwa = req.params.nazwa;

  res.cookie('uzytkownik', nazwa);

  res.send(`Zalogowano jako ${nazwa}`);
});

// profil
app.get('/profil', (req, res) => {
  const user = req.cookies.uzytkownik;

  if (!user) {
    return res.status(401).json({
      blad: 'Nie jesteś zalogowany'
    });
  }

  res.send(`Witaj ${user}`);
});

// logout
app.get('/logout', (req, res) => {
  res.clearCookie('uzytkownik');
  res.send('Wylogowano');
});

// ===== Zadanie 3 - 404 =====

app.use((req, res) => {
  res.status(404).json({
    blad: 'Nie znaleziono strony'
  });
});

// ===== Start serwera =====
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
