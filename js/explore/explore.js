const BASE_URL = "https://noahsproject-backend.onrender.com";
const categories = [
    {
        "category_name": "Discipleship",
        "url": `${BASE_URL}/articles/discipleship`,
        "icon": "fa-book",
        "color": "#f03e3e",
        "description": "Deepen your understanding of discipleship."
    },
    {
        "category_name": "Jesus Talk",
        "url": `${BASE_URL}/articles/jesus-talk`,
        "icon": "fa-comments",
        "color": "#17a2b8",
        "description": "Join the conversation about faith and teachings."
    },
    {
        "category_name": "Prayer",
        "url": `${BASE_URL}/articles/prayer`,
        "icon": "fa-praying-hands",
        "color": "#eefcd4",
        "description": "Explore the power of prayer and its impact."
    },
    {
        "category_name": "The Patmos Letters",
        "url": `${BASE_URL}/articles/the-patmos-letters`,
        "icon": "fa-scroll",
        "color": "#dc3545",
        "description": "Read the profound letters from Patmos."
    },
    {
        "category_name": "Spiritual Laws",
        "url": `${BASE_URL}/articles/spiritual-laws`,
        "icon": "fa-balance-scale",
        "color": "#17a2b8",
        "description": "Learn about the spiritual laws that govern our lives."
    },
    {
        "category_name": "Dreams",
        "url": `${BASE_URL}/articles/dreams`,
        "icon": "fa-bed",
        "color": "#20c997",
        "description": "Explore the significance of dreams in faith."
    },
    {
        "category_name": "Decisions",
        "url": `${BASE_URL}/articles/decisions`,
        "icon": "fa-check-circle",
        "color": "#6610f2",
        "description": "Guidance on making important life choices."
    },
    {
        "category_name": "The Testimony Of Jesus Christ",
        "url": `${BASE_URL}/articles/the-testimony-of-jesus-christ`,
        "icon": "fa-cross",
        "color": "#e83e8c",
        "description": "Explore the profound testimonies of faith."
    },
    {
        "category_name": "The Holy Spirit Of God",
        "url": `${BASE_URL}/articles/the-holy-spirit-of-god`,
        "icon": "fa-dove",
        "color": "#007bff",
        "description": "Learn about the role of the Holy Spirit in our lives."
    },
    
    {
        "category_name": "Faith Dimensions",
        "url": `${BASE_URL}/articles/faith-dimensions`,
        "icon": "fa-star",
        "color": "#20c997",
        "description": "Discover the dimensions of faith in your journey."
    },
    {
        "category_name": "Symbols",
        "url": `${BASE_URL}/articles/symbols`,
        "icon": "fa-icons",
        "color": "#fd7e14",
        "description": "Understand the meanings behind spiritual symbols."
    },
    {
        "category_name": "The Tabernacle Prayer",
        "url": `${BASE_URL}/articles/the-tabernacle-prayer`,
        "icon": "fa-prayer",
        "color": "#6610f2",
        "description": "Explore the significance of tabernacle prayers."
    },
    {
        "category_name": "Testimonials",
        "url": `${BASE_URL}/articles/testimonials`,
        "icon": "fa-user-check",
        "color": "#fd7e14",
        "description": "Read inspiring stories from our community."
    },
    
    {
        "category_name": "Motivationals",
        "url": `${BASE_URL}/articles/motivationals`,
        "icon": "fa-lightbulb",
        "color": "#ffc107",
        "description": "Get inspired with our motivational content."
    }

];

const openCategoryOverview = async (title, url) => {
    const loader = new Loader('loader', 300);
    loader.start();
    fetch(url)
    .then(async (res) => {
        const data = await res.json();
        localStorage.setItem('category-articles', JSON.stringify({title, data}));
        loader.stop();
        window.location.href = "./category_overview.html";
    })
    .catch((error) => {
        console.error("error from here: ",error);
    });
}

function createCards() {
    const exploreGrid = document.getElementById('explore-grid');

    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'grid-card';
        card.onclick = () => openCategoryOverview(`${category.category_name}`,category.url);
        card.style.borderColor = category.color;
        card.setAttribute('data-url', category.url);

        const icon = document.createElement('div');
        icon.className = 'card-icon';
        icon.innerHTML = `<i class="fa-solid ${category.icon}" style="color: ${category.color};"></i>`;

        const title = document.createElement('div');
        title.className = 'card-title';
        title.innerHTML = `<p>${category.category_name}</p>`;

        const description = document.createElement('div');
        description.className = 'card-description';
        description.innerHTML = `<p>${category.description}</p>`; 

        card.appendChild(icon);
        card.appendChild(title);
        card.appendChild(description);

        exploreGrid.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    createCards()

})