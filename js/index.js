const BASE_URL = "https://noahsproject-backend.onrender.com";
// const BASE_URL = "http://localhost:5137";

const addToFavorites = (button) => {
    const icon = button.querySelector('i');
    if (button.getAttribute("data-bookmarked") === "false") {
        // add to bookmarks
        icon.className = "fa-solid fa-bookmark";
        icon.style.color = "#f8913d";

        button.setAttribute("data-bookmarked", "true");
    }
    else {
        // remove from bookmarks
        icon.className = "fa-regular fa-bookmark";
        icon.style.color = "var(--text)";
        button.setAttribute("data-bookmarked", "false");
    }
}

const addToLikedVerses = (button) => {
    const icon = button.querySelector('i');
    if (button.getAttribute("data-liked") === "false") {
        // add to likes
        icon.className = "fa-solid fa-heart";
        icon.style.color = "red";

        button.setAttribute("data-liked", "true");
    }
    else {
        // remove from likes
        icon.className = "fa-solid fa-heart";
        icon.style.color = "var(--text)";
        button.setAttribute("data-liked", "false");
    }
}

const openPodcastModal = (podcast_id) => {
    const openedPodcastModal = document.getElementById("podcast-modal");

    if (!openedPodcastModal) {
        const podcastModal = createPodcastModal(podcast_id);
        document.getElementById("container_wrapper_main").append(podcastModal);
    }

    else {
        document.getElementById("container_wrapper_main").removeChild(openedPodcastModal);
    }
}

const closePodcastModal = (button) => {
    const openedPodcastModal = document.getElementById("podcast-modal");
    const overlay = document.getElementById("modal-overlay");

    if (openedPodcastModal) {
        // Remove the modal and overlay from the DOM
        document.getElementById("container_wrapper_main").removeChild(openedPodcastModal);
        document.getElementById("container_wrapper_main").removeChild(overlay);
    }
}

const shareBibleVerse = (button) => {
    // TODO: implement functionality
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const getPodcastPicks = () => {

    const url = `${BASE_URL}/podcasts/all`;

    fetch(url)
        .then(async res => {
            const data = await res.json();
            console.log(data)
            const recommended = [...shuffleArray(data.data)].slice(0, 5);
            recommended.forEach(podcast => {
                const podcastItem = createPodcastInlineItem(podcast);
                document.getElementById("trending-podcast-cards").append(podcastItem)
            })

        })
        .catch(error => {
            console.error(error);
        })
}

const getRecommendedReadingCards = async () => {

    let data = null;
    const now = new Date().getUTCDate();
    const ls_data = localStorage.getItem("rec-articles") ? JSON.parse(localStorage.getItem("rec-articles")) : null;

    if (ls_data) {

        if (ls_data.time === now) {
            //same day
            data = ls_data.articles;
        }
        else {
            const response = await fetch(`${BASE_URL}/articles/random`);
            data = await response.json();
            const _storeDate = new Date().getUTCDate();
            localStorage.setItem("rec-articles", JSON.stringify({ time: _storeDate, articles: data }));

        }
    }
    else {
        const response = await fetch(`${BASE_URL}/articles/random`);
        data = await response.json();
        const _storeDate = new Date().getUTCDate();
        localStorage.setItem("rec-articles", JSON.stringify({ time: _storeDate, articles: data }));

    }

    console.log(data);
    for (let article of data) {
        const readingCard = createRecommendedReadingCard(article);
        document.getElementById("r-reading-cards").append(readingCard);
    }
}

const playPodcastInline = (button, audioSrc) => {
    // location.href = "pages/podcasts.html";
    const audio = document.createElement("audio");
    const currentMediaIsPlaying = button.getAttribute("data-media-playing");

    if (currentMediaIsPlaying === "false") {
        button.setAttribute("data-media-playing", "true");
        audio.setAttribute("src", audioSrc);
        audio.setAttribute("autoplay", 'true');
        audio.setAttribute("style", "visibility: hidden; position: top: -100%; z-index: -9999;");
        audio.setAttribute("data-media-inPlay", "true");
        document.getElementById("trending-podcasts").append(audio)
        audio.play();


        const iconBtn = button.querySelector('.fa-solid.fa-play');
        iconBtn.className = "fa-solid fa-pause"
    }

    else if (currentMediaIsPlaying === "true") {
        const _audio = document.querySelector('[data-media-inPlay="true"]');
        _audio.pause();
        _audio.remove();

        const iconBtn = button.querySelector('.fa-solid.fa-pause');
        iconBtn.className = "fa-solid fa-play"

        button.setAttribute("data-media-playing", "false");
    }
}



const openReadRecommendedChapter = (article_id) => {
    const ls_data = localStorage.getItem("rec-articles") ? JSON.parse(localStorage.getItem("rec-articles")) : null;

    if (ls_data) {
        ls_data.articles.forEach(article => {
            if (article["article_id"].toString() === article_id) {
                console.log(article)
                localStorage.setItem('read-article', JSON.stringify(article))
                location.href = "./pages/read_chapter.html";
            }
        })
    }
}

const showDevotionalExpanded = () => {
    document.getElementById("devotional-expanded").toggleAttribute("aria-hidden")
}

const hideDevotionalExpanded = () => {
    document.getElementById("devotional-expanded").setAttribute("aria-hidden", "true")
}

const getDailyDevotional = async () => {
    try {
        // Fetch the daily devotional data from the server
        const response = await fetch(`${BASE_URL}/devotionals`);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`Error fetching devotional: ${response.statusText}`);
        }

        // Parse the response as JSON
        const devotional = await response.json();

        // Extract theme title using regex
        const themeMatch = devotional.introtext.match(/<strong>THEME:\s*([\s\S]*?)<\/strong>/i);
        const themeTitle = themeMatch ? themeMatch[1].trim() : 'No Theme Title Available';

        // Format the date
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.toLocaleString('default', { month: 'short' });
        const year = currentDate.getFullYear();

        // Format day with ordinal suffix
        const ordinalSuffix = (d) => {
            if (d > 3 && d < 21) return 'th'; // for numbers like 11, 12, 13
            switch (d % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
        const formattedDate = `${day}${ordinalSuffix(day)} ${month}, ${year}`;

        // Remove the <img> tag from the introtext
        const cleanedIntroText = devotional.introtext.replace(/<img[^>]*>/i, '');

        document.getElementById("devotional-title").innerText = themeTitle;
        document.getElementById("devotional-message").innerHTML = cleanedIntroText

        document.getElementById("d-e-title").innerText = themeTitle;
        document.getElementById("d-e-message").innerHTML = `
            <div>${cleanedIntroText}</div>
            <div>${devotional.fulltext}</div>
        `
    } catch (error) {
        // Handle any errors that occur during fetch
        console.error('Error retrieving the devotional:', error);
    }
};

const getVideoIframes = async (url) => {
    const loader = new Loader('loader', 300);
    loader.start();
    const response = await fetch(`${BASE_URL}${url}`);
    const data = [...await response.json()].slice(0, 5);
    loader.stop();

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "video-card";

        card.innerHTML = `
        <div class="video-thumbnail">
            ${item.article_intro}
        </div>
        <div class="video-info">
            <h3 class="video-title">${item.article_title}</h3>
            <div class="video-meta">
                <span class="video-date">${item.date || 'Unknown Date'}</span>
                <span class="video-views">${item.play_count || 0} views</span>
            </div>
        </div>
    `;
        document.getElementById('vid-grid').append(card);
    });
}

const openShop = () => {
    window.location.href = "https://noahsproject.org/shop/e-book-store"
}

const onDeviceReady = async () => {
    getDailyDevotional();
    getPodcastPicks();
    getRecommendedReadingCards();

    const urls= [
        '/articles/wisdom-nuggets',
        '/articles/motivationals',
        '/articles/5-minutes-inspirational',
        '/articles/the-testimony-of-jesus-christ',
    ]

    const getRandomUrl = () => {
        const randomIndex = Math.floor(Math.random() * urls.length);
        return urls[randomIndex];
    };

    const randomUrl = getRandomUrl(); // Get a random URL
    await getVideoIframes(randomUrl);
}
// document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('DOMContentLoaded', onDeviceReady);