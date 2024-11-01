
// Connect to the server

const socket = io(BASE_URL);
// const socket = io('http://localhost:5137');

// Get references to DOM elements
const searchInput = document.getElementById('explore-search');
const searchButton = document.querySelector('.explore-search-bar button');
const resultsContainer = document.getElementById('explore-search-results');

// Listen for click event on search button
searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    searchArticles();
});

// Optionally, trigger search on Enter key press within the input field
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchArticles();
    }
});

searchInput.addEventListener("input", () => {
    
    if (searchInput.value === "") {
        resultsContainer.innerHTML = ''; 
        resultsContainer.setAttribute('aria-hidden', 'true');
    }
})
function searchArticles() {
    const loader = new Loader('loader', 300);
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;

    // Start the loading animation
    loader.start();

    // Emit search event to the server
    socket.emit('search', searchTerm);

    // Listen for search results
    socket.on('searchResults', (data) => {
        // Stop the loading animation once data is received
        loader.stop();

        // Display the search results in explore-search-results
        const resultsContainer = document.getElementById('explore-search-results');
        resultsContainer.innerHTML = ''; // Clear previous results

        if (data.error) {
            resultsContainer.innerHTML = `<p>Error: ${data.error}</p>`;
        } else {
            data.forEach((article) => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('search-result');
                const readingCard = createSearchResultsCard(article)
                articleElement.append(readingCard);
                resultsContainer.appendChild(articleElement);
            });
        }

        resultsContainer.setAttribute('aria-hidden', 'false'); // Show results
    });
}