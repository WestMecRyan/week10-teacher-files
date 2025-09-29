Here are the files with lines scrambled WITHIN each section as well:

 students need to:
1. Rearrange the major sections into the correct order
2. Fix the line order WITHIN each section as indicated by the comments

## server.js (SCRAMBLED VERSION)

```javascript
// ========== SECTION A: Place this section LAST ==========
app.listen(3000, () => {
  console.log(`App is listening on 3000`);
});

// ========== SECTION B: Place this section THIRD ==========
app.get('/', (req, res) => {
  res.render('groceryForm', { groceryName });
});

// ========== SECTION C: Place this section FIRST ==========
// LINE C3: Move this line to position 2 within Section C
const { groceryName } = require('./views/groceryInputs.config.js');
// LINE C1: Move this line to position 1 within Section C
const express = require('express');
// LINE C4: Move this line to position 4 within Section C
require('dotenv').config();
// LINE C2: Move this line to position 3 within Section C
const { MongoClient, ObjectId } = require('mongodb');

// ========== SECTION D: Place this section FOURTH ==========
// -------------------------ROUTES---------------------------- //
// --------  GET------------------//
app.get('/groceryInventory', async (req, res) => {
  try {
    // LINE D3: Move this line to position 3 within try block
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
    // LINE D1: Move this line to position 1 within try block
    const data = await db
      .collection(`${process.env.MONGO_COLLECTION}`)
      .find({})
      .toArray();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== SECTION E: Place this section FIFTH ==========
// ----------POST---------- //
app.post('/groceryInventory', async (req, res) => {
  try {
    // SUBSECTION E2: Place this subsection SECOND within POST route
    if (req.accepts('html')) {
      // Browser form submission - redirect to the list page
      res.redirect('/groceryInventory');
    } else {
      // REST client request - send JSON
      // LINE E2-4: Move this line to position 4 within else block
      res.status(201).json({
        // LINE E2-1: Move this line to position 1 within json object
        success: true,
        // LINE E2-5: Move this line to position 5 within json object
        data: { _id: result.insertedId, ...req.body },
        // LINE E2-3: Move this line to position 3 within json object
        insertedId: result.insertedId,
        // LINE E2-4: Move this line to position 4 within json object
        redirectTo: '/groceryInventory',
        // LINE E2-2: Move this line to position 2 within json object
        message: 'Grocery created successfully!',
      });
    }

    // SUBSECTION E1: Place this subsection FIRST within POST route
    const result = await db
      .collection(`${process.env.MONGO_COLLECTION}`)
      .insertOne(req.body);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== SECTION F: Place this section SECOND ==========
// LINE F5: Move this line to position 5 within Section F
app.set('view engine', 'ejs');
// LINE F1: Move this line to position 1 within Section F
const app = express();
// LINE F3: Move this line to position 3 within Section F
app.use(express.urlencoded({ extended: true }));
// LINE F8: Move this line to position 8 within Section F
let db;
// LINE F2: Move this line to position 2 within Section F
app.use(express.json());
// LINE F4: Move this line to position 4 within Section F
app.use(express.static('public'));
// LINE F7: Move this line to position 7 within Section F
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;
// LINE F9: Move this line to position 9 within Section F
MongoClient.connect(MONGODB_URI)
  .then((client) => {
    console.log('✅ Connected to MongoDB Atlas!');
    db = client.db(`${process.env.MONGO_DB}`);
  })
  .catch((error) => console.error('❌ MongoDB Connection Error', error));
```

---

## views/partials/form-input.ejs (SCRAMBLED VERSION)

```ejs
<!-- ========== SECTION C: Place this section THIRD ========== -->
    <div class="custom-validation">
      <!-- LINE C4: Move this line to position 4 within input tag -->
      name="<%= name %>"
      <!-- LINE C1: Move this line to position 1 within input tag -->
      type="<%= type %>"
      <!-- LINE C5: Move this line to position 5 within input tag -->
      <% if (required) { %>required<% } %> />
      <!-- LINE C2: Move this line to position 2 within input tag -->
      class="form-control"
      <!-- LINE C3: Move this line to position 3 within input tag -->
      id="<%= id %>"
      <input
    </div>

<!-- ========== SECTION A: Place this section FIRST ========== -->
  <!-- LINE A2: Move this line to position 2 within Section A -->
  <div class="mb-3">
<!-- LINE A1: Move this line to position 1 within Section A -->
<div class="row">

<!-- ========== SECTION D: Place this section FOURTH ========== -->
  </div>
</div>

<!-- ========== SECTION B: Place this section SECOND ========== -->
    <!-- LINE B2: Move this line to position 2 within Section B -->
      <%= label %>
    <!-- LINE B1: Move this line to position 1 within Section B -->
    <label for="<%= id %>" class="form-label">
    <!-- LINE B3: Move this line to position 3 within Section B -->
    </label>
```

---

## public/js/validation.js (SCRAMBLED VERSION)

```javascript
// ========== SECTION D: Place this section FOURTH ==========
    try {
      // LINE D4: Move this line to position 4 within try block
      if (data.success && data.redirectTo) {
        window.location.replace(data.redirectTo);
      }
      // LINE D1: Move this line to position 1 within try block
      const response = await postNewForm();
      // LINE D3: Move this line to position 3 within try block
      const data = await response.json();
      console.log('data received from server', data);
      // LINE D2: Move this line to position 2 within try block
      if (!response.ok) {
        throw new Error('problem with response');
      }
    } catch (err) {
      console.log('There was a problem', err);
    }
  });
});

// ========== SECTION B: Place this section SECOND ==========
  form.addEventListener('submit', async function (e) {
    // LINE B3: Move this line to position 3 within function start
    const formData = new FormData(this);
    // LINE B1: Move this line to position 1 within function start
    console.log('Form submitted!');
    // LINE B4: Move this line to position 4 within function start
    const requiredFields = document.querySelectorAll('input[required]');
    // LINE B2: Move this line to position 2 within function start
    e.preventDefault();

// ========== SECTION C: Place this section THIRD ==========
    // Simple validation - check all required fields have values
    let allValid = true;
    requiredFields.forEach((input) => {
      const value = formData.get(input.name);
      // LINE C2: Move this line to position 2 within forEach
        input.classList.remove('is-invalid');
      // LINE C1: Move this line to position 1 within forEach
      if (!value || !value.trim()) {
        allValid = false;
        input.classList.add('is-invalid');
      } else {
    });
    if (!allValid) {
      alert('Please fill in all required fields');
      return;
    }
    // Collect all form data
    const submitData = {};
    for (const [key, value] of formData.entries()) {
      if (value.trim()) {
        // Only include non-empty values
        submitData[key] = value.trim();
      }
    }
    // LINE C4: Move this line to position 4 after data collection
    async function postNewForm() {
      return fetch('/groceryInventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });
    }
    // LINE C3: Move this line to position 3 before function definition
    console.log('Submitting:', submitData);

// ========== SECTION A: Place this section FIRST ==========
document.addEventListener('DOMContentLoaded', () => {
  // LINE A3: Move this line to position 3 within event listener
  console.log('Form found:', form);
  // LINE A1: Move this line to position 1 within event listener
  console.log('DOM loaded, looking for form...');
  // LINE A2: Move this line to position 2 within event listener
  const form = document.getElementById('submit-grocery');
  if (!form) {
    console.error('Form with ID "submit-fruit" not found!');
    return;
  }
```

---

## public/js/groceryActions.js (SCRAMBLED VERSION)

```javascript
// ========== SECTION C: Place this section THIRD ==========
async function updateGrocery(id) {
  // LINE C2: Move this line to position 2 within function start
  if (!groceryName.trim()) {
    alert('grocery name cannot be empty');
    return;
  }
  // LINE C1: Move this line to position 1 within function start
  const groceryName = document.getElementById(`groceryName-${id}`).value;
  try {
    const response = await fetch(`/groceries/${id}`, {
      // LINE C4: Move this line to position 4 within fetch options
      body: JSON.stringify({ groceryName: groceryName.trim() }),
      // LINE C3: Move this line to position 3 within fetch options
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Failed to update grocery item');
    }
    // Reload the page to show updated data
    window.location.reload();
  } catch (error) {
    console.error('Error updating grocery:', error);
    alert('Failed to update grocery item');
  }
}

// ========== SECTION A: Place this section FIRST ==========
// Grocery management functions
function editGrocery(id, groceryName) {
  // LINE A2: Move this line to position 2 within function
  const editDiv = document.getElementById(`edit-${id}`);
  // LINE A3: Move this line to position 3 within function
  displayDiv.style.display = 'none';
  // LINE A1: Move this line to position 1 within function
  const displayDiv = document.getElementById(`display-${id}`);
  // LINE A4: Move this line to position 4 within function
  editDiv.style.display = 'block';
}

// ========== SECTION D: Place this section FOURTH ==========
async function deleteGrocery(id) {
  if (!confirm('Are you sure you want to delete this grocery item?')) {
    return;
  }
  try {
    const response = await fetch(`/groceries/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete grocery item');
    }
    // Remove the element from DOM
    const groceryElement = document.getElementById(`grocery-${id}`);
    // LINE D2: Move this line to position 2 after getting element
    const remainingGroceries = document.querySelectorAll('[id^="grocery-"]');
    if (remainingGroceries.length === 0) {
      window.location.reload();
    }
    // LINE D1: Move this line to position 1 after getting element
    if (groceryElement) {
      groceryElement.remove();
    }
    // Check if there are no more groceries and show the empty message
  } catch (error) {
    console.error('Error deleting grocery:', error);
    alert('Failed to delete grocery item');
  }
}

// ========== SECTION B: Place this section SECOND ==========
function cancelEdit(id) {
  // LINE B3: Move this line to position 3 within function
  displayDiv.style.display = 'block';
  // LINE B1: Move this line to position 1 within function
  const displayDiv = document.getElementById(`display-${id}`);
  // LINE B4: Move this line to position 4 within function
  editDiv.style.display = 'none';
  // LINE B2: Move this line to position 2 within function
  const editDiv = document.getElementById(`edit-${id}`);
}
```

