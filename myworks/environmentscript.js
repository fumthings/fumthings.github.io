// Get all year links
const yearLinks = document.querySelectorAll('.year');

// Get the year info container
const yearInfoContainer = document.getElementById('year-info');

// Add click event listeners to each year link
yearLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();  // Prevent default link behavior
        
        const year = event.target.getAttribute('data-year');  // Get the year clicked
        const filePath = `myenvironment${year}.html`;  // Path to the corresponding year file
        
        // Use Fetch API to load the year-specific HTML file
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load content. Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                // Inject the fetched HTML into the #year-info container
                yearInfoContainer.innerHTML = data;
            })
            .catch(error => {
                // Handle error if the request fails
                yearInfoContainer.innerHTML = `<h2>Error loading content for ${year}</h2><p>${error.message}</p>`;
            });
    });
});
