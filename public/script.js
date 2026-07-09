const API_URL = "https://event-registration-api-ogpe.onrender.com";
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

// UTILITY: Get category badge class

function getCategoryBadgeClass(category) {
    const map = {
        'Music': 'badge-music',
        'Technology': 'badge-technology',
        'Business': 'badge-business',
        'Sports': 'badge-sports',
        'Workshop': 'badge-workshop'
    };
    return map[category] || 'badge-default';
}


// UTILITY: Get category image fallback

function getCategoryIcon(category) {
    const map = {
        'Music': 'fa-music',
        'Technology': 'fa-laptop-code',
        'Business': 'fa-briefcase',
        'Sports': 'fa-futbol',
        'Workshop': 'fa-tools'
    };
    return map[category] || 'fa-calendar-alt';
}

// ============================================
// NAVIGATION SETUP
// ============================================
function initializeNavigation() {
    const userDisplay = document.getElementById("userDisplay");
    const authLinks = document.getElementById("authLinks");
    const logoutBtn = document.getElementById("logoutBtn");
    const filterActions = document.getElementById("filterActions");
    const adminLink = document.getElementById("adminLink");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navbarContainer = document.querySelector(".navbar-container");

    if (mobileMenuBtn && navbarContainer) {
        const navMenu = navbarContainer.querySelector(".nav-menu");
        const navAuth = navbarContainer.querySelector(".nav-auth");

        if (navMenu && navAuth) {
            const closeMobileMenu = () => {
                if (window.innerWidth <= 768) {
                    navbarContainer.classList.remove("menu-open");
                    mobileMenuBtn.setAttribute("aria-expanded", "false");
                    const icon = mobileMenuBtn.querySelector("i");
                    if (icon) icon.className = "fas fa-bars";
                }
            };

            mobileMenuBtn.addEventListener("click", () => {
                const isOpen = navbarContainer.classList.toggle("menu-open");
                mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
                const icon = mobileMenuBtn.querySelector("i");
                if (icon) {
                    icon.className = isOpen ? "fas fa-times" : "fas fa-bars";
                }
            });

            navMenu.querySelectorAll(".nav-link").forEach((link) => {
                link.addEventListener("click", closeMobileMenu);
            });

            navAuth.querySelectorAll("a, button").forEach((element) => {
                element.addEventListener("click", closeMobileMenu);
            });

            window.addEventListener("resize", () => {
                if (window.innerWidth > 768) {
                    navbarContainer.classList.remove("menu-open");
                    mobileMenuBtn.setAttribute("aria-expanded", "false");
                    const icon = mobileMenuBtn.querySelector("i");
                    if (icon) icon.className = "fas fa-bars";
                }
            });
        }
    }

    if (token && user) {
        if (userDisplay) {
            userDisplay.style.display = "flex";
            userDisplay.innerHTML = `
                <div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div>
                <span>${user.name}</span>
            `;
        }
        if (authLinks) authLinks.style.display = "none";
        if (logoutBtn) {
            logoutBtn.style.display = "inline-flex";
            logoutBtn.addEventListener("click", handleLogout);
        }
        if (filterActions) filterActions.style.display = "flex";
        if (adminLink && user.role === "admin") {
            adminLink.style.display = "inline-flex";
        }
    }
}

function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberEmail");
    window.location.href = "index.html";
}

// ============================================
// EVENT CARD CREATION
// ============================================
function createEventCard(event) {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    const location = event.location || 'Location TBA';
    const category = event.category || 'Event';
    const badgeClass = getCategoryBadgeClass(category);
    const icon = getCategoryIcon(category);

    const imageHtml = event.image
        ? `<img src="${event.image}" alt="${event.title}" loading="lazy">`
        : `<i class="fas ${icon}"></i>`;

    return `
        <div class="event-card" id="event-card-${event._id}">
            <div class="event-image">
                ${imageHtml}
                <span class="event-category-badge ${badgeClass}">${category}</span>
            </div>
            
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                
                <div class="event-meta">
                    <div class="event-meta-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${formattedDate}</span>
                    </div>
                    <div class="event-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${location}</span>
                    </div>
                </div>
                
                <p class="event-description">
                    ${event.description || 'No description available'}
                </p>
                
                <div class="event-actions">
                    <a href="event-detail.html?id=${event._id}" class="btn btn-primary" id="view-details-${event._id}">
                        <i class="fas fa-eye"></i> View Details
                    </a>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// EVENT LOADING & FILTERING
// ============================================
let allEvents = [];

async function loadEvents() {
    try {
        const response = await fetch(`${API_URL}/events`);

        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        
        allEvents = await response.json();
        renderEvents(allEvents);
    } catch (error) {
        showErrorMessage("Error loading events: " + error.message);
    }
}

function renderEvents(events) {
    const container = document.getElementById("events");
    
    if (!container) return;

    if (events.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-calendar-times"></i>
                <p>No events found. Try a different search.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = events.map(event => createEventCard(event)).join("");
}

function filterEvents() {
    const searchQuery = document.getElementById("searchInput")?.value.toLowerCase() || "";
    const categoryFilter = document.getElementById("categoryFilter")?.value || "";

    const filtered = allEvents.filter(event => {
        const matchesSearch = !searchQuery || 
            event.title.toLowerCase().includes(searchQuery) ||
            event.description?.toLowerCase().includes(searchQuery) ||
            event.location?.toLowerCase().includes(searchQuery);
        
        const matchesCategory = !categoryFilter || 
            event.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    renderEvents(filtered);
}

// ============================================
// ERROR DISPLAY
// ============================================
function showErrorMessage(message) {
    const container = document.getElementById("events");
    if (container) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
            </div>
        `;
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation();

    const hasEventsSection = document.getElementById("events");
    const hasFilters = document.getElementById("searchInput") || document.getElementById("categoryFilter");

    if (hasEventsSection || hasFilters) {
        loadEvents();
    }

    // Setup search and filter listeners
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    if (searchInput) {
        searchInput.addEventListener("input", filterEvents);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterEvents);
    }
});