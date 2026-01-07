const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let users = fs.existsSync('users.json') ? JSON.parse(fs.readFileSync('users.json')) : [];

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public/register.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public/login.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public/about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public/contact.html')));

// Registration
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required.' });
    if (users.find(u => u.email === email)) return res.status(400).json({ message: 'User exists.' });
    users.push({ name, email, password });
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.json({ message: 'Registration successful! Welcome.' });
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ message: `Welcome back, ${user.name}!` });
    } else {
        res.status(401).json({ message: 'Invalid email or password.' });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));