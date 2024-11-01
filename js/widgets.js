
function getRandomImage(imageFiles) {
    if (imageFiles.length === 0) {
        return null; // Return null if the array is empty
    }
    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    return imageFiles[randomIndex];
}

// Example usage:
const imageFiles = [
    './assets/images/image1.jpg',
    './assets/images/image2.jpg',
    './assets/images/image3.jpg'
];

const createPodcastModal = (podcast_id) => {
    const podcastModal = document.createElement("div");
    podcastModal.id = "podcast-modal";
    podcastModal.className = "podcast-options-modal";

    // Create an overlay
    const overlay = document.createElement("div");
    overlay.id = "modal-overlay";
    overlay.className = "modal-overlay";

    podcastModal.innerHTML =
        `
       <div class="row-close">
            <i class="fa-solid fa-circle-xmark" onclick="closePodcastModal(this)"></i>
        </div>
        <ul>
            <li>
                <div class="li-icon" onclick="addPodcastToQueue(this)" data-podcastId="${podcast_id}">
                    <i class="fa-solid fa-list-check"></i>
                </div>
                <div class="li-text">Add To Queue</div>
            </li>
            <li>
                <div class="li-icon" onclick="addPodcastToPlaylist(this)" data-podcastId="${podcast_id}">
                    <i class="fa-solid fa-circle-plus"></i>
                </div>
                <div class="li-text">Add to Playlist</div>
            </li>
            <li>
                <div class="li-icon" onclick="playPodcastNext(this)" data-podcastId="${podcast_id}">
                    <i class="fa-solid fa-forward-step"></i>
                </div>
                <div class="li-text">Play Next</div>
            </li>
            <li>
                <div class="li-icon" onclick="sharePodcast(this)" data-podcastId="${podcast_id}">
                    <i class="fa-solid fa-share-nodes"></i>
                </div>
                <div class="li-text">Share</div>
            </li>
            <li>
                <div class="li-icon" onclick="moreInfoPodcast(this)" data-podcastId="${podcast_id}">
                    <i class="fa-solid fa-circle-info"></i>
                </div>
                <div class="li-text">More Information</div>
            </li>
        </ul> 
    `;

    // Append modal and overlay to the body
    overlay.appendChild(podcastModal);
    document.getElementById("container_wrapper_main").appendChild(overlay);

    // Close modal on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closePodcastModal();
        }
    });

    return podcastModal;
}

const createPodcastInlineItem = (podcast) => {
    const podcastItem = document.createElement("div");
    podcastItem.className = "reading-card";

    podcastItem.innerHTML =
        `
        <div class="r-card-img" onclick="playPodcastInline(this, '${podcast.fileUrl}')" data-media-playing="false">
            <img src="assets/images/podcast_image.jpg" alt="reading-card-image">
            <div class="pl-overlay">
                <i class="fa-solid fa-play"></i>
            </div>
        </div>
        <div class="card-info" onclick="gotoPodcasts('./pages/podcasts.html')">
            <div class="rc-title">${podcast.title}</div>
            <div class="rc-author-datetime">
                <div class="rc-datetime">${new Date(podcast.createdAt).toDateString('en-US')}</div>
            </div>
        </div>
        <div class="rc-fav">
            <button type="button" onclick="openPodcastModal('1')">
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
        </div>
    `;

    return podcastItem;

}

const createVideoShortsInBlock = () => {
    const videoShortCard = document.createElement("div");
    videoShortCard.className = "videos-card";

    videoShortCard.innerHTML = `
        
    `;

    return videoShortCard;
}

const createRecommendedReadingCard = (article) => {
    let img;
    const randomImage = getRandomImage(imageFiles);

    const readingCard = document.createElement("div");
    readingCard.className = "reading-card";
    readingCard.setAttribute("onclick", `openReadRecommendedChapter('${article['article_id']}')`);

    if (!article["image_path"]) {
        img = randomImage
    }
    else {
        img = randomImage
    }
    readingCard.innerHTML = `
        <div class="r-card-img">
            <img src="${img}" alt="reading-card-image">
        </div>
        <div class="card-info">
            <div class="rc-title">${article["article_title"]}</div>
            <div class="rc-author-datetime">
                <!-- <div class="rc-author">Ps. Alex Buabeng Korsah</div> -->
                <div class="rc-category" style="display: flex;
                align-items: center; gap: 1ch;">From <i class="fa-solid fa-circle"
                        style="font-size: 5px;"></i> Recommended</div>
                <div class="rc-datetime">Wed, Jun 13, 2022</div>
            </div>
        </div>
        <div class="rc-fav">
            <button type="button" onclick="addToFavorites(this)" data-bookmarked="false">
                <i class="fa-regular fa-bookmark"></i>
            </button>
        </div>
    `;

    return readingCard;
}

const createSearchResultsCard = (article) => {
    const readingCard = document.createElement("div");
    readingCard.className = "reading-card";
    readingCard.setAttribute("onclick", `openReadRecommendedChapter('${article['article_id']}')`);

    readingCard.innerHTML = `
        <div class="card-info">
            <div class="rc-title">${article["article_title"]}</div>
            <div class="rc-author-datetime">
                <div class="rc-author">Ps. Alex Buabeng Korsah</div>
                <div class="rc-category" style="display: flex;
                align-items: center; gap: 1ch;">From <i class="fa-solid fa-circle"
                        style="font-size: 5px;"></i> Search</div>
            </div>
        </div>
    `;

    return readingCard;
}