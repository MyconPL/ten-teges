// 1. Minimalny start Express (app.js)

const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Serwer działa na ${PORT}`);
});


// 2. Middleware globalny

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});


// 3. Pliki statyczne (public/)

app.use(express.static('public'));


// 4. Zwykła trasa GET

app.get('/', (req, res) => {
  res.send('Witaj!');
});


// 5. Kilka tras

app.get('/glowna', (req, res) => {
  res.send('Strona główna');
});

app.get('/kontakt', (req, res) => {
  res.send('Kontakt');
});


// 6. Parametry URL (:id)

app.get('/uczen/:id', (req, res) => {
  const id = req.params.id;

  res.send(`ID: ${id}`);
});


// 7. Query string (?imie=)

app.get('/szukaj', (req, res) => {
  const imie = req.query.imie;

  res.send(imie || 'Brak imienia');
});


// 8. REST API – GET + POST

let uczniowie = [];

app.get('/uczniowie', (req, res) => {
  res.json(uczniowie);
});

app.post('/uczniowie', (req, res) => {
  const nowy = req.body;

  uczniowie.push(nowy);

  res.status(201).json(nowy);
});


// 9. Cookies

// instalacja:
// npm install cookie-parser

const cookieParser = require('cookie-parser');

app.use(cookieParser());

// ustaw cookie
res.cookie('user', 'Jan');

// odczytaj cookie
req.cookies.user;

// usuń cookie
res.clearCookie('user');


// 10. Redirect

res.redirect('/login');


// 11. 404 (zawsze na końcu)

app.use((req, res) => {
  res.status(404).send('Nie znaleziono');
});


// 12. Frontend fetch GET

const res = await fetch('/glowna');

const text = await res.text();


// 13. Frontend fetch POST

await fetch('/uczniowie', {
  method: 'POST',

  headers: {
    'Content-Type': 'application/json'
  },

  body: JSON.stringify({
    imie: 'Kacper',
    klasa: '3A'
  })
});


// 14. Event listener przycisku

btn.addEventListener('click', () => {
  console.log('klik');
});


// 15. Aktualny czas

setInterval(() => {
  console.log(
    new Date()
      .toLocaleTimeString('pl-PL')
  );
}, 1000);

// app.use() → middleware
// app.get() → pobieranie
// app.post() → dodawanie
// req.params → /id
// req.query → ?x=1
// req.body → dane POST
// res.send() → tekst / HTML
// res.json() → JSON
// res.redirect() → przekierowanie
// res.status(404) → błąd
// next() → puść dalej middleware
