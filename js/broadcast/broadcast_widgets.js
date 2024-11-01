
const _widgetVideoCard = (video) => {

    const widget = document.createElement("div");
    widget.className = "long-video-div"
    widget.setAttribute("data-file-path", "../assets/images/banner/video1.mp4");
    widget.setAttribute("onclick", `watchVideo(this, '${JSON.stringify(video)}')`);

    widget.innerHTML = `
        <div class="lv-thumbnail">
            <div class="lvt-image">
                <img src="${video.thumbnail}" alt="video thumbnail">
            </div>
            <div class="lvt-overlay">
                <div class="duration-box">${video.duration}</div>
            </div>
        </div>
        <div class="lv-details">
            <div class="lvd-image">
                <img src="../assets/images/image3.jpg" alt="author image">
            </div>
            <div class="lvd-body">
                <div class="lvdb-title">${video.title}</div>
                <div class="lvdb-release-date">${video.releaseDate} <i class="fa-solid fa-circle"
                        style="font-size: 2px;"></i> ${video.viewCount}</div>
            </div>
            <div class="lvd-action">
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
        </div>
    `;

    return widget
}

const _widgeLiveCard = (podcast) => {

    const widget = document.createElement("div");
    widget.className = "reading-card";

    widget.innerHTML =
        `
        <div class="r-card-img" onclick="playPodcastInline(this, 'audio1.mp3')" data-media-playing="false">
            <img src="assets/images/discipleship/discipleship_0_4.jpg" alt="reading-card-image">
            <div class="pl-overlay">
                <i class="fa-solid fa-play"></i>
            </div>
        </div>
        <div class="card-info" onclick="gotoPodcasts('./pages/podcasts.html')">
            <div class="rc-title">This is the text title for some recommended reading content, it
                should wrap two lines not more, textoverflow ellipsis.</div>
            <div class="rc-author-datetime">
                <div class="rc-datetime">Wed, Jun 13, 2022</div>
                <div class="rc-category"><i class="fa-regular fa-circle-play"
                        style="margin-right: 0.5ch;"></i>130</div>
            </div>
        </div>
        <div class="rc-fav">
            <button type="button" onclick="openPodcastModal('1')">
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
        </div>
    `;

    return widget;
}

const _widgeShortsCard = (video) => {
    const widget = document.createElement("div");
    widget.className = "videos-card";

    widget.innerHTML = `
        <img src="${video.thumbnail}" alt="video thumbnail">
        <div class="overlay" onclick="openVideoShorts(this)">
            <i class="fa-solid fa-play"></i>
            <p>${video.description}</p>
        </div>
    `;

    return widget;
}