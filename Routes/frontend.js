import express from 'express';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../Models/User.js';

const router = express.Router();
const API_BASE = 'http://localhost:5000/api/contact';

// Middleware to check login
function requireLogin(req, res, next) {
  if (!req.session.token) return res.redirect('/login');
  next();
}

// Show Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send("❌ User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("❌ Invalid credentials");

  const token = jwt.sign({ userId: user._id }, process.env.JWT, { expiresIn: '1d' });
  req.session.token = token;
  req.session.userId = user._id;
  res.redirect('/');
});


// ✅ Logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Logout error:", err);
      return res.send("❌ Failed to logout");
    }
    res.redirect('/login'); // 👈 redirect to login page after logout
  });
});


// Get All Contacts
router.get('/', requireLogin, async (req, res) => {
  const response = await fetch(`http://localhost:5000/api/contact/userid/${req.session.userId}`, {
    headers: { Auth: req.session.token }
  });

  const data = await response.json();
  res.render('index', { contacts: data.userContact || [] });
});


// Add Form
router.get('/add', requireLogin, (req, res) => {
  res.render('add');
});

// Handle Add
router.post('/add', requireLogin, async (req, res) => {
  await fetch(`${API_BASE}/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Auth: req.session.token
    },
    body: JSON.stringify(req.body)
  });
  res.redirect('/');
});

// Edit Form
router.get('/edit/:id', requireLogin, async (req, res) => {
  const response = await fetch(`${API_BASE}/${req.params.id}`, {
    headers: { Auth: req.session.token }
  });
  const data = await response.json();
  res.render('edit', { contact: data.userContact });
});

// Handle Edit
router.post('/edit/:id', requireLogin, async (req, res) => {
  await fetch(`${API_BASE}/${req.params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Auth: req.session.token
    },
    body: JSON.stringify(req.body)
  });
  res.redirect('/');
});

// Delete
router.get('/delete/:id', requireLogin, async (req, res) => {
  await fetch(`${API_BASE}/${req.params.id}`, {
    method: 'DELETE',
    headers: {
      Auth: req.session.token
    }
  });
  res.redirect('/');
});

export default router;
