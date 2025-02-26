// Get all year links
const yearLinks = document.querySelectorAll('.year');

// Get the year info container
const yearInfoContainer = document.getElementById('year-info');

// Add click event listeners to each year link
yearLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();  // Prevent default link behavior
        
        const year = event.target.getAttribute('data-year');  // Get the year clicked
        const filePath = `${year}.html`;  // Path to the corresponding year file
        
        // Create a new XMLHttpRequest to load the year-specific HTML file
        const xhr = new XMLHttpRequest();
        xhr.open('GET', filePath, true);
        
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Successful response: Inject content into the #year-info container
                yearInfoContainer.innerHTML = xhr.responseText;
            } else {
                // Handle error if the request was unsuccessful
                yearInfoContainer.innerHTML = `<h2>Error loading content for ${year}</h2><p>Status: ${xhr.status}</p>`;
            }
        };
        
        xhr.onerror = function() {
            // Handle network or request errors
            yearInfoContainer.innerHTML = `<h2>Error loading content for ${year}</h2><p>Network error.</p>`;
        };
        
        xhr.send();
    });
});
