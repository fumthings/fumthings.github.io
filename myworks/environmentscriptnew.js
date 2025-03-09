// Get all year links
const yearLinks = document.querySelectorAll('.year');

// Get the year info container
const yearInfoContainer = document.getElementById('year-info');

// Load the JSON file containing the year data
fetch('yearData.json')
    .then(response => response.json())
    .then(data => {
        // Add click event listeners to each year link
        yearLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();  // Prevent default link behavior
                
                const year = event.target.getAttribute('data-year');  // Get the year clicked
                const yearData = data[year];  // Get the data for the selected year
                
                // Start constructing the HTML for the year info
                let htmlContent = `<h2>Rainfall data for ${year}</h2>`;

                // Display the months for the selected year first
                htmlContent += `<div><h3>Monthly Rainfall for ${year}</h3>`;
                yearData.months.forEach(monthData => {
                    htmlContent += `
                        <div>
                            <h4>${monthData.month}</h4>
                            <img src="${monthData.image}" alt="${monthData.alt}">
                            <p><a href="${monthData.csv}">Download CSV for ${monthData.month} ${year}</a></p>
                        </div>
                    `;
                });
                htmlContent += '</div>';

                // Then, display the year total
                htmlContent += `
                    <div>
                        <h3>Total Rainfall for ${year}</h3>
                        <img src="${yearData.yearTotal.image}" alt="${yearData.yearTotal.alt}">
                        <p><a href="${yearData.yearTotal.csv}">Download CSV for ${year}</a></p>
                    </div>
                `;
                
                // Display previous years (e.g., 2005 to 2024) - Only year total, no months
                htmlContent += `<div><h3>Previous Years Data</h3>`;
                Object.keys(data).forEach(prevYear => {
                    if (parseInt(prevYear) < parseInt(year)) {
                        const prevYearData = data[prevYear];
                        htmlContent += `
                            <div>
                                <h4>${prevYear}</h4>
                                <img src="${prevYearData.yearTotal.image}" alt="${prevYearData.yearTotal.alt}">
                                <p><a href="${prevYearData.yearTotal.csv}">Download CSV for ${prevYear}</a></p>
                            </div>
                        `;
                    }
                });
                htmlContent += '</div>';

                // Inject the constructed HTML into the #year-info container
                yearInfoContainer.innerHTML = htmlContent;
            });
        });
    })
    .catch(error => {
        console.error('Error loading the year data:', error);
        yearInfoContainer.innerHTML = '<p>Failed to load data. Please try again later.</p>';
    });
