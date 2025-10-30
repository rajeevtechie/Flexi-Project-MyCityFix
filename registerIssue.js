document.getElementById("issueform").addEventListener("submit", async function(e) {
  e.preventDefault();

  const submitButton = document.getElementById('submit-button');
  const formData = new FormData();
  const fileInput = document.getElementById('file');

  // Disable button and show loading text
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting... ⏳';

  // Append all the text fields
  formData.append('title', document.getElementById('title').value);
  formData.append('category', document.getElementById('category').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('address', document.getElementById('address').value);

  // Append the file if one was selected
  if (fileInput.files[0]) {
    formData.append('file', fileInput.files[0]);
  }

  try {
    const response = await fetch('http://localhost:3000/api/issues', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      // If the server response is not ok, throw an error
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit issue.');
    }

    // If successful, redirect to the website page
    window.location.href = "website.html";

  } catch (error) {
    console.error('Error submitting issue:', error);
    alert(`❌ Error: ${error.message}`);
  } finally {
    // This block runs whether the submission succeeded or failed
    // Re-enable the button and restore original text
    submitButton.disabled = false;
    submitButton.textContent = 'Submit Issue';
  }
});