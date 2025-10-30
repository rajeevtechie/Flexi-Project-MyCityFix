async function loadIssues() {
  try {
    const response = await fetch('http://localhost:3000/api/issues');
    if (!response.ok) {
        throw new Error('Failed to fetch issues.');
    }
    const issues = await response.json();
    const list = document.querySelector(".js-posts");
    list.innerHTML = ""; // Clear any existing content

    // Display message if there are no issues
    if (issues.length === 0) {
      list.innerHTML = "<p>No issues have been reported yet. Be the first!</p>";
      return;
    }

    issues.forEach(issue => {
      const div = document.createElement("div");
      
      let mediaHtml = '';
      if (issue.imageUrl) {
        // Correct the path for display
        const correctedPath = issue.imageUrl.replace(/\\/g, '/');
        mediaHtml = `<img src="http://localhost:3000/${correctedPath}" alt="${issue.title}" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;">`;
      }

      div.innerHTML = `
        <h3>${issue.title}</h3>
        ${mediaHtml}
        <p><b>Category:</b> ${issue.category}</p>
        <p><b>Description:</b> ${issue.description}</p>
        <p><b>Location:</b> ${issue.address}</p>
        <p><b>Status:</b> <strong>${issue.status}</strong></p>
        <small>Reported on: ${new Date(issue.createdAt).toLocaleDateString()}</small>
        <hr>
      `;
      list.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching issues:', error);
    const list = document.querySelector(".js-posts");
    list.innerHTML = "<p>Could not load issues. Please try again later.</p>";
  }
}

// --- KEY CHANGE IS HERE ---
// Instead of 'DOMContentLoaded', we listen for the 'pageshow' event.
// This ensures the data is re-fetched every time the page is displayed,
// including when navigating back with the browser's back button or a link.
window.addEventListener('pageshow', function(event) {
  loadIssues();
});