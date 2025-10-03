# Project Structure

Here's where each file should be placed in your project:

## Root Directory
```
your-project/
├── server.js                          ← Replace your existing server.js
├── package.json                       ← Already exists
├── .env                               ← Add JWT_SECRET here
├── views/
│   ├── groceryForm.ejs               ← Already exists
│   ├── groceryList.ejs               ← Already exists
│   ├── adminLogin.ejs                ← NEW - Create this file
│   ├── adminRegister.ejs             ← NEW - Create this file
│   ├── adminDashboard.ejs            ← NEW - Create this file
│   ├── groceryInputs.config.js       ← Already exists
│   └── partials/
│       └── form-input.ejs            ← Already exists
└── public/
    └── js/
        ├── validation.js              ← Already exists
        └── groceryActions.js          ← Already exists
```

## Detailed File Locations

### Files to CREATE:

**1. views/adminLogin.ejs**
- Location: `views/adminLogin.ejs`
- Purpose: Admin login page

**2. views/adminRegister.ejs**
- Location: `views/adminRegister.ejs`
- Purpose: Admin registration page

**3. views/adminDashboard.ejs**
- Location: `views/adminDashboard.ejs`
- Purpose: Admin dashboard after login

### Files to UPDATE:

**4. server.js**
- Location: `server.js` (root directory)
- Action: Replace your existing server.js with the updated version

**5. .env**
- Location: `.env` (root directory)
- Action: Add these lines:
```env
# Existing MongoDB credentials
MONGO_USER=your_user
MONGO_PASS=your_pass
MONGO_CLUSTER=your_cluster
MONGO_DB=your_db
MONGO_COLLECTION=your_collection

# NEW - Add these:
JWT_SECRET=your_super_secret_random_string_at_least_32_chars_long
NODE_ENV=development
```

### Files that STAY THE SAME:
- `public/js/validation.js` - No changes needed
- `public/js/groceryActions.js` - No changes needed
- `views/groceryForm.ejs` - No changes needed
- `views/groceryList.ejs` - No changes needed
- `views/partials/form-input.ejs` - No changes needed
- `views/groceryInputs.config.js` - No changes needed

## Quick Setup Commands

If you're using the terminal, here's how to create the new files:

```bash
# Navigate to your project directory
cd your-project

# Create the new view files
touch views/adminLogin.ejs
touch views/adminRegister.ejs
touch views/adminDashboard.ejs

# Then copy the content from the artifacts into each file
```

## Access Routes After Setup

Once everything is in place:

- **Home/Add Grocery**: `http://localhost:3000/`
- **Admin Registration**: `http://localhost:3000/admin/register`
- **Admin Login**: `http://localhost:3000/admin/login`
- **Admin Dashboard**: `http://localhost:3000/admin/dashboard` (protected)
- **Grocery Inventory**: `http://localhost:3000/groceryInventory` (protected)
- **Logout**: `http://localhost:3000/admin/logout`

## MongoDB Collections

Your database will now have TWO collections:

1. **Your existing grocery collection** (specified in `MONGO_COLLECTION`)
2. **users** (created automatically for admin accounts)

The `users` collection will store:
- username
- email
- password (hashed)
- role
- createdAt
