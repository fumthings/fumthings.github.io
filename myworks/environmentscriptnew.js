// Get all year links
const yearLinks = document.querySelectorAll('.year');

// Get the year info container
const yearInfoContainer = document.getElementById('year-info');

// Variable to hold the year data
let yearData = {};

// Fetch the year data from the JSON file
fetch('yearData.json')
    .then(response => response.json())  // Parse JSON response
    .then(data => {
        yearData = data;  // Store the data for later use
    })
    .catch(error => {
        console.error('Error loading year data:', error);
        yearInfoContainer.innerHTML = `<h2>Error loading year data.</h2>`;
    });

// Add click event listeners to each year link
yearLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();  // Prevent default link behavior

        const year = event.target.getAttribute('data-year');  // Get the year clicked

        // Clear current year info
        yearInfoContainer.innerHTML = `<h2>Loading data for ${year}...</h2>`;

        // Check if year data exists for the clicked year
        const yearContent = yearData[year];

        if (yearContent) {
            let contentHTML = `<h2>Rainfall Data for ${year}</h2>`;

            // Display all months for the selected year
            yearContent.forEach(data => {
                let monthContent = `
                    <h3>My Rainfall ${data.month} ${year}</h3>
                    <img src="${data.imgSrc}" alt="${data.altText}">`;

                // If it's the year total (e.g., "Year Total" for 2024)
                if (data.month === "Year Total") {
                    monthContent += `
                        <h3>Year Total for ${year}</h3>
                        <img src="${data.imgSrc}" alt="${data.altText}">`;
                }

                contentHTML += monthContent;
            });

            // Display the "Year Total" images for all previous years
            const previousYears = Object.keys(yearData).filter(y => parseInt(y) < parseInt(year));
            
            previousYears.forEach(prevYear => {
                const yearTotal = yearData[prevYear].find(data => data.month === "Year Total");
                contentHTML += `
                    <h3>Year Total for ${prevYear}</h3>
                    <img src="${yearTotal.imgSrc}" alt="${yearTotal.altText}">`;
            });

            // Update the container with the year-specific content
            yearInfoContainer.innerHTML = contentHTML;
        } else {
            // Handle case where year data is not available
            yearInfoContainer.innerHTML = `<h2>Sorry, no data available for ${year}.</h2>`;
        }
    });
});
