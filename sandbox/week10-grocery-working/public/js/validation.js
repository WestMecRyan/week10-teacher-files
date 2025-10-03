document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, looking for form...');
  const form = document.getElementById('submit-grocery');
  console.log('Form found:', form);

  if (!form) {
    console.error('Form with ID "submit-fruit" not found!');
    return;
  }

  form.addEventListener('submit', async function (e) {
    console.log('Form submitted!');
    e.preventDefault();
    const formData = new FormData(this);
    const requiredFields = document.querySelectorAll('input[required]');

    // Simple validation - check all required fields have values
    let allValid = true;
    requiredFields.forEach((input) => {
      const value = formData.get(input.name);
      if (!value || !value.trim()) {
        allValid = false;
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }
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
    console.log('Submitting:', submitData);
    async function postNewForm() {
      return fetch('/groceryInventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });
    }

    try {
      const response = await postNewForm();
      if (!response.ok) {
        throw new Error('problem with response');
      }
      const data = await response.json();
      console.log('data received from server', data);
      if (data.success && data.redirectTo) {
        window.location.replace(data.redirectTo);
      }
    } catch (err) {
      console.log('There was a problem', err);
    }
  });
});
