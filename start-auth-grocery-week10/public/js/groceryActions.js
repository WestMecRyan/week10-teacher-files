// Grocery management functions
function editGrocery(id, groceryName) {
  const displayDiv = document.getElementById(`display-${id}`);
  const editDiv = document.getElementById(`edit-${id}`);

  displayDiv.style.display = 'none';
  editDiv.style.display = 'block';
}

function cancelEdit(id) {
  const displayDiv = document.getElementById(`display-${id}`);
  const editDiv = document.getElementById(`edit-${id}`);

  displayDiv.style.display = 'block';
  editDiv.style.display = 'none';
}

async function updateGrocery(id) {
  const groceryName = document.getElementById(`groceryName-${id}`).value;

  if (!groceryName.trim()) {
    alert('grocery name cannot be empty');
    return;
  }

  try {
    const response = await fetch(`/groceries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groceryName: groceryName.trim() }),
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
    if (groceryElement) {
      groceryElement.remove();
    }

    // Check if there are no more groceries and show the empty message
    const remainingGroceries = document.querySelectorAll('[id^="grocery-"]');
    if (remainingGroceries.length === 0) {
      window.location.reload();
    }
  } catch (error) {
    console.error('Error deleting grocery:', error);
    alert('Failed to delete grocery item');
  }
}
