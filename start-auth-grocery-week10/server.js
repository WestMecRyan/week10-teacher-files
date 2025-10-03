const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { groceryName } = require('./views/groceryInputs.config.js');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.set('view engine', 'ejs');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;
let db;

MongoClient.connect(MONGODB_URI)
  .then((client) => {
    console.log('✅ Connected to MongoDB Atlas!');
    db = client.db(`${process.env.MONGO_DB}`);
  })
  .catch((error) => console.error('❌ MongoDB Connection Error', error));

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/admin/login');
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.clearCookie('token');
      return res.redirect('/admin/login');
    }
    req.user = user;
    next();
  });
}
app.get('/', (req, res) => {
  res.render('groceryForm', { groceryName });
});
// ----- admin routes ------//
// Admin login page
app.get('/admin/login', (req, res) => {
  res.render('adminLogin');
});

// Admin registration page (optional - only for creating first admin)
app.get('/admin/register', (req, res) => {
  res.render('adminRegister');
});

// Admin dashboard (protected)
app.get('/admin/dashboard', authenticateToken, (req, res) => {
  res.render('adminDashboard', { user: req.user });
});

// Logout route
app.get('/admin/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/admin/login');
});

// -------- POST Routes ------------------//
// Register admin
app.post('/admin/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await db.collection('users').insertOne({
      username,
      email,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      redirectTo: '/admin/login',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login admin
app.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await db.collection('users').findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.json({
      success: true,
      message: 'Login successful',
      redirectTo: '/admin/dashboard',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// -------------------------ROUTES---------------------------- //
// --------  GET------------------//
app.get('/groceryInventory', async (req, res) => {
  try {
    const data = await db
      .collection(`${process.env.MONGO_COLLECTION}`)
      .find({})
      .toArray();
    if (req.accepts('html')) {
      // Browser request - render the EJS template
      res.render('groceryList', { groceries: data });
    } else {
      // REST client request - send JSON
      res.json({
        success: true,
        count: data.length,
        data,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// ----------POST---------- //

app.post('/groceryInventory', async (req, res) => {
  try {
    const result = await db
      .collection(`${process.env.MONGO_COLLECTION}`)
      .insertOne(req.body);

    // Always return JSON since the form uses fetch
    res.status(201).json({
      success: true,
      message: 'Grocery created successfully!',
      insertedId: result.insertedId,
      redirectTo: '/groceryInventory',
      data: { _id: result.insertedId, ...req.body },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------SERVER LISTEN ---------------//
app.listen(3000, () => {
  console.log(`App is listening on 3000`);
});
