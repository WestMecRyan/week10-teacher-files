const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const { groceryName } = require('./views/groceryInputs.config.js');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;
let db;

MongoClient.connect(MONGODB_URI)
  .then((client) => {
    console.log('✅ Connected to MongoDB Atlas!');
    db = client.db(`${process.env.MONGO_DB}`);
  })
  .catch((error) => console.error('❌ MongoDB Connection Error', error));

app.get('/', (req, res) => {
  res.render('groceryForm', { groceryName });
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
