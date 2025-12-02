// Mock data for client-side search simulation
const mockData = [
    { title: "Refunds Policy", url: "/refunds.html", category: "Legal" },
    { title: "Shipping Information", url: "/shipping.html", category: "Legal" },
    { title: "Privacy Policy", url: "/privacy.html", category: "Legal" },
    { title: "Terms and Conditions", url: "/terms.html", category: "Legal" },
    { title: "Cookie Regulation", url: "/cookies.html", category: "Legal" },
    { title: "Our Best-Selling Fitness Trackers", url: "/products/trackers.html", category: "Products" },
    { title: "Newest Sportswear Collection", url: "/products/apparel.html", category: "Products" },
    { title: "Contact Us", url: "/contact.html", category: "Support" },
];

// JavaScript to handle the universal hamburger menu toggle and search bar
document.addEventListener('DOMContentLoaded', () => {
    // Menu Elements
    const menuWrapper = document.getElementById('menu-wrapper');
    const legalMenu = document.getElementById('legal-menu');

    // Search Elements
    const searchButton = document.getElementById('search-button');
    const searchBarOverlay = document.getElementById('search-bar-overlay');
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results-container');

    let hideTimeout;

    // --- New Helper: Debounce function to limit execution rate of the search function ---
    // This delays the execution of a function until after a user has stopped typing for a specified time (e.g., 300ms).
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // --- Helper Functions ---

    // Renders the search results based on the filtered array
    function renderResults(results) {
        if (results.length === 0) {
            searchResultsContainer.innerHTML = '<p class="p-3 text-gray-400">No results found.</p>';
            searchResultsContainer.classList.add('results-hidden');
            return;
        }

        const html = results.map(item => `
            <a href="${item.url}" class="block p-3 text-sm text-white hover:bg-primary-orange/70 transition duration-150 border-b border-gray-700 last:border-b-0">
                <span class="font-semibold">${item.title}</span>
                <span class="text-xs text-gray-400 ml-2">(${item.category})</span>
            </a>
        `).join('');

        searchResultsContainer.innerHTML = html;
        searchResultsContainer.classList.remove('results-hidden');
        searchResultsContainer.style.maxHeight = '300px'; // Limit height for scrollable results
        searchResultsContainer.style.opacity = '1';

    }

    // Executes the mock client-side search
    function performSearch(query) {
        if (query.length < 2) {
            searchResultsContainer.classList.add('results-hidden');
            searchResultsContainer.innerHTML = '';
            return;
        }

        const lowerCaseQuery = query.toLowerCase();
        const filteredResults = mockData.filter(item =>
            item.title.toLowerCase().includes(lowerCaseQuery) ||
            item.category.toLowerCase().includes(lowerCaseQuery)
        );

        renderResults(filteredResults);

    }

    // --- Event Listeners ---

    // Menu Hover Logic
    menuWrapper.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        legalMenu.classList.remove('hidden');

        // Close search bar when menu opens
        if (!searchBarOverlay.classList.contains('hidden')) {
            searchBarOverlay.classList.add('hidden');
            searchInput.value = '';
            searchResultsContainer.classList.add('results-hidden');
        }

    });

    menuWrapper.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            legalMenu.classList.add('hidden');
        }, 150);
    });

    // Handle search button click: TOGGLE SEARCH BAR
    searchButton.addEventListener('click', () => {
        // Toggle the visibility of the search overlay
        const isHidden = searchBarOverlay.classList.toggle('hidden');

        if (!isHidden) {
            // If search bar is now visible
            searchInput.focus(); // Set focus to the input field
            legalMenu.classList.add('hidden'); // Ensure the legal menu is closed
        } else {
            // If search bar is now hidden
            searchInput.value = ''; // Clear the input field
            searchResultsContainer.classList.add('results-hidden'); // Hide results
        }

    });

    // Handle input change for live search, now using a debounced function
    const debouncedPerformSearch = debounce((query) => {
        performSearch(query);
    }, 300); // Wait 300ms after user stops typing

    searchInput.addEventListener('input', (e) => {
        debouncedPerformSearch(e.target.value.trim());
    });

    // --- Carousel Logic (from index file) ---
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            // Ensure you define the CSS class 'active' to show the slide 
            // and hide others
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Initial display
    showSlide(currentIndex);});