

function convertToTimestamp(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        secs.toString().padStart(2, '0')
    ].join(':');
}

const playPauseVideo = (target) => {

    const currentStatusElement = document.querySelector("i[data-is-playing]");
    const videoTarget = document.getElementById("video-target");


    const isPlaying = currentStatusElement.getAttribute("data-is-playing");

    console.log(isPlaying);

    if (isPlaying === "false") {
        target.className = "fa-solid fa-pause";
        target.setAttribute("data-is-playing", "true");
        videoTarget.play();
    } else {
        target.className = "fa-solid fa-play";
        target.setAttribute("data-is-playing", "false");
        videoTarget.pause();
    }
};

const enableFullScreen = () => {
    const videoTarget = document.getElementById("video-target");

    if (videoTarget.requestFullscreen) {
        videoTarget.requestFullscreen();
    } else if (videoTarget.mozRequestFullScreen) {
        videoTarget.mozRequestFullScreen();
    } else if (videoTarget.webkitRequestFullscreen) {
        videoTarget.webkitRequestFullscreen();
    } else if (videoTarget.msRequestFullscreen) {
        videoTarget.msRequestFullscreen();
    }
};



const getLive = (video) => _widgeLiveCard(video);
const getVideo = (video) => _widgetVideoCard(video);
const getShorts = (video) => _widgeShortsCard(video);

const updateRecommendationsList = () => {
    const suggestionContainer = document.getElementById("suggestions");
    suggestionContainer.innerHTML = "";
    const broadcast = new BroadcastMedia();

    const _methods = {
        "live": getLive,
        "sermon": getVideo,
        "prayer": getVideo,
        "short": getShorts,
    }

    const selectedBroadcasts = broadcast.getMediaList("all");

    selectedBroadcasts.forEach(item => {
        const widget = _methods[item.type](item);
        if (item.type === "short") {
            return;
        }
        else {
            suggestionContainer.appendChild(widget);
        }
    });
}

const hideExpandedComments = () => {
    const commentsExpanded = document.getElementById("comments-expanded");
    const commentsOverlay = document.getElementById("comm-overlay");

    commentsExpanded.setAttribute("aria-hidden", "true");
    commentsOverlay.setAttribute("aria-hidden", "true");
}

const showExpandedComments = () => {
    const commentsExpanded = document.getElementById("comments-expanded");
    const commentsOverlay = document.getElementById("comm-overlay");

    commentsExpanded.setAttribute("aria-hidden", "false");
    commentsOverlay.setAttribute("aria-hidden", "false");
}

const likeThisVideo = (target) => {
    const liked = target.getAttribute("data-liked");

    if (liked === "false") {
        target.style.backgroundColor = "red";
        target.setAttribute("data-liked", "true");
        showSnackbar("added to liked videos");
    }
    else {
        target.style.backgroundColor = "grey";
        target.setAttribute("data-liked", "false")
        showSnackbar("removed from liked videos");
    }
}

const watchVideo = (target, video) => {
    const filePath = target.getAttribute("data-file-path");
    localStorage.setItem("playback-file-path", filePath);
    localStorage.setItem("video-data", video);

    location.reload()
}

document.addEventListener("DOMContentLoaded", () => {

    const videoSrc = localStorage.getItem("playback-file-path") ? localStorage.getItem("playback-file-path") : null;
    const videoObject = localStorage.getItem("video-data") ? JSON.parse(localStorage.getItem("video-data") ): null;

    if (!videoSrc) {
        showSnackbar("Video source could not be fetched");
    }
    else {
        const video = document.getElementById("video-target");
        video.setAttribute("src", videoSrc)

        document.getElementById("lvdb-title").innerText = videoObject.title;
        document.getElementById("rl-date").innerText = videoObject.releaseDate;
        document.getElementById("vc-views").innerText = videoObject.viewCount;

        const currentTimeEl = document.getElementById("current-time");
        const totalDurationEl = document.getElementById("total-duration");
        const progressionEl = document.getElementById("progression");
        const progressCircle = document.getElementById("progress-circle");
        const progressBar = document.querySelector(".progress-bar");


        video.addEventListener('loadedmetadata', () => {
            const totalDuration = video.duration;
            totalDurationEl.textContent = convertToTimestamp(totalDuration);
        });


        video.addEventListener('timeupdate', () => {
            const currentTime = video.currentTime;
            const totalDuration = video.duration;


            currentTimeEl.textContent = convertToTimestamp(currentTime);


            const percentagePlayed = (currentTime / totalDuration) * 100;


            progressionEl.style.width = percentagePlayed + '%';

            progressCircle.style.left = `calc(${percentagePlayed}% - 5px)`;
        });


        let isDragging = false;


        progressCircle.addEventListener('mousedown', (e) => {
            isDragging = true;
            document.body.style.cursor = 'grabbing';
        });


        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;


            const progressBarRect = progressBar.getBoundingClientRect();
            const mouseX = e.clientX - progressBarRect.left;
            const percentage = Math.min(Math.max(0, mouseX / progressBarRect.width), 1);


            video.currentTime = percentage * video.duration;
            progressionEl.style.width = `${percentage * 100}%`;
            progressCircle.style.left = `calc(${percentage * 100}% - 5px)`;
        });


        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.cursor = '';
        });


        progressCircle.addEventListener('touchstart', (e) => {
            isDragging = true;
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;

            const progressBarRect = progressBar.getBoundingClientRect();
            const touchX = e.touches[0].clientX - progressBarRect.left;
            const percentage = Math.min(Math.max(0, touchX / progressBarRect.width), 1);

            video.currentTime = percentage * video.duration;
            progressionEl.style.width = `${percentage * 100}%`;
            progressCircle.style.left = `calc(${percentage * 100}% - 5px)`;
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    }


    updateRecommendationsList();


    document.getElementById("send-button").addEventListener("click", () => {
        const comment = document.getElementById("comment-input").value;

        const comPost = document.createElement("div");
        comPost.className = "comment-row";

        comPost.innerHTML = `
            <img src="../assets/images/image1.jpg" alt="User Avatar" class="avatar">
            <div class="comment-content">
                <h4 class="username">John Doe</h4>
                <p class="comment-text">${comment}</p>
            </div>
        `;

        document.getElementById("comments-list").append(comPost);
        document.getElementById("comment-input").value = ""


    })
})