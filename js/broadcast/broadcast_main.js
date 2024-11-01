
// const BASE_URL = "http://localhost:5137";
const BASE_URL = "https://noahsproject-backend.onrender.com";

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const getPodcastLists = (button) => {
    const loader = new Loader('loader', 300);
    loader.start();
    document.getElementById('widgets').innerHTML = ""
    const parent = button.parentElement;
    const focusState = button.getAttribute("data-focus");

    if (focusState === "false") {
        const currentFocus = parent.querySelector("div.btn-wrap[data-focus='true']");
        currentFocus.setAttribute("data-focus", "false")
        button.setAttribute("data-focus", "true");
    }

    const filter = button.textContent;

    const content_grid = document.createElement('section');
    content_grid.className = "content_grid";
    content_grid.id = "content_grid";

    const m_player = document.createElement('div');
    m_player.innerHTML = `
        <div class="music-player__toolbar music-toolbar">
            <div class="music-player__sound-wave"><i class="bar"></i><i class="bar"></i><i class="bar"></i><i
                    class="bar"></i><i class="bar"></i><i class="bar"></i><i class="bar"></i><i class="bar"></i><i
                    class="bar"></i><i class="bar"></i><i class="bar"></i><i class="bar"></i><i class="bar"></i><i
                    class="bar"></i><i class="bar"></i><i class="bar"></i><i class="bar"></i><i class="bar"></i>
                <i class="bar"></i><i class="bar"></i>
            </div>

            <div class="player-min">
                <div class="current-playing" id="current-playing-marquee" >
                    No Media Playing
                </div>
                <div class="controls">
                    <i class="fa-solid fa-play" id="play-pause-btn" data-in-play="episode-null" onclick="playPause(this)"></i>
                </div>
            </div>

        </div>
    `;
    content_grid.appendChild(m_player)

    const episode_list = document.createElement("div");
    episode_list.className = "episode-list";
    episode_list.id = "episode-list";

    const url = `${BASE_URL}/podcasts/all`;

    fetch(url)
        .then(async res => {
            const data = await res.json();
            console.log(data)
            const recommended = [...data.data]
            recommended.forEach(podcast => {
                const div = document.createElement('div');
                div.innerHTML = `
            <div class="episode" id="episode-${podcast._id}" onclick="playEpisode(this)" data-is-playing="false" data-src="${podcast.fileUrl}">
                <section class="thumbnail">
                    <img src="../assets/images/podcast_image.jpg" alt="podcast episode thumbnail">
                    <div class="item-details">
                        <h3 class="episode-title">${podcast.title} </h3>
                        <div class="published">
                            <p>5 May 21</p>
                            <p>35min <i class="fa-solid fa-bars-staggered play-target" style="color: green;" aria-hidden="true"></i></p>
                        </div>
                    </div>
                </section>
            </div>
        `;

                episode_list.appendChild(div);
            })

        })
        .catch(error => {
            console.error(error);
        })

    content_grid.appendChild(episode_list);

    document.getElementById('widgets').append(content_grid);

    loader.stop();
}

const getVideoIframes = async (url) => {
    const loader = new Loader('loader', 300);
    loader.start();
    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    loader.stop();

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "video-card"; // Assign a class for styling

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
        document.getElementById('widgets').append(card);
    });
}

const getPodcastData = () => {
    // Simulate fetching podcast data in JSON format
    return new Array(10).fill().map((_, i) => ({
        type: 'podcast',
        id: `podcast-${i + 1}`,
        title: `Podcast Episode ${i + 1}`,
        date: '5 May 21',
        duration: '35min',
        thumbnail: '../assets/images/image3.jpg',
        audioSrc: '../assets/audio/audio1.mp3'
    }));
}

const getVideoData = async (url) => {
    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    return data.map((item, i) => ({
        type: 'video',
        id: `video-${i + 1}`,
        title: item.article_title,
        intro: item.article_intro,
        date: item.date || 'Unknown Date',
        views: item.play_count || 0
    }));
}

const renderContent = (content) => {
    const container = document.getElementById('widgets');

    content.forEach(item => {
        const card = document.createElement("div");
        if (item.type === 'podcast') {
            card.className = "episode";
            card.innerHTML = `
                <section class="thumbnail" onclick="playEpisode(this)" data-is-playing="false" data-src="${item.audioSrc}">
                    <img src="${item.thumbnail}" alt="podcast episode thumbnail">
                    <div class="item-details">
                        <h3 class="episode-title">${item.title}</h3>
                        <div class="published">
                            <p>${item.date}</p>
                            <p>${item.duration} <i class="fa-solid fa-bars-staggered play-target" style="color: green;" aria-hidden="true"></i></p>
                        </div>
                    </div>
                </section>
            `;
        } else if (item.type === 'video') {
            card.className = "video-card";
            card.innerHTML = `${item.intro}`;
        }
        container.appendChild(card);
    });
};

const filterBroadcastsBy = async (button, url) => {
    document.getElementById('widgets').innerHTML = "";

    const parent = button.parentElement;
    const focusState = button.getAttribute("data-focus");

    if (focusState === "false") {
        const currentFocus = parent.querySelector("div.btn-wrap[data-focus='true']");
        currentFocus.setAttribute("data-focus", "false")
        button.setAttribute("data-focus", "true");
    }

    if (url === 'all') {
        console.log("Fetching all podcasts and videos...");

        // Fetch podcasts and videos
        const podcasts = getPodcastData();
        const videos = await getVideoData('/videos');

        // Interleave podcasts and videos
        const combinedContent = [];
        const maxLength = Math.max(podcasts.length, videos.length);
        for (let i = 0; i < maxLength; i++) {
            if (i < podcasts.length) combinedContent.push(podcasts[i]);
            if (i < videos.length) combinedContent.push(videos[i]);
        }

        // Render combined content
        renderContent(combinedContent);
    }
    else if (url === 'podcast') {
        getPodcastLists(button);
    }
    else {
        getVideoIframes(url);
    }
}

// Optional: Update the player controls if required
const onDeviceReady = () => {
    filterBroadcastsBy(document.getElementById("tb-podcasts"), 'podcast')
}

// document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('DOMContentLoaded', onDeviceReady);

